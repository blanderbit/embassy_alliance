<template>
  <div>

<!-- top head with navigation -->
<section class="b">
  <NavMain/>
  
</section>
<!-- / top head with navigation -->


<!-- main header -->
<section class="b05">
  <div class="container">
 <div class="b01_main_in2">  
      <div class="simple-header">
          <h1 class="b01_in2_tx1">{{$t('contacts.b1.header')}}</h1>
          <ul class="uk-breadcrumb">
            <li><nuxt-link :to="localePath('/')">{{$t('nav.home')}}</nuxt-link></li>
            <li class="uk-disabled">{{$t('nav.contacts')}}</li>
          </ul>
          <p class="simple-header__text" v-html="$t('contacts.b1.body')"></p>     
      </div>
    </div>
  </div>
</section>
<!-- / main header -->

<section>
  <div class="container">
    <div class="location-buttons">
      <button 
          :class="{'location-button': true, active: (btnSwitch == 1)}" 
          @click="toggleLocations(1)">{{$t('contacts.location1.button')}}</button>
      <button 
          :class="{active:(btnSwitch == 2), 'location-button':true}" 
          @click="toggleLocations(2)">{{$t('contacts.location2.button')}}</button>
    </div>
    <div class="company-map-info">
      <div class="company-info">
        <h2>{{$t('contacts.location' + btnSwitch + '.name')}}</h2>
        <span class="company-info__span">
          <span>{{$t('contacts.license')}}:</span>
          <span class="t">{{$t('contacts.location' + btnSwitch + '.license_number')}}</span>
        </span>
        <div class="company-info__address">
            {{$t('contacts.location' + btnSwitch + '.address')}}
        </div>
        <span class="company-info__span">
          <span>{{$t('contacts.phone')}}:</span>
          <span class="t">{{$t('contacts.location' + btnSwitch + '.phone')}}</span>
        </span>
        <span class="company-info__span">
          <span>{{$t('contacts.fax')}}:</span>
          <span class="t">{{$t('contacts.location' + btnSwitch + '.fax')}}</span>
        </span>
        <h3>{{$t('contacts.salesDepartment')}}</h3>
        <span class="company-info__span">
          <span>{{$t('contacts.phone')}}:</span>
          <span class="t">{{$t('contacts.location' + btnSwitch + '.sale_phone')}} </span>({{$t('contacts.manager')}})
        </span>
        <span class="company-info__span">
          <span>{{$t('contacts.email')}}:</span>
          <span class="t">{{$t('contacts.location' + btnSwitch + '.sale_email')}}</span>
        </span>
      </div>
      <div class="company-map">
        <HereMap
            :lat="map.location1.lat"
            :lng="map.location1.lng"
            :zoom="map.location1.zoom"
            width="100%"
            :height="map.height" 
            :bus="bus"/>
      </div>
    </div>
  </div>
</section>

<Footer/>
<!------------------------ @@@@@@ -------------------------------->

<!------------------------ MODALS -------------------------------->



<!------------------------ / MODALS ------------------------------>
  </div>
</template>

<script>
import Vue from 'vue'
import NavMain from '~/layouts/partials/NavMain';
import Footer from '~/layouts/partials/footer';
import OrderForm from '~/components/OrderForm';
import HereMap from '~/components/HereMap';
import OrderStepper from '~/components/OrderStepper';
import Comments from '~/components/Comments';
import referralMixin from '~/mixins/referralMixin.js';
import generalMixin from '~/mixins/generalMixin.js';

export default {
    mixins: [referralMixin,generalMixin],
    layout: 'default',
    auth: false,
    head() {
      return { 
          title: this.$t('contacts.title'),
          meta: [
                  { name: 'description', content: this.$t('contacts.description')},
                  { name: 'keywords', content: 'Embassy Camps contacts'},
              ],
          script: [
                 // { src: 'https://js.api.here.com/v3/3.0/mapsjs-core.js' },
                 // { src: 'https://js.api.here.com/v3/3.0/mapsjs-service.js' },
                 // { src: 'https://js.api.here.com/v3/3.0/mapsjs-ui.js' },
                 // { src: 'https://js.api.here.com/v3/3.0/mapsjs-mapevents.js' }
              ], 
          link:[
            { rel: 'stylesheet', href: 'https://js.api.here.com/v3/3.0/mapsjs-ui.css'}
          ]  
          }
    },
    data() {
      return {
          bus: new Vue(),
          btnSwitch: 1,
          map:{
            height: '400px',
            location1:{
              lat: '3.1151904',
              lng: '101.6658463',
              zoom: '17',
              
            },
            location2:{
              lat: '1.2847553',
              lng: '103.8520323',
              zoom: '17',
            }                  
          }
      }
    },
    methods: {
      toggleLocations(v){
        this.btnSwitch = v;
        this.bus.$emit('updateMap', this.map['location' + v]);
      }
    },
    components: {
      NavMain,
      OrderForm,
      OrderStepper,
      Comments,
      Footer,
      HereMap
    },
    mounted(){
        
    },
    computed:{
    }

}
</script>

<style lang="scss" scoped>
$desc-text: #636363;
$btn-color: #ff5722;
$max-container: 675px * 2;

.container{
  @media screen and(min-width: 1200px){
  max-width: $max-container;
  }
}
.b01_main_in2{
  position: relative;
}

.b01_in1 {
    position: relative;
}
.location-buttons{
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 48px 0;
  @media screen and (max-width: 600px){
    padding: 18px 0;
  }
}
.b05 {
    padding: 0;
}

.location-button{
  min-height: 60px;
  padding: 0 30px;
  border: 3px solid #333;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  font-size: 18px;
  cursor: pointer;
  &.active{
    background: #333;
    color: white!important;
  }
  &:not(:first-of-type){
    border-bottom-right-radius: 36px;
    border-top-right-radius: 36px;
  }
  &:first-of-type{
    border-bottom-left-radius: 36px;
    border-top-left-radius: 36px;
  }
}
.company-map-info{
  display: flex;
  padding: 40px 0 100px;
  width: 70%;
  @media screen and (max-width: 800px){
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr max-content;
    grid-gap: 30px;
  }
}
.company-map{
  flex: 0 0 58%;
  height: 400px;
  overflow: hidden;
  @media screen and (max-width: 800px){
    grid-row: 1 / 3;
  }
}
.company-info{
  flex: 0 0 42%;
  h2, h3{
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 0;
  }
  &__span{
    margin-top: 14px;
    display: block;
    font-size: 18px;
    &>.t{
      color: $btn-color;
    }
  }
  &__address{
    margin-top: 34px;
    font-size: 18px;
    line-height: 1.3;
    padding-right: 30px;
  }
}
.container{
  display: flex;
    flex-direction: column;
    align-items: center;
}
</style>
