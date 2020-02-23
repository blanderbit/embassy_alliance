<template>
    <client-only>
    <div class="here-map">
        <div ref="map" v-bind:style="{ width: width, height: height }"></div>
    </div>
    </client-only>
</template>

<script>
    export default {
        name: "HereMap",
        head: {
                   
        },
        data() {
            return {
                map: null,
                platform: {},
                mMarker: null,
                geoCoordinate: null,
                appId: this.$store.state.hereAppId,
                appCode: this.$store.state.hereAppCode,
                externalScripts:[
                     { src: 'https://js.api.here.com/v3/3.0/mapsjs-core.js' },
                     { src: 'https://js.api.here.com/v3/3.0/mapsjs-service.js' },
                     { src: 'https://js.api.here.com/v3/3.0/mapsjs-ui.js' },
                     { src: 'https://js.api.here.com/v3/3.0/mapsjs-mapevents.js' }
                ],
                svgMarkup: '<svg width="68" height="84" xmlns="http://www.w3.org/2000/svg">'+
		                    '<path style="fill:#ff5722;" d="M40,0C26.191,0,15,11.194,15,25c0,23.87,25,55,25,55s25-31.13,25-55C65,11.194,53.807,0,40,0z'+
			                'M40,38.8c-7.457,0-13.5-6.044-13.5-13.5S32.543,11.8,40,11.8c7.455,0,13.5,6.044,13.5,13.5S47.455,38.8,40,38.8z"/></svg>',
            }
        },
        props: {
            //appId: String,
            ///appCode: String,
            lat: String,
            lng: String,
            zoom: String,
            width: String,
            height: String,
            bus: Object
        },
        methods:{
            initPlatform() {
                this.platform = new H.service.Platform({
                    "app_id": this.appId,
                    "app_code": this.appCode,
                    useCIT: true,
                    useHTTPS: true
                });
                //console.log('HERE map platform initialised');
                this.initMap();
            },
            initMap(lng, lat, zoom){
                this.geoCoordinate = { lng: this.lng, lat: this.lat };
                var defaultLayers = this.platform.createDefaultLayers();
                this.map = new H.Map(
                    this.$refs.map,
                    defaultLayers.normal.map,
                    {
                        zoom: this.zoom,
                        center: this.geoCoordinate
                    }
                );
                var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map));
                var ui = H.ui.UI.createDefault(this.map, defaultLayers);  

                //this.addDomMarker(this.map);
                this.addMarkersToMap();
            },
            updateMap(t){
                if (this.map == null){
                    return null;
                }
                ////console.log(t)
                this.geoCoordinate = {
                    lat: t.lat,
                    lng: t.lng
                }
                ////console.log(this.geoCoordinate);
                this.map.setCenter(this.geoCoordinate);

                if (this.mMarker != null){
                    try{
                        this.map.removeObject(this.mMarker);
                        this.mMarker = null;
                    } catch(e){}
                }
                this.addMarkersToMap();
            },
            loadExternal(){
                //console.log('HereMap.loadExternal called');
                self = this;
                var head = document.getElementsByTagName('head')[0];

                for(var i=0,l=this.externalScripts.length; i<l; i++){
                    var script = document.createElement('script');
                    script.src = this.externalScripts[i].src; 
                    script.type = 'text/javascript';
                    script.async = false;
                    if(i == (l-1)){
                        //script.async = true;
                        if (script.readyState) { // IE, incl. IE9
                            script.onreadystatechange = function() {
                                if (script.readyState == "loaded" || script.readyState == "complete") {
                                    script.onreadystatechange = null;
                                    this.checkTimeout();
                                }
                            };
                        } else {
                            script.onload = function() { // Other browsers
                                //console.log('callback called')
                                self.checkTimeout();                               
                            };
                        }
                    } else {
                        
                    }                 
                    head.appendChild(script);
                    //console.log(script.src + ' Loaded');
                }
            },
            checkTimeout(){
                let self = this;
                if(typeof H === 'undefined' ||  H === null){
                    //console.log('H is not defined');
                    setTimeout(function(){                       
                        self.checkTimeout(); 
                    }, 500);
                } else if(typeof H.service === 'undefined') {
                    //console.log('H.service is not defined');
                    setTimeout(function(){                       
                        self.checkTimeout(); 
                    }, 500);
                } else {
                    ////console.log(H);
                    setTimeout(function(){ self.initPlatform(); }, 100);
                }
            },
            addMarkersToMap() {
                if(this.geoCoordinate == null){
                    return null;
                }
                if (this.mMarker == null) {
                    try{
                        var icon = new H.map.Icon(this.svgMarkup);
                        this.mMarker = new H.map.Marker(this.geoCoordinate, {icon: icon}); 
                        this.map.addObject(this.mMarker);
                    } catch(e){}
                }  
                try{
                    this.map.setCenter(this.geoCoordinate);  
                } catch(e){}   
            },
            addDomMarker(map) {
                var outerElement = document.createElement('div'),
                    innerElement = document.createElement('div');

                outerElement.style.userSelect = 'none';
                outerElement.style.webkitUserSelect = 'none';
                outerElement.style.msUserSelect = 'none';
                outerElement.style.mozUserSelect = 'none';
                outerElement.style.cursor = 'default';

                innerElement.style.color = 'black';
                innerElement.style.backgroundColor = 'white';
                innerElement.style.border = '1px solid gray';
                innerElement.style.font = 'normal 12px arial';
                innerElement.style.lineHeight = '12px'

                innerElement.style.paddingTop = '6px';
                innerElement.style.paddingLeft = '8px';
                innerElement.style.width = '200px';
                innerElement.style.height = '160px';
                innerElement.style.borderRadius = '10px';

                // add negative margin to inner element
                // to move the anchor to center of the div
                innerElement.style.marginTop = '-196px';
                innerElement.style.marginLeft = '-100px';

                outerElement.appendChild(innerElement);

                // Add text to the DOM element
                innerElement.innerHTML = '<div id="siteNotice">'+
                    '</div>'+
                    '<h4 id="firstHeading" class="firstHeading" style="font-size:14px">'+"JoyScoot @Singapore Flyer"+'</h4>'+
                    '<div id="bodyContent">'+
                    '<p><b>LOCATION:</b><br /> Singapore Flyer <br /><br />' +
                
                    '<b>WORKING HOURS:</b><br />'+
                    'Mon - Sun:<span>&nbsp;&nbsp;&nbsp;&nbsp;</span>9:00 - 21:00<br /></p>'+
                    '</div>';

                function changeOpacity(evt) {
                    evt.target.style.opacity = 0.6;
                };

                function changeOpacityToOne(evt) {
                    evt.target.style.opacity = 1;
                };

                //create dom icon and add/remove opacity listeners
                var domIcon = new H.map.DomIcon(outerElement, {
                    // the function is called every time marker enters the viewport
                    onAttach: function(clonedElement, domIcon, domMarker) {
                    clonedElement.addEventListener('mouseover', changeOpacity);
                    clonedElement.addEventListener('mouseout', changeOpacityToOne);
                    },
                    // the function is called every time marker leaves the viewport
                    onDetach: function(clonedElement, domIcon, domMarker) {
                    clonedElement.removeEventListener('mouseover', changeOpacity);
                    clonedElement.removeEventListener('mouseout', changeOpacityToOne);
                    }
                });

                // Marker for Chicago Bears home
                var bearsMarker = new H.map.DomMarker({ lat: this.lat, lng: this.lng }, {
                    icon: domIcon
                });
  
                map.addObject(bearsMarker);
            }
        },
        created() { 
            ////console.log(this.$store.state.hereAppId)          
        },
        mounted() {
            //console.log('HereMap mounted called');
            if(typeof H === 'undefined'){
                this.loadExternal();
            } else {
                this.checkTimeout();   
            }
              
            this.bus.$on('updateMap', this.updateMap)      
        }
    }
</script>

<style scoped></style>