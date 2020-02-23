<template>
  <div>
    <!---- LOGIN ---->
    <div class="loginForm" v-if="modeLogin && !$store.state.orderSending">
      <form data-vv-scope="login" class="form-verification">
        <fieldset class="uk-fieldset">
          <legend class="uk-legend">{{$t('user_login')}}</legend>

          <div class="uk-margin">
            <input class="uk-input" v-model="username" type="text" :placeholder="$t('form.email')" />
          </div>

          <div class="uk-margin mb-sm">
            <input
              class="uk-input"
              v-model="password"
              type="password"
              :placeholder="$t('form.password')"
            />
          </div>

          <div class="uk-margin mt-md mb-sm">
            <a
              href="javascript:void(0)"
              class="btn1 btn1-form-sm"
              @click="postLogin()"
            >{{$t('login')}}</a>
          </div>
          <div class="uk-margin mt-sm social-buttons">
            <a href="javascript:void(0)" class="link-b" @click="modeLogin=false">{{$t('register')}}</a>
            <a href="javascript:void(0)" @click="smLogin('facebook')">
              <img class="social-buttons__icon" src="/img/facebook-logo-button.svg" />
            </a>
            <a href="javascript:void(0)" @click="smLogin('google')">
              <img class="social-buttons__icon" src="/img/google-plus-logo-button.svg" />
            </a>
          </div>
        </fieldset>
      </form>
    </div>
    <!--/end of login-->

    <!-- REGISTRATION --->
    <div v-if="!modeLogin && !$store.state.orderSending" class="regForm">
      <div class="modal-uploading" v-show="register.inprogress">
        <div class="inner loading">
          <vk-spinner ratio="2.5"></vk-spinner>
        </div>
      </div>
      <form data-vv-scope="register" class="form-verification" v-show="!register.inprogress">
        <fieldset class="uk-fieldset registration">
          <legend class="uk-legend">{{ $t('form.user_registration') }}</legend>

          <div class="uk-margin">
            <input
              name="first_name"
              class="uk-input"
              v-model="register.firstName"
              v-validate="'required|min:2'"
              :data-vv-as="$t('form.first_name')"
              type="text"
              :placeholder="$t('form.first_name')"
            />
            <span
              v-if="errors.has('register.first_name')"
              class="input-invalid"
            >{{ errors.first('register.first_name') }}</span>
          </div>

          <div class="uk-margin">
            <input
              name="last_name"
              class="uk-input"
              v-model="register.lastName"
              v-validate="'required|min:2'"
              :data-vv-as="$t('form.last_name')"
              type="text"
              :placeholder="$t('form.last_name')"
            />
            <span
              v-if="errors.has('register.last_name')"
              class="input-invalid"
            >{{ errors.first('register.last_name') }}</span>
          </div>

          <div class="uk-margin">
            <input
              :class="{'uk-input':true, 'input-area-invalid':emailErrorMessage, 'input-area-valid':emailValidated}"
              name="email"
              @change="validateEmail()"
              v-model="register.email"
              type="email"
              :placeholder="$t('form.email')"
              rquired
            />
            <span v-if="errors.has('email')" class="input-invalid">{{ errors.first('email') }}</span>
            <span
              v-if="emailErrorMessage"
              class="input-invalid"
            >{{ $t('backend.'+emailErrorMessage) }}</span>
          </div>

          <div class="uk-margin">
            <input
              class="uk-input"
              v-validate="'required|min:6|max:35'"
              v-model="register.password"
              type="password"
              name="password"
              :data-vv-as="$t('form.password')"
              :placeholder="$t('form.password')"
              ref="password"
            />
            <span
              v-if="errors.has('register.password')"
              class="input-invalid"
            >{{ errors.first('register.password') }}</span>
          </div>

          <div class="uk-margin mb-sm">
            <input
              class="uk-input"
              v-model="register.password2"
              v-validate="'required|confirmed:password'"
              type="password"
              name="password2"
              :data-vv-as="$t('form.password_repeat')"
              :placeholder="$t('form.password_repeat')"
            />
            <span
              v-if="errors.has('register.password2')"
              class="input-invalid"
            >{{ errors.first('register.password2') }}</span>
          </div>

          <div class="uk-margin mt-md mb-sm">
            <a
              href="javascript:void(0)"
              class="btn1 btn1-form-sm"
              @click="preRegister()"
            >{{$t('register')}}</a>
          </div>
          <div class="uk-margin mt-sm social-buttons">
            <a href="javascript:void(0)" class="link-b" @click="modeLogin=true">{{$t('login')}}</a>
            <a href="javascript:void(0)" @click="smLogin('facebook')">
              <img class="social-buttons__icon" src="/img/facebook-logo-button.svg" />
            </a>
            <a href="javascript:void(0)" @click="smLogin('google')">
              <img class="social-buttons__icon" src="/img/google-plus-logo-button.svg" />
            </a>
          </div>
        </fieldset>
      </form>
    </div>
    <!-- / end of registration-->
    <client-only>
      <vk-modal center v-show="socialiteLogin">
        <div v-if="socialiteLogin=='success'" class="waiting">
          <div class="uk-alert-success" uk-alert>
            <header>{{$t('payment.successful')}}</header>
            <p>{{$t('payment.successful_desc')}}</p>
          </div>
        </div>
        <div v-else-if="socialiteLogin=='failed'" class="waiting">
          <div class="uk-alert-danger" uk-alert>
            <header>{{$t('payment.failed')}}</header>
            <p>{{$t('payment.failed_desc')}}</p>
          </div>
        </div>
        <div v-else class="waiting">
          <span>{{$t('form.logging_in')}}</span>
          <div class="inner loading">
            <vk-spinner ratio="3.5"></vk-spinner>
          </div>
        </div>
      </vk-modal>
    </client-only>
  </div>
</template>

<script>
import Notification from "~/components/Notification";
import generalMixin from "~/mixins/generalMixin.js";

export default {
  layout: "order",
  mixins: [generalMixin],
  //middleware: 'notAuthenticated', <- old one, not use
  components: {
    Notification
  },
  data() {
    return {
      emailErrorMessage: null,
      emailValidated: false,
      modeLogin: true,
      username: "",
      password: "",
      socialiteLogin: null,
      //username: '',
      //password: '',
      error: null,
      //sending: false,
      register: {
        inprogress: false,
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        password2: ""
      }
    };
  },
  mounted() {
    window.addEventListener("message", this.onMessage, false);

    if (
      typeof this.$route.query != "undefined" &&
      this.$route.query.action == "register"
    ) {
      this.modeLogin = false;
    }
  },
  beforeDestroy() {
    window.removeEventListener("message", this.onMessage);
  },
  methods: {
    async validateEmail() {
      this.emailErrorMessage = null;
      let test = this.emailRe.test(String(this.register.email).toLowerCase());
      if (!test) {
        this.emailErrorMessage = "not_valid_email";
      }
      let url = "/user/email/new/validate/" + this.register.email;
      await this.$axios
        .get(url)
        .then(response => {
          //console.log('email is okie')
          this.emailValidated = true;
        })
        .catch(err => {
          //this.snackbar.show = true;
          this.emailErrorMessage = err.response.data.message;
        });
    },
    async postLogin() {
      this.$store.commit("setOrderSending", true);
      await this.$auth
        .login({
          data: {
            email: this.username,
            password: this.password
          }
        })
        .then(() => {
          this.$toast
            .show(this.$t("form.logging_in"), {
              icon: {
                name: "watch"
              }
            })
            .goAway(1500);
          //this.$router.push('/clientarea')
          this.$router.go("/clientarea");
        })
        .catch(err => {
          //this.snackbar.show = true;
          this.error = err.response.data.error;
          this.$store.commit("setOrderSending", false);
        });
    },
    preRegister() {
      this.validateEmail();
      this.$validator.validateAll("register").then(result => {
        if (result) {
          this.postRegister();
        } else {
          this.messages.push({
            message: this.$t("clientarea.messages.form_general_error"),
            status: "danger"
          });
        }
      });
    },
    postRegister() {
      this.register.inprogress = true;
      this.$axios
        .post("/user/create", {
          first_name: this.register.firstName,
          last_name: this.register.lastName,
          email: this.register.email,
          password: this.register.password,
          lang: this.$i18n.locale
        })
        .then(response => {
          //console.log('Registration result: ', response.data.token);
          this.signinManually(response.data.token, false, response.data.email);
        })
        .catch(err => {
          this.register.inprogress = false;
        });
    },
    smLogin(provider) {
      if (!provider) {
        return null;
      }
      this.socialiteLogin = provider;
      const newWindow = openWindow("", "message");
      this.$axios
        .get("/socialite/login/" + provider)
        .then(response => {
          //console.log('SOCIALITE LOGIN RESPONSE ', response.data);
          //window.location = response.data;
          newWindow.location.href = response.data;
        })
        .catch(err => {
          //console.log(err)
        });
    },
    onMessage(e) {
      //console.log(e)
      //if (e.origin !== window.origin || !e.data.token) {
      //  return
      //}
      if (!e.data.token) {
        return;
      }
      //localStorage.setItem('user',e.data.name)
      //localStorage.setItem('jwt',e.data.token)
      //localStorage.setItem('auth._token.local',e.data.token)
      ////console.log(('jwt',e.data.token));
      this.signinManually(e.data.token, false, e.data.name);
      //this.$router.go('/clientarea');
    }
  }
};

function openWindow(url, title, options = {}) {
  if (typeof url === "object") {
    options = url;
    url = "";
  }

  options = { url, title, width: 600, height: 720, ...options };

  const dualScreenLeft =
    window.screenLeft !== undefined ? window.screenLeft : window.screen.left;
  const dualScreenTop =
    window.screenTop !== undefined ? window.screenTop : window.screen.top;
  const width =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    window.screen.width;
  const height =
    window.innerHeight ||
    document.documentElement.clientHeight ||
    window.screen.height;

  options.left = width / 2 - options.width / 2 + dualScreenLeft;
  options.top = height / 2 - options.height / 2 + dualScreenTop;

  const optionsStr = Object.keys(options)
    .reduce((acc, key) => {
      acc.push("${key}=${options[key]}");
      return acc;
    }, [])
    .join(",");

  const newWindow = window.open(url, title, optionsStr);

  if (window.focus) {
    newWindow.focus();
  }

  return newWindow;
}
</script>
<style lang="scss" scoped>
fieldset.registration {
  .uk-margin {
    display: flex;
    flex-direction: column;
    max-width: 360px;
    margin: 20px auto 20px;
  }
}
.btn1-form-sm {
  flex: 0;
  align-self: center;
  min-width: 200px !important;
}
.input-invalid {
  color: red !important;
  margin-top: 3px;
}
.uk-alert-success,
.uk-alert-danger {
  width: 100%;
  header {
    font-size: 24px;
  }
}
.waiting {
  display: flex;
  padding: 40px 0;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  span {
    display: block;
    margin-bottom: 40px;
  }
}

.loginForm {
  position: relative;

  //transform: translateY(-50%);
  min-width: 360px;
  .loading {
    display: flex;
    justify-content: center;
  }
}
.regForm {
  position: relative;
  //margin-top: 10vh;
  //transform: translateY(-50%);
  min-width: 360px;
}
.uk-legend {
  text-align: center;
  font-weight: 600;
}
.uk-margin {
  display: flex;
  justify-content: center;
}
.social-buttons {
  display: flex;
  justify-content: center;
  flex-direction: row !important;
  align-items: center;
  a {
    display: inline-block;
    &:not(:first-of-type) {
      margin-left: 24px;
    }
  }
}
</style>
