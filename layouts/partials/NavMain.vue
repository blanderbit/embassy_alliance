<template>
<div class="b01_in1" :class="{'sticky': storeStickyNav}" id="topNav">

<!--- Side drawer --> 
  <div class="top_menu">
    <client-only>
      <vk-offcanvas-content>
        <div class="burger-wrapper">
          <vk-button @click="showSideMenu = true" class="burger"></vk-button>
        </div>
        <vk-offcanvas overlay :show.sync="showSideMenu">
          <vk-offcanvas-close @click="showSideMenu = false"></vk-offcanvas-close>
          <h3>Embassy Camps</h3>
    
          <ul class="drawer-list">
            <li>
              <nuxt-link :to="localePath('/')">{{$t('nav.home')}}</nuxt-link>
            </li>
            <!--<li>
              <nuxt-link :to="localePath('english_language_camp_malaysia')">Embassy English</nuxt-link>
            </li>
            
            <li>
              <nuxt-link :to="localePath('english_smart_camp_malaysia')">Smart Camp</nuxt-link>
            </li>-->
            <li class="b01_ul_dwn">
              <a href="javascript:void(0)"
                  @click="menu.campsMobile = !menu.campsMobile"
                 >
                <span>
                  {{$t('nav.our_camps')}}
                </span>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    width="10px" height="6px">
                  <path fill-rule="evenodd"
                        d="M5.041,5.817 L1.159,2.024 C0.912,1.784 0.912,1.391 1.159,1.151 C1.406,0.910 1.806,0.910 2.053,1.151 L5.488,4.507 L8.922,1.151 C9.169,0.910 9.569,0.910 9.816,1.151 C10.063,1.391 10.063,1.784 9.816,2.024 L5.934,5.818 C5.811,5.939 5.649,5.998 5.488,5.998 C5.326,5.998 5.164,5.938 5.041,5.817 Z"/>
                </svg>
              </a>
              <transition name="slide">
              <ul class="child" v-show="menu.campsMobile">
                <li v-for="(camp,index) in menuCamps" :key="index">
                  <nuxt-link 
                    :to="($i18n.defaultLocale != $i18n.locale)?
                    '/' + $i18n.locale + '/'+ (camp.country.name).toLowerCase() +'/' + camp.slug
                    :'/'+ (camp.country.name).toLowerCase() +'/' + camp.slug"
                  >{{camp.i18n_name[$i18n.locale]}}
                  </nuxt-link>
                </li>
              </ul>
              </transition>
              
            </li>
             <li>
              <nuxt-link :to="localePath('about-us')">{{$t('nav.about_us')}}</nuxt-link>
            </li>
            <li>
              <nuxt-link :to="localePath('blog')">{{$t('nav.blog')}}</nuxt-link>
            </li>
            <li>
              <nuxt-link :to="localePath('contacts')">{{$t('nav.contacts')}}</nuxt-link>
            </li>

            <li class="divider">{{$t('settings')}}</li>
            <li class="slider-menu">
              <a href="javascript:void(0)" 
                  class="lang-switch"
                  @click="navigation.langbar = !navigation.langbar">
                <span>
                  <globe-icon/>
                </span>                
                <span class="lang-name">{{ localeName }}</span>
                <svg :class="{'arrow': true, 'opened': navigation.langbar}"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    width="10px" height="6px">
                  <path fill-rule="evenodd"
                        d="M5.041,5.817 L1.159,2.024 C0.912,1.784 0.912,1.391 1.159,1.151 C1.406,0.910 1.806,0.910 2.053,1.151 L5.488,4.507 L8.922,1.151 C9.169,0.910 9.569,0.910 9.816,1.151 C10.063,1.391 10.063,1.784 9.816,2.024 L5.934,5.818 C5.811,5.939 5.649,5.998 5.488,5.998 C5.326,5.998 5.164,5.938 5.041,5.817 Z"/>
                </svg>
              </a>
              <transition name="slide">
                <ul class="child" v-if="navigation.langbar">
                <li v-for="locale in availableLocales" :key="locale.code" :style="{'drop-active':(locale.code == $i18n.locale)}">
                  <nuxt-link
                      :to="switchLocalePath(locale.code)">{{ locale.name }}
                  </nuxt-link>
                </li>
              </ul>
              </transition>
            </li>
             <li class="divider" v-if="$store.state.auth.loggedIn">{{$t('clientarea.title')}}</li>

              <li v-if="$store.state.auth.loggedIn">
                <nuxt-link :to="localePath('clientarea')" @click.native="showSideMenu = false">
                  {{$t('clientarea.my_bookings')}}
                  </nuxt-link>
              </li>
              <li v-if="$store.state.auth.loggedIn">
                <nuxt-link :to="localePath('clientarea') + '/upcoming-camps?a=camps'" @click.native="showSideMenu = false">
                {{$t('clientarea.upcoming_camps')}}
                </nuxt-link>
              </li>
              <li v-if="$store.state.auth.loggedIn">
                <nuxt-link :to="localePath('clientarea') + '/past-camps'" @click.native="showSideMenu = false">
                {{$t('clientarea.past_camps')}}
                </nuxt-link>
              </li>
    <li v-if="$store.state.auth.loggedIn"><nuxt-link :to="localePath('clientarea') + '/settings'" @click.native="showSideMenu = false">{{$t('clientarea.settings')}}</nuxt-link></li>
    <li v-if="$store.state.auth.loggedIn && $store.state.auth.user.referral">
      <nuxt-link :to="localePath('clientarea') + '/referrals'" @click.native="showSideMenu = false">{{$t('clientarea.referrals')}}</nuxt-link>
    </li>

          </ul>

        </vk-offcanvas>
      </vk-offcanvas-content>
    </client-only>
  </div>
  <!--- / Side drawer -->

    <div class="container">
      <div class="flex flex-justify flex-v-center">
        <div class="col6 menu-left">
          <ul class="b01_ul">
            <li class="b01_ul_dwn">
              <a href="javascript:void(0)"
                  @mouseover="menu.camps = true"
                  @mouseleave="menu.camps = false">
                <span>
                  {{$t('nav.our_camps')}}
                </span>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    width="10px" height="6px">
                  <path fill-rule="evenodd"
                        d="M5.041,5.817 L1.159,2.024 C0.912,1.784 0.912,1.391 1.159,1.151 C1.406,0.910 1.806,0.910 2.053,1.151 L5.488,4.507 L8.922,1.151 C9.169,0.910 9.569,0.910 9.816,1.151 C10.063,1.391 10.063,1.784 9.816,2.024 L5.934,5.818 C5.811,5.939 5.649,5.998 5.488,5.998 C5.326,5.998 5.164,5.938 5.041,5.817 Z"/>
                </svg>
              
              <ul class="b02_ul_sb" v-show="menu.camps">
                <li v-for="(camp,index) in menuCamps" :key="index">
                  <nuxt-link 
                    :to="($i18n.defaultLocale != $i18n.locale)?
                    '/' + $i18n.locale + '/'+ (camp.country.name).toLowerCase() +'/' + camp.slug
                    :'/'+ (camp.country.name).toLowerCase() +'/' + camp.slug"
                  >{{camp.i18n_name[$i18n.locale]}}
                  </nuxt-link>
                </li>
              </ul>
              </a>
            </li>
            <!--<li><nuxt-link to="/">{{$t('nav.our_camps')}}</nuxt-link>
            </li>-->
            <li>
              <nuxt-link :to="localePath('about-us')">{{$t('nav.about_us')}}</nuxt-link>
            </li>
            <li>
              <nuxt-link :to="localePath('blog')">{{$t('nav.blog')}}</nuxt-link>
            </li>
            <li>
              <nuxt-link :to="localePath('contacts')">{{$t('nav.contacts')}}</nuxt-link>
            </li>
          </ul>
        </div>
        <div class="col0 logo-container">
          <nuxt-link :to="($i18n.defaultLocale != $i18n.locale)?'/'+$i18n.locale:'/'"><img src="/img/logo.png" alt=""></nuxt-link>
        </div>
        <div class="col6 menu-right">
          <ul class="b01_ul flex-end">
            <!--<li class="b01_ul_dwn">
              <a href="#">
                <span>Туризм</span>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    width="10px" height="6px">
                  <path fill-rule="evenodd"
                        d="M5.041,5.817 L1.159,2.024 C0.912,1.784 0.912,1.391 1.159,1.151 C1.406,0.910 1.806,0.910 2.053,1.151 L5.488,4.507 L8.922,1.151 C9.169,0.910 9.569,0.910 9.816,1.151 C10.063,1.391 10.063,1.784 9.816,2.024 L5.934,5.818 C5.811,5.939 5.649,5.998 5.488,5.998 C5.326,5.998 5.164,5.938 5.041,5.817 Z"/>
                </svg>
              </a>
              <ul class="b01_ul_sb">
                <li>
                  <a href="#">Туризм</a>
                </li>
                <li>
                  <a href="#">Церемонии</a>
                </li>
                <li>
                  <a href="#">Курсы</a>
                </li>
                <li>
                  <a href="#">Образование</a>
                </li>
              </ul>
            </li>-->
            <!--<li>
              <nuxt-link :to="localePath('english_language_camp_malaysia')">Embassy English</nuxt-link>
            </li>
           
            <li>
              <nuxt-link :to="localePath('english_smart_camp_malaysia')">Smart Camp</nuxt-link>
            </li>-->
            <li v-if="$store.state.auth.loggedIn">
              <nuxt-link :to="localePath('clientarea')">{{ $store.state.auth.user.first_name }} {{ $store.state.auth.user.last_name }}</nuxt-link>
            </li>
            <li v-else>
              <nuxt-link :to="localePath('login')">{{$t('login')}}</nuxt-link>
            </li>

            <li v-if="$store.state.auth.loggedIn">
              <a href="javascript:void(0)" @click="logout">{{$t('logout')}}</a>
            </li>
            <li v-else>
              <nuxt-link :to="localePath('login')+'?action=register'">{{$t('register')}}</nuxt-link>
            </li>

             <li class="b01_ul_dwn">
              <a href="javascript:void(0)">
                <span>
                  <globe-icon/>

                </span>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    width="10px" height="6px">
                  <path fill-rule="evenodd"
                        d="M5.041,5.817 L1.159,2.024 C0.912,1.784 0.912,1.391 1.159,1.151 C1.406,0.910 1.806,0.910 2.053,1.151 L5.488,4.507 L8.922,1.151 C9.169,0.910 9.569,0.910 9.816,1.151 C10.063,1.391 10.063,1.784 9.816,2.024 L5.934,5.818 C5.811,5.939 5.649,5.998 5.488,5.998 C5.326,5.998 5.164,5.938 5.041,5.817 Z"/>
                </svg>
              </a>
              <ul class="b01_ul_sb">
                <li :class="{'active': $i18n.locale=='en'}">
                  <nuxt-link :to="switchLocalePath('en')">English</nuxt-link>
                </li>
                <li :class="{'active': $i18n.locale=='ru'}">
                  <nuxt-link :to="switchLocalePath('ru')">Русский</nuxt-link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>   
</template>

<script>
import globeIcon from '~/layouts/partials/elements/globe'
var Window = null, Document = null;
if (process.client) {
  Window = window;
  Document = document;
} 
export default { 
  components:{
    globeIcon
  },
  data() {
      return {
        showSideMenu: false,
        stickyNav: false,
        scrollPos: 0,
        navigation:{
          langbar: false
        },
        localeName: '',
        availableLocales: [],
        menuCamps: [],
        menu: {
          camps: false,
          campsMobile: false
        }
      }
  },
  methods:{
    async logout() {
      this.$toast.show(this.$t('logging_out'),{
        icon : {
            name : 'watch'
        }}).goAway(1500);
      await this.$auth.logout({         
      }).then(() => {
        this.$auth.logout();
        this.$router.push('/login')
      }).catch(err => {
          //this.snackbar.show = true;
          this.error = err.response.data.error
          this.sending = false;
      })
    },
    async getCampList(){
      // first we check if we have stored already
      // the list previously
      let curTime = Date.now();
      let data = localStorage.getItem('campListMenu');
      let expire = localStorage.getItem('campListMenuExpire');
      if(typeof data != 'undefined' && data != null && typeof expire != 'undefined' && expire != null && expire*1>=curTime){
        this.menuCamps = JSON.parse(data);
        //console.log('menu fetched from localstorage');
        //console.log(curTime, expire);       
      } else {
        await this.$axios.get('/products/menu/index')
          .then((response) => {
            this.menuCamps = response.data.data;   
            ////console.log(response.data.data)     
            localStorage.setItem('campListMenu', JSON.stringify(this.menuCamps));     
            localStorage.setItem('campListMenuExpire', (Date.now() + (60*60*1000)));    
          })
          .catch((err) => {})
      }
      this.$store.commit('setCampListMenu',this.menuCamps);
    },
    getlocaleName(){
      for(let i=0; this.$i18n.locales.length>i;i++){
        if(this.$i18n.locales[i].code == this.$i18n.locale){
          this.localeName = this.$i18n.locales[i].name
        }
      }
    },
    getAvailableLocales(){
      for(let i=0; this.$i18n.locales.length>i;i++){
        if(this.$i18n.locales[i].code != this.$i18n.locale){
          this.availableLocales.push( this.$i18n.locales[i])
        }
      }
    },
    handleScroll(event){
      if(this.$store.state.deviceWidth <= this.$store.state.maxMobileWidth){
        var scrollPos = 0;
        var header = Document.getElementById("topNav");
        var sticky = header.offsetTop;
        var localScrollPos = (Document.body.getBoundingClientRect()).top
        ////console.log(localScrollPos, this.scrollPos)
        if (localScrollPos > this.scrollPos){
          if (Window.pageYOffset > sticky) {
            if(!this.$store.stickyNavDisabled){
              this.$store.commit('setStickyNav',true);  
            }                        
          } else {
            this.$store.commit('setStickyNav',false);
          }         
        } else {
            if((this.scrollPos - localScrollPos) > 5){
              this.$store.commit('setStickyNav',false);
            }           
        }
        this.scrollPos = localScrollPos;
      }
      ////console.log('pageOffset: ' + Window.pageYOffset + ' || sticky: ' + (sticky + 240))
      if (Window.pageYOffset > (sticky + 240)) {
        this.$store.commit('setShowBottomButtons',true);
      } else {
        this.$store.commit('setShowBottomButtons',false);
      }     
    },
    handleResize(event){
      if(process.client){ 
        var w=0,h=0;
        try{
          w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        
          h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

        } catch(e){

        }
        
        this.$store.commit('setDeviceWidth', w)
        this.$store.commit('setDeviceHeight', h)
        this.$store.commit('setStickyNav',false);
      }
    }
  },
  computed: {
    storeStickyNav(){
      return this.$store.state.stickyNav;
    }
    //availableLocales () {
    //  return this.$i18n.locales.filter(i => i.code !== this.$i18n.locale)
    //},    
  },
  mounted(){
    this.getlocaleName();
    this.getAvailableLocales();
    this.$store.commit('setStickyNav',false);
    this.$store.commit('setstickyNavDisabled',false);
    this.getCampList();
  },
  created(){  
    // fucking with ssr: 
    if(Window){ 
      Window.addEventListener('scroll', this.handleScroll);
      Window.addEventListener('resize', this.handleResize);

      var w = Window.innerWidth || Document.documentElement.clientWidth || Document.body.clientWidth;
      this.$store.commit('setDeviceWidth', w)

      var h = Window.innerHeight || Document.documentElement.clientHeight || Document.body.clientHeight;
      this.$store.commit('setDeviceHeight', h)
    }
  },
  destroyed: function () {
    if(Window){
      Window.removeEventListener('scroll', this.handleScroll);
      Window.removeEventListener('resize', this.handleResize);
    }
  },
}
</script>

<style lang="scss" scoped>
.menu-right{
  @media screen and (max-width:1400px){
    padding-right: 28px;
  }  
}
.top_menu > ul{
  padding-left: 10px;
}
.b01_ul {
  padding-left: 0!important;
}
.drawer-list{
  .divider{
    margin-top: 40px;
    margin-bottom: 0px;
    font-weight: 700;
    font-size: 14px;
  }
  a:not(.nuxt-link-exact-active){
    color: gray!important;
  }
} 
.lang-switch{
  display: flex;
  justify-content: flex-start;
  align-items: center;
  align-content: center;
  text-decoration: none;
  .arrow{
    width: 10px;
    height: auto;
  }
  .arrow.opened{
    transform: rotate(180deg);
  }
}
.child{
    padding-left: 10px!important;
    margin-top: 10px;
  }

.lang-name{
  display: inline-block;
  padding: 0 10px;
}
.slider-menu{
  cursor: pointer;
  svg{
    width: 20px;
    height: 20px;
  }
} 
.slide-enter-active {
   -moz-transition-duration: 0.3s;
   -webkit-transition-duration: 0.3s;
   -o-transition-duration: 0.3s;
   transition-duration: 0.3s;
   -moz-transition-timing-function: ease-in;
   -webkit-transition-timing-function: ease-in;
   -o-transition-timing-function: ease-in;
   transition-timing-function: ease-in;
}

.slide-leave-active {
   -moz-transition-duration: 0.3s;
   -webkit-transition-duration: 0.3s;
   -o-transition-duration: 0.3s;
   transition-duration: 0.3s;
   -moz-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
   -webkit-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
   -o-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
   transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
}

.slide-enter-to, .slide-leave {
   max-height: 100px;
   overflow: hidden;
}

.slide-enter, .slide-leave-to {
   overflow: hidden;
   max-height: 0;
}
</style>

