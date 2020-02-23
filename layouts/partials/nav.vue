<template>
<div class="b01_in1" :class="{'sticky': storeStickyNav}" id="topNav">
    
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
              <nuxt-link :to="localePath('english_language_camp_malaysia')">Embassy English</nuxt-link>
            </li>
            
            <li>
              <nuxt-link :to="localePath('english_smart_camp_malaysia')">Smart Camp</nuxt-link>
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
                <li v-for="locale in availableLocales" :key="locale.code">
                  <nuxt-link
                      :to="switchLocalePath(locale.code)">{{ locale.name }}</nuxt-link>
                </li>
              </ul>
              </transition>
            </li>
          </ul>

        </vk-offcanvas>
      </vk-offcanvas-content>
    </client-only>
  </div>

    <div class="container">
      <div class="flex flex-justify flex-v-center">
        <div class="col6">
          <!--<ul class="b01_ul">
            <li><nuxt-link to="/">Главная</nuxt-link>
            </li>
            <li><nuxt-link to="/">О компании</nuxt-link>
            </li>
            <li><nuxt-link to="/">Новости</nuxt-link>
            </li>
            <li><nuxt-link to="/">Контакты</nuxt-link>
            </li>
          </ul>-->
        </div>
        <div class="col0 logo-container">
          <nuxt-link :to="localePath('/')"><img src="/img/logo.png" alt=""></nuxt-link>
        </div>
        <div class="col6">
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
            <li>
              <nuxt-link :to="localePath('english_language_camp_malaysia')">Embassy English</nuxt-link>
            </li>
           
            <li>
              <nuxt-link :to="localePath('english_smart_camp_malaysia')">Smart Camp</nuxt-link>
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
                <li>
                  <nuxt-link :to="switchLocalePath('en')">English</nuxt-link>
                </li>
                <li>
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
        availableLocales: []
      }
  },
  methods:{
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
      if(Window){ 
        var w = Window.innerWidth || Document.documentElement.clientWidth || Document.body.clientWidth;
        this.$store.commit('setDeviceWidth', w)
        var h = Window.innerHeight || Document.documentElement.clientHeight || Document.body.clientHeight;
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
    this.$store.commit('stickyNavDisabled',false);
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
    padding-left: 40px!important;
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

