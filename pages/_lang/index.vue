<template>
  <div class="index-page-only">
    <!-- top head with navigation -->
<!--    <section class="b01" v-lazy:background-image="mainBgImage">-->
    <section class="b01" :style="{backgroundImage: 'url(' +mainBgImage.src + ')'}">
      <NavMain />
      <div class="b01_in2">
        <div class="container-name">
          <div class="sitename">
            <div class="top-capture">
              <p class="b01_in2_tx1">{{$t('index.b1.head')}}</p>
              <p class="b01_in2_tx2">{{$t('index.b1.camp')}}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- / top head with navigation -->

    <!-- counter -- temporary disabled -->
    <section class="b03" v-if="cd.count>0">
      <div class="container">
        <div class="flex flex-justify flex-v-center">
          <div class="col6 b03_col6">
            <div class="b03_in1">
              <div class="flex flex-justify">
                <div class="col0">
                  <p class="b03_in1_tx1 js-tmr_days">{{cd.days}}</p>
                  <p class="b03_in1_tx2 js-tmr_days_txt">{{$t('days')}}</p>
                </div>
                <div class="col0 b03_fix_with">
                  <div class="flex1">
                    <div>
                      <p class="b03_in1_tx1 js-tmr_hour">{{cd.hours}}</p>
                      <p class="b03_in1_tx2 js-tmr_hour_txt">{{$t('hours')}}</p>
                    </div>
                    <div class="b03_in3">
                      <p class="b03_in1_tx1">:</p>
                    </div>
                    <div>
                      <p class="b03_in1_tx1 js-tmr_min">{{cd.minutes}}</p>
                      <p class="b03_in1_tx2 js-tmr_min_txt">{{$t('minutes')}}</p>
                    </div>
                    <div class="b03_in3">
                      <p class="b03_in1_tx1">:</p>
                    </div>
                    <div>
                      <p class="b03_in1_tx1 js-tmr_sec">{{cd.seconds}}</p>
                      <p class="b03_in1_tx2 js-tmr_sec_txt">{{$t('seconds')}}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col6 b03_col6">
            <div class="b03_in5">
              <p class="b01_in2_tx1">{{$t('landingCommon.promo.header')}}</p>
              <p
                class="b03_in5_tx2"
              >{{$t('landingCommon.promo.desc1')}} {{promoDate}} {{$t('landingCommon.promo.desc2')}}</p>
              <div class="b03_in5_tx3">
                <a
                  href="javascript:void(0)"
                  class="btn1"
                  @click="showPrice=false;openOrderForm($event)"
                >{{$t('landingCommon.buttons.get_prize')}}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- /counter -->

    <!-- main header -->
    <section class="b05">
      <div class="container">
        <div class="flex-main-header">
          <div class="b05-header">
            <h1 class="b01_in2_tx1" v-html="$t('index.b5.header')"></h1>
          </div>
          <div class="b05-desc">
            <p class="b05_in1_tx1">{{$t('index.b5.desc')}}</p>
          </div>
        </div>
      </div>
    </section>
    <!-- / main header -->

    <!-- COUNTERS -->
    <section class="b04">
      <div class="container">
        <div class="flex flex-justify">
          <!--LOOP-->
          <div class="col4" v-for="(b,index) in $t('landingCommon.fake_counter')" :key="index">
            <div class="b04_in1">
              <img :src="b.img" alt />
            </div>
            <div class="b04_in2">
              <p>
                {{b.p1}}
                <br />
                {{b.p2}}
              </p>
            </div>
          </div>
          <!--/LOOP-->
        </div>
      </div>
    </section>
    <!-- /COUNTERS -->

    <section class="b05_02" id="ourCamps">
      <div class="container">
        <div class="b05_02_header">
          <h2>{{$t('index.b5_2.header')}}</h2>
        </div>

        <!-- HERE WE SHOW THE CAROUSEL -->
        <client-only v-if="products.length==0">
          <div class="inner loading">
            <vk-spinner ratio="3.5"></vk-spinner>
          </div>
        </client-only>

        <div class="camp-spinner">
          <CampList :products="products" :localDateFormat="localDateFormat" />
        </div>
      </div>
    </section>

    <!-- skills -->
    <section class="b06">
      <div class="container">
        <div class="capture">
          <div class="top-capture">
            <p class="b06_in2_tx1">{{$t('index.b6.header')}}</p>
            <p class="b06_in2_tx2">{{$t('index.b6.body')}}</p>
          </div>
        </div>

        <client-only>
          <!-- icon loop here -->
          <!--<owl-carousel
        :autoplay="false"
        :nav="true"
        :items="5"
        :dots="false"
        :navText='["", ""]'
        :autoWidth="true">
      <div v-for="(icon, index) in $t('index.b6.icons')" :key="index" class="skills-icons">
        <div class="icon-container" :style="{'background-image': 'url(\''+icon.icon + '\')'}"></div>
        <span>{{icon.text}}</span>
      </div>

          </owl-carousel>-->

          <carousel
            :autoplay="false"
            :navigationEnabled="true"
            :perPageCustom="[[0, 2], [800, 3], [1024, 4], [1400, 5]]"
            :paginationEnabled="true"
            :autoplayTimeout="4000"
            :navigationNextLabel="null"
            :navigationPrevLabel="null"
          >
            <slide v-for="(icon, index) in $t('index.b6.icons')" :key="index" class="skills-icons">
              <div class="icon-container" :style="{'background-image': 'url(\''+icon.icon + '\')'}"></div>
              <span>{{icon.text}}</span>
            </slide>
          </carousel>
        </client-only>
        <!-- /icon loop here -->
      </div>
    </section>
    <!-- / skills -->

    <!-- SECURITY STUFF -->
    <section class="b05_02">
      <div class="container">
        <div class="b05_02_header">
          <p class="_l">{{$t('landing.b5_2.header1')}}</p>
          <p class="_r">{{$t('landing.b5_2.header2')}}</p>
        </div>
        <div class="b05_02_shield">
          <img src="/img/shield.svg" />
        </div>
        <h2 class="sbh">{{$t('landing.b5_2.header3')}}</h2>

        <p class="sbh_d">{{$t('landing.b5_2.header4')}}</p>
        <div class="b05_02_points">
          <span v-for="(p,index) in $t('landingCommon.security_blocks')" :key="index">{{p.body}}</span>
        </div>
      </div>
    </section>
    <!-- / SECURITY STUFF -->

    <!--custom summer camps-->
    <section class="b07_custom">
      <div class="container">
        <div class="b07_custom_header">{{$t('index.b7.header')}}</div>
        <div class="b07_custom_text">{{$t('index.b7.body')}}</div>
        <a
          href="javascript:void(0)"
          class="btn1"
          @click="showPrice=false;openOrderForm($event)"
        >{{$t('landingCommon.buttons.make_order')}}</a>
      </div>
    </section>
    <!--/custom summer camps-->

    <!----- PAST CAMPS ------>
    <section class="b05_02 mb-0">
      <div class="container">
        <div class="b05_02_header">
          <h2>{{$t('index.past_camps.header')}}</h2>
        </div>

        <!-- HERE WE SHOW THE CAROUSEL -->
        <client-only v-if="pastProducts.length==0">
          <div class="inner loading">
            <vk-spinner ratio="3.5"></vk-spinner>
          </div>
        </client-only>

        <div class="camp-spinner">
          <PastCampList :products="pastProducts" :localDateFormat="localDateFormat" />
        </div>
      </div>
    </section>
    <!----- / PAST CAMPS ------>

    <!-- MAIN VIDEO -->
    <section class="b09">
      <client-only>
        <silentbox-single
          src="https://www.youtube.com/watch?v=8CvTwwAZmK0"
          :autoplay="autoplay"
          description="Embassy English Camp"
        >
          <div class="container">
            <div class="b09_in1">
              <div class="flex1 flex-v-center">
                <div class="b09_in1_plb"></div>
                <p class="b09_in1_tx">{{$t('landing.b9.header')}}</p>
              </div>
            </div>
          </div>
        </silentbox-single>
      </client-only>
    </section>
    <!-- /MAIN VIDEO -->

    <section class="b08">
      <div class="container">
        <div class="b08_row">
          <div class="flex flex-justify flex-v-center">
            <div class="col6 no-pad-rt carouselLanding">
              <client-only>
                <owl-carousel
                  :autoplay="false"
                  :nav="true"
                  :items="1"
                  :dots="true"
                  :navText="['', '']"
                >
                  <div v-for="(item, index) in carousels.carousel1" :key="index">
<!--                    <div class="facility-c" v-lazy:background-image="item"></div>-->
                    <div class="facility-c" :style="{backgroundImage: 'url(' +item + ')'}"></div>
                  </div>
                </owl-carousel>
              </client-only>
            </div>
            <div class="col5 s1">
              <p class="b08_tx1">{{$t('index.b8.s1.header')}}</p>
              <p class="b08_tx2">{{$t('index.b8.s1.body')}}</p>
            </div>
          </div>
        </div>
        <div class="b08_row">
          <div class="flex flex-justify flex-v-center">
            <div class="col5 s2">
              <p class="b08_tx1">{{$t('index.b8.s2.header')}}</p>
              <p class="b08_tx2">{{$t('index.b8.s2.body')}}</p>
            </div>
            <div class="col6 no-pad-lt carouselLanding">
              <client-only>
                <owl-carousel
                  :autoplay="false"
                  :nav="true"
                  :items="1"
                  :dots="true"
                  :navText="['', '']"
                >
                  <div v-for="(item, index) in carousels.carousel2" :key="index">
<!--                    <div class="facility-c" v-lazy:background-image="item"></div>-->
                    <div class="facility-c" :style="{backgroundImage: 'url(' +item + ')'}"></div>
                  </div>
                </owl-carousel>
              </client-only>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="b02">
      <div class="b02_header container">
        <h3>{{$t('index.comments.mainHeader')}}</h3>
      </div>
      <div class="container">
        <Comments :comments="comments" />
      </div>
    </section>

    <Footer />
    <!------------------------ @@@@@@ -------------------------------->

    <!------------------------ MODALS -------------------------------->

    <client-only>
      <!------ REVIEWS ------->
      <vk-modal size="container" :show.sync="modal.reviews" id="f-reviews">
        <vk-modal-close @click="toggleReviews()"></vk-modal-close>
        <carousel :autoplay="false" :nav="true" :items="1" :dots="false">
          <div v-for="(item, index) in reviews.tmpImages" :key="index" class="reviews">
            <div class="items_tx1" v-if="item.comment && item.name">
              <p class>{{item.name}}</p>
              <p class>{{item.comment}}</p>
            </div>
            <div class="reviews__holder">
              <div class="reviews__holder_img-container">
                <img class="review" :src="item.src" />
              </div>
            </div>
          </div>
        </carousel>
      </vk-modal>
      <!------/REVIEWS ----->
    </client-only>
    <MakeRequest
      :showContactForm="modal.makeOrder"
      @close-order-form="closeOrderForm"
      :userData="userData"
    />
    <!-- END OF MODALS -->
  </div>
</template>

<script>
//import { fireDb } from '~/plugins/firebase.js';
//import axios from 'axios';
import NavMain from "~/layouts/partials/NavMain";
import Footer from "~/layouts/partials/footer";
import OrderForm from "~/components/OrderForm";
import OrderStepper from "~/components/OrderStepper";
import Comments from "~/components/Comments";
import VkAccordion from "~/components/VkAccordion";
import referralMixin from "~/mixins/referralMixin.js";
import generalMixin from "~/mixins/generalMixin.js";
import CampList from "~/components/CampList";
import PastCampList from "~/components/PastCampList";
import MakeRequest from "~/components/MakeRequest";

const MILLISECONDS_SECOND = 1000;
const MILLISECONDS_MINUTE = 60 * MILLISECONDS_SECOND;
const MILLISECONDS_HOUR = 60 * MILLISECONDS_MINUTE;
const MILLISECONDS_DAY = 24 * MILLISECONDS_HOUR;

//var locale;
export default {
  mixins: [referralMixin, generalMixin],
  layout: "default",
  auth: false,
  async fetch({ app, store, params, req }) {
    if (process.server && req) {
      console.time('1')
      await Promise.all([
        app.$axios.get("/helpers/country/list"),
        app.$axios.get("/products/past/list?lang=" + app.i18n.locale),
        app.$axios.get("/products/list?lang=" + app.i18n.locale)
      ]).then(([responseCountry, responseProductsPast, responseProducts]) => {
        store.commit("setCountries", responseCountry.data);
        store.commit("setPastProducts", responseProductsPast.data.data);
        store.commit("setProducts", responseProducts.data.data);
        console.timeEnd('1')
      }).finally(() => {
        let arr = [];
        for (let i = 0, lth = store.state.products.length; i < lth; i++) {
          let y = {
            "@context": "https://www.schema.org",
            "@type": "product",
            brand: "Embassy Camps",
            logo: "https://" + req.headers.host + "/img/logo.png",
            name: store.state.products[i].name,
            category: store.state.products[i].name,
            image: store.state.products[i].image,
            description: store.state.products[i].seo_description,
            aggregateRating: {
              "@type": "aggregateRating",
              ratingValue: store.state.products[i].rating,
              reviewCount: store.state.products[i].reviews_count
            },
            offers: {
              "@type": "Offer",
              priceCurrency: "USD",
              price: store.state.products[i].variations[0].price,
              availability: "http://schema.org/InStock"
            }
          };
          arr.push(y);
        }
        store.commit("setSeoSdMain", arr);
      });
    }
  },
  data() {
    return {
      mainBgImage: {
        src: "/img/b01_bg.jpg",
        loading: ""
      },
      comments: this.$t("landing.comments"),
      promoDayLast: 30,
      promoMonths: 3, //how many months before will be promo
      locale: this.$i18n.locale,
      autoplay: true,
      showPrice: false,
      carousels: {
        carousel1: [
          "https://res.cloudinary.com/embassy-alliance-travel-sdn-bhd/image/upload/v1574497622/education/IMG_5834_ie1ndg.jpg",
          "https://res.cloudinary.com/embassy-alliance-travel-sdn-bhd/image/upload/v1574490237/education/IMG_5484_vemboh.jpg",
          "https://res.cloudinary.com/embassy-alliance-travel-sdn-bhd/image/upload/v1574484280/education/IMG_6612_cwoxxq.jpg",
          "https://res.cloudinary.com/embassy-alliance-travel-sdn-bhd/image/upload/v1574484278/education/IMG_6840_y1fvwf.jpg",
          "https://res.cloudinary.com/embassy-alliance-travel-sdn-bhd/image/upload/v1574484276/education/IMG_5155_lp6a2b.jpg",
          "https://res.cloudinary.com/embassy-alliance-travel-sdn-bhd/image/upload/v1574503547/education/fit_reryjs.jpg",
          "https://res.cloudinary.com/embassy-alliance-travel-sdn-bhd/image/upload/v1574499257/education/IMG_7980_xszkdw.jpg"
        ],
        carousel2: [
          "https://res.cloudinary.com/embassy-alliance-travel-sdn-bhd/image/upload/v1574490260/education/IMG_7029_mo6eas.jpg",
          "https://res.cloudinary.com/embassy-alliance-travel-sdn-bhd/image/upload/v1574411254/education/IMG_5300_irptrw.jpg",
          "https://res.cloudinary.com/embassy-alliance-travel-sdn-bhd/image/upload/v1574411253/education/IMG_3943_gi2ftg.jpg",
          "https://res.cloudinary.com/embassy-alliance-travel-sdn-bhd/image/upload/v1574411252/education/IMG_3909_g4a9dx.jpg",
          "https://res.cloudinary.com/embassy-alliance-travel-sdn-bhd/image/upload/v1581420300/education/Smart-Camp-15_bmgyrn.jpg"
        ]
      },
      formError: "",
      reviews: {
        tmpImages: [],
        images: [],
        index: null
      },
      promoDate: "",
      simpleForm: true,
      stepper: {
        step: 1
      },
      contact: {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        age: 9,
        message: "",
        response: ""
      },
      writeSuccessful: false,
      //userData: {},
      variationTemplate: {
        id: "",
        name: "Please Select The Camp first",
        price: 0
      },
      modal: {
        makeOrder: false,
        inquire: false,
        register: false,
        registerLoader: false,
        loader: false,
        reviews: false
      },
      login: {
        username: "",
        password: ""
      },
      register: {
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        password_repeat: ""
      },
      products: [],
      pastProducts: [],
      countries: this.$store.state.countries,
      addons: [],
      order: {
        productID: "",
        variationID: "",
        participant: {
          firstName: "",
          lastname: "",
          email: "",
          address: "",
          city: "",
          countryID: "",
          phone: "",
          company: "",
          passport: {
            number: "",
            expire: ""
          },
          birthDate: ""
        },
        parent: {
          firstName: "",
          lastname: "",
          email: "",
          phone: ""
        }
      },
      cd: {
        count: 0,
        days: "00",
        hours: "00",
        minutes: "00",
        seconds: "00",
        counting: false,
        endTime: 0,
        started: false,
        enable: true
      }
    };
  },
  head() {
    //const i18nSeo = this.$nuxtI18nSeo()
    return {
      title: this.$t("index.title"),
      meta: [
        { name: "description", content: this.$t("index.description") },
        { name: "keywords", content: this.$t("index.keywords") }
      ],
      __dangerouslyDisableSanitizers: ["script"],
      script: [
        {
          innerHTML: JSON.stringify(this.$store.state.seoSdMain),
          type: "application/ld+json"
        }
      ]
    };
  },
  components: {
    NavMain,
    OrderForm,
    OrderStepper,
    Comments,
    VkAccordion,
    Footer,
    CampList,
    MakeRequest,
    PastCampList
  },
  mounted() {
    this.getReferrence();
    this.getProducts();
    this.getPastProducts();
    //this.getAddons();
  },
  methods: {
    async getProducts() {
      if (this.$store.state.products.length > 0) {
        this.products = this.$store.state.products;
        //console.log('products loaded from Vuex');
        //console.log(this.products);
      } else {
        await this.$axios
          .get("/products/list?lang=" + this.$i18n.locale)
          .then(response => {
            this.products = response.data.data;
            ////console.log(this.products);
          })
          .catch(err => {})
          .finally(() => {
            //this.initCountDown(this.product.starts_at);
            ////console.log("starts at: " + this.product.starts_at)
          });
      }
    },
    async getPastProducts() {
      if (this.$store.state.pastProducts.length > 0) {
        this.pastProducts = this.$store.state.pastProducts;
        //console.log('past products loaded from Vuex');
        //console.log(this.pastProducts);
      } else {
        await this.$axios
          .get("/products/past/list?lang=" + this.$i18n.locale)
          .then(response => {
            this.pastProducts = response.data.data;
            //console.log('past products loaded via browser');
            //console.log(this.pastProducts);
          })
          .catch(err => {})
          .finally(() => {
            //this.initCountDown(this.product.starts_at);
            ////console.log("starts at: " + this.product.starts_at)
          });
      }
    },
    async getAddons() {
      await this.$axios
        .get("/addons/list")
        .then(response => {
          //console.log(response.data)
          //this.products.push(...response.data.data);
          this.addons = response.data;
        })
        .catch(err => {});
    },

    setInitialVariation() {
      this.order.variationID = this.product.variations[
        this.product.variations.length - 1
      ].id;
    },
    openOrderForm(e) {
      e.stopPropagation();
      this.modal.makeOrder = true;
      this.$store.commit("setStickyNav", false);
      this.$store.commit("setstickyNavDisabled", true);
    },
    closeOrderForm() {
      this.modal.makeOrder = false;
      this.$store.commit("setstickyNavDisabled", false);
    },
    countDownCalc() {
      this.cd.days = (function(c) {
        let a = Math.floor(c / MILLISECONDS_DAY);
        if (a < 10) {
          a = "0" + a;
        }
        return a;
      })(this.cd.count);

      this.cd.hours = (function(c) {
        let a = Math.floor((c % MILLISECONDS_DAY) / MILLISECONDS_HOUR);
        if (a < 10) {
          a = "0" + a;
        }
        return a;
      })(this.cd.count);

      this.cd.minutes = (function(c) {
        let a = Math.floor((c % MILLISECONDS_HOUR) / MILLISECONDS_MINUTE);
        if (a < 10) {
          a = "0" + a;
        }
        return a;
      })(this.cd.count);

      this.cd.seconds = (function(c) {
        const seconds = (c % MILLISECONDS_MINUTE) / MILLISECONDS_SECOND;
        let a = Math.floor(seconds);
        if (a < 10) {
          a = "0" + a;
        }
        return a;
      })(this.cd.count);
    },
    countDownStart() {
      if (!this.cd.enable) {
        return null;
      }
      setInterval(
        function() {
          this.cd.count -= 1000;
          this.countDownCalc();
        }.bind(this),
        1000
      );
    },
    initCountDown(date) {
      var ts = Math.round(new Date().getTime());
      const [year, month, day] = [...date.split("-")];
      const monthIndex = month - 1; // remember that Date's contructor 2nd param is monthIndex (0-11) not month number (1-12)!
      var eventDate = new Date(year, monthIndex, this.promoDayLast); //year, monthIndex, day
      eventDate.setMonth(eventDate.getMonth() - this.promoMonths);
      this.promoDate = eventDate.toLocaleDateString();
      var ts2 = Math.round(eventDate.getTime());
      this.cd.count = ts2 - ts;
      if (this.cd.count > 0 && !this.cd.started && !this.$route.query.cd) {
        this.countDownStart();
        this.cd.started = true;
      }
    }
  }
};
</script>

