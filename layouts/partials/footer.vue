<template>
  <div id="footer" ref="pageFooter">
    <div class="container">
      <div class="footer-main">
        <div class="footer-logo">
          <img src="/img/EA Logo_01_cs5.png" />
        </div>
        <div class="navigation">
          <div class="left">
            <h3>Embassy Camps</h3>
            <ul>
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
          <div class="right">
            <h3>{{$t('nav.our_camps')}}</h3>
            <ul>
              <li v-for="(camp, index) in shortedMenu" :key="index" class="footer-camp-list">
                <nuxt-link
                  :to="($i18n.defaultLocale != $i18n.locale)?
                    '/' + $i18n.locale + '/'+ (camp.country.name).toLowerCase() +'/' + camp.slug
                    :'/'+ (camp.country.name).toLowerCase() +'/' + camp.slug"
                >{{camp.name}}</nuxt-link>
              </li>
            </ul>
          </div>
        </div>
        <div class="personal">
          <h3>{{$t('nav.clientarea')}}</h3>
          <ul>
            <li v-if="$store.state.auth.loggedIn">
              <nuxt-link :to="localePath('clientarea')">{{$t('clientarea.my_bookings')}}</nuxt-link>
            </li>
            <li v-else>
              <nuxt-link :to="localePath('login')">{{$t('login')}}</nuxt-link>
            </li>
            <li v-if="$store.state.auth.loggedIn">
              <a href="javascript:void(0)" @click="logout()">{{$t('logout')}}</a>
            </li>
            <li v-else>
              <nuxt-link :to="localePath('login')+'?action=register'">{{$t('register')}}</nuxt-link>
            </li>
          </ul>
        </div>
        <div class="contacts">
          <h3>{{$t('nav.contacts')}}</h3>
          <ul>
            <li>
              <span class="phone">{{$t('contacts.location1.sale_phone')}}</span>
              ({{$t('contacts.salesDepartment')}})
            </li>
            <li>{{$t('contacts.email')}}: {{$t('contacts.location1.sale_email')}}</li>
          </ul>
        </div>
      </div>
      <div class="footer-legal">
        <div>Embassy Camps 2019</div>
        <div>
          <a href="javascript:void(0)" @click="showPDP=true">{{$t('nav.personal_data_greement')}}</a>
        </div>
        <div class="social-buttons">
          <a :href="$store.state.socialMedia.facebook" target="_blank">
            <img src="/img/icons/fb-icon.svg" />
          </a>
          <a :href="$store.state.socialMedia.vk" target="_blank">
            <img src="/img/icons/vk-icon.svg" />
          </a>
          <a :href="$store.state.socialMedia.insta" target="_blank">
            <img src="/img/icons/insta-icon.svg" />
          </a>
        </div>
      </div>
    </div>

    <transition name="slide">
      <div class="cookie-bar" v-show="!cookieAllowed">
        <div class="container">
          {{$t('cookie_warning')}}
          <a
            href="javascript:void(0)"
            class="btn2 btn2-form-sq-sm"
            @click="acceptCookie()"
          >{{$t('agree')}}</a>
        </div>
      </div>
    </transition>

    <client-only>
      <vk-modal-full center :show.sync="showPDP">
        <vk-grid
          collapse
          class="uk-grid-collapse uk-child-width-expand@s uk-flex-middle order-modal-body"
        >
          <!--spacer-->
          <div>
            <div class="uk-width-auto@m"></div>
          </div>
          <!--/spacer-->

          <div class="uk-width-1-2@m uk-padding-large mobile-order form-body">
            <vk-modal-full-close large @click="showPDP=false"></vk-modal-full-close>
            <div class="modal-logo mb-md">
              <img src="/img/logo.png" alt />
            </div>
            <div>
              <pdp />
              <div class="centered-button mt-md mb-md">
                <button class="btn2 btn2-form" @click="showPDP=false">{{$t('form.close')}}</button>
              </div>
            </div>
          </div>

          <!--spacer-->
          <div>
            <div class="uk-width-auto@m"></div>
          </div>
          <!--/spacer-->
        </vk-grid>
      </vk-modal-full>
    </client-only>
    <a href="#__nuxt" v-show="toTop" class="to-top"></a>
  </div>
</template>

<script>
//setConstFooterHeight
//let height = this.$refs.infoBox.clientHeight;

import pdp from "~/components/pdp";
import { setTimeout } from "timers";
export default {
  components: {},
  data() {
    return {
      showPDP: false,
      cookieAllowed: true,
      toTop: false
    };
  },
  components: {
    pdp
  },
  created() {
    if (process.client) window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    if (process.client) window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll(event) {
      // Any code to be executed when the window is scrolled
      this.toTop = window.scrollY > 500;
      //console.log(this.toTop);
    },
    async logout() {
      this.$toast
        .show(this.$t("logging_out"), {
          icon: {
            name: "watch"
          }
        })
        .goAway(1500);
      await this.$auth
        .logout({})
        .then(() => {
          this.$auth.logout();
          this.$router.push("/login");
        })
        .catch(err => {
          //this.snackbar.show = true;
          this.error = err.response.data.error;
          this.sending = false;
        });
    },
    setConstFooterHeight() {
      let height = this.$refs.pageFooter.clientHeight;
      let top = this.$refs.pageFooter.offsetTop;
      this.$store.commit("setConstFooterHeight", height);
      this.$store.commit("setConstFooterTopPos", top);
    },
    handleResize(event) {
      if (process.client) {
        let height = this.$refs.pageFooter.clientHeight;
        this.$store.commit("setConstFooterHeight", height);
        let top = this.$refs.pageFooter.offsetTop; //getBoundingClientRect().
        this.$store.commit("setConstFooterTopPos", top);
      }
    },
    acceptCookie() {
      localStorage.setItem("cookieAllowed", true);
      this.cookieAllowed = true;
    },
    isCookieAllowed() {
      let data = localStorage.getItem("cookieAllowed");
      if (!data) {
        setTimeout(() => {
          this.cookieAllowed = false;
        }, 500);
      }
    }
  },
  computed: {
    shortedMenu() {
      let r = this.$store.state.campListMenu.filter((v, i) => {
        if (i < 3) return v;
      });
      //console.log(r)
      return r;
    }
  },
  mounted() {
    this.setConstFooterHeight();
    this.isCookieAllowed();
  }
};
</script>

<style lang="scss">
#footer {
  margin-top: 3rem;
  background: #f3f3f3;
  @media screen and (max-width: 900px) {
    margin-top: 2rem;
  }
  .footer-main {
    padding: 40px 0 20px;
    display: grid;
    grid-template-columns: 180px max-content repeat(2, 1fr);
    grid-gap: 20px;
    align-items: start;
    justify-items: center;
    @media screen and (max-width: 1400px) {
      grid-template-columns: 68px max-content repeat(2, 1fr);
    }
    @media screen and (max-width: 1200px) {
      grid-template-columns: max-content repeat(2, 1fr);
    }
    @media screen and (max-width: 900px) {
      grid-template-columns: 100%;
      padding: 30px 0 0px;
    }
  }
  h3 {
    margin-bottom: 20px;
    font-weight: 700;
    font-size: 18px;
    color: #888;
    @media screen and (max-width: 900px) {
      margin-bottom: 8px;
      text-align: center;
    }
  }

  .navigation {
    display: grid;
    grid-template-columns: 1fr 1fr;
    border-right: 1px solid #ccc;
    grid-gap: 30px;
    padding: 0 40px;
    @media screen and (max-width: 900px) {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border-right: none;
    }
  }
  ul {
    padding-left: 0;
    li {
      line-height: 2;
      color: #888;
      a:not(.nuxt-link-active) {
        color: #888;
      }
    }
    @media screen and (max-width: 900px) {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border-right: none;
      padding-left: 0 !important;
      margin: 4px 0 20px;
    }
  }
  .footer-legal {
    display: flex;
    border-top: 1px solid #e6e6e6;
    padding: 10px 0;
    justify-content: flex-start;
    align-items: center;
    @media screen and (max-width: 900px) {
      flex-direction: column;
    }
    & > div > a {
      color: #888 !important;
      &:hover {
        color: #888 !important;
      }
    }
    & > div {
      color: #888 !important;
      @media screen and (max-width: 900px) {
        margin-bottom: 10px;
      }
      &:not(:last-of-type) {
        margin-right: 50px;
        @media screen and (max-width: 600px) {
          margin-right: 0;
        }
      }
    }
  }
  .footer-logo {
    width: 100%;
    height: 100%;
    min-height: 88px;
    //padding: 0 30px;
    @media screen and (max-width: 900px) {
      //display: none;
      align-self: center;
    }
    @media screen and (max-width: 900px) {
      width: 100%;
      height: 56px;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        max-width: 150px;
      }
    }
  }
  .social-buttons {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    a {
      display: inline-block;
      width: 32px;
      height: 32px;
      display: flex;
      justify-content: center;
      align-items: center;
      border: solid 1px #ff5722;
      border-radius: 50%;
      &:not(:last-of-type) {
        margin-right: 8px;
      }
      img {
        height: 16px;
        width: 16px;
      }
    }
  }
  .phone {
    color: #ff5722;
  }
  .contacts {
    @media screen and (max-width: 900px) {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border-right: none;
      padding-left: 0 !important;
    }
  }
}
.left {
  h3 {
    @media screen and (max-width: 900px) {
      display: none;
    }
  }
}
.footer-camp-list {
  max-width: 200px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow-x: hidden;
  @media screen and (max-width: 900px) {
    max-width: 600px;
  }
  @media screen and (max-width: 600px) {
    max-width: 340px;
  }
}
.cookie-bar {
  position: fixed;
  width: 100%;
  bottom: 0;
  padding: 10px 10px;
  background: #ffff6e;
  z-index: 9999;
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    .btn2-form-sq-sm {
      margin-left: 20px;
    }
  }
}
</style>

