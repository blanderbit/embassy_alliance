<template>
<div class="cp0 b01_in1">
    
    <div class="top_menu">
      <client-only>
      <vk-offcanvas-content>
        <div class="burger-wrapper">
      <vk-button @click="showSideMenu = true" class="burger"></vk-button>
    </div>
      <vk-offcanvas overlay :show.sync="showSideMenu">
        <vk-offcanvas-close @click="showSideMenu = false"></vk-offcanvas-close>
        <h3>Embassy Camps</h3>
   
        <SideLinks @onClickSideLink="showSideMenu = $event" />

      </vk-offcanvas>
    </vk-offcanvas-content>
    </client-only>
    </div>

    <div class="container">
      <div class="flex flex-justify flex-v-center top-navigation">
        <div class="col6 top-menu-left">
          <ul class="b01_ul">
            <li><nuxt-link exact to="/">Главная</nuxt-link>
            </li>
            <li><nuxt-link exact to="/clientarea">О компании</nuxt-link>
            </li>
            <!--<li><nuxt-link to="/">Новости</nuxt-link>
            </li>
            <li><nuxt-link to="/">Контакты</nuxt-link>
            </li>-->
          </ul>
        </div>
        <div class="col0 logo-container">
          <a href="/"><img src="/img/logo.png" alt=""></a>
        </div>
        <div class="col6">
          <ul class="b01_ul flex-end top-menu-right">
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
              <nuxt-link to="/clientarea/settings">{{ $store.state.auth.user.first_name }} {{ $store.state.auth.user.last_name }}</nuxt-link>
            </li>
            <!--<li class="b01_ul_dwn">
              <a href="#">
                <span>Курсы</span>
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
              <a href="#" @click="logout">{{$t('logout')}}</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
</div>
   
</template>

<script>
import SideLinks from '~/layouts/partials/sidelinks';
export default {
  components: {
      SideLinks
    },  
  data() {
      return {
        showSideMenu: false
      }
  },
  methods: {
    async logout() {
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
  }
}
</script>

<style>
    
</style>

