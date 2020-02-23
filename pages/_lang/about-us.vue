<template>
  <div class="about-us-page">
    <!-- top head with navigation -->
    <section class="b01" v-lazy:background-image="mainBgImage">
      <NavMain />
      <div class="b01_in2">
        <div class="container-name">
          <div class="sitename">
            <div class="top-capture">
              <p class="b01_in2_tx1">{{$t('index.b1.head')}}</p>
              <p class="b01_in2_tx2">{{$t('about.main_description')}}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- / top head with navigation -->

    <!-- MEET THE TEAM -->
    <section class="b02">
      <div class="container">
        <div>
          <p class="b01_in2_tx1">{{$t('about.meet_team')}}</p>
        </div>
        <client-only>
          <div class="flex flex-justify">
            <carousel
              :autoplay="true"
              :navigationEnabled="true"
              :perPageCustom="[[360, 1], [800, 2], [1024, 3]]"
              :paginationEnabled="true"
              :autoplayTimeout="4000"
              :loop="true"
              :navigationNextLabel="null"
              :navigationPrevLabel="null"
            >
              <slide class="item" v-for="(empl, index) in $t('about.team')" :key="index">
                <div class="employee">
                  <div
                    class="employee-img-container"
                    :style="{ 'background-image': 'url(' + empl.src + ')' }"
                  ></div>
                  <div class="employee-name">{{empl.head}}</div>
                  <div class="employee-position">{{empl.body}}</div>
                </div>
              </slide>
            </carousel>
          </div>
        </client-only>
      </div>
    </section>
    <!-- /MEET THE TEAM -->

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

    <!-- reviews gallery -->
    <section class="b12">
      <div class="b12_in" style="background: rgba(255,255,255,.85);">
        <p class="b01_in2_tx1">{{$t('about.b12.header')}}</p>
        <div class="b12_in_sb1">
          <a
            href="javascript:void(0)"
            class="btn2"
            @click="toggleReviews()"
          >{{$t('about.b12.button')}}</a>
        </div>
      </div>
    </section>
    <!-- /reviews gallery -->

    <!-- UPCOMING CAMPS -->
    <section class="b05_02">
      <div class="container">
        <div class="b05_02_header">
          <h2>{{$t('about.b5_2.header')}}</h2>
        </div>
        <!-- HERE WE SHOW THE CAROUSEL -->
        <div class="camp-spinner">
          <CampList :products="products" :localDateFormat="localDateFormat" />
        </div>
      </div>
    </section>

    <section class="b10">
      <div class="container">
        <div class="b10-top flex flex-wrap">
          <div class="col6">
            <p class="b01_in2_tx1">{{$t('about.b10.header')}}:</p>
          </div>
          <div class="col6">
            <p class="b01_in2_tx2">{{$t('about.b10.description')}}</p>
          </div>
        </div>

        <div class="flex flex-wrap principles-list">
          <div class="col6" v-for="(point, index) in $t('about.b10.list')" :key="index">
            <div class="b05_in2">
              <p class="b05_in2_tx1">{{point.head}}</p>
              <p class="b05_in2_tx2">{{point.body}}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- BLOG -->
    <section class="b02 blog">
      <div class="container">
        <div>
          <p class="b01_in2_tx1">{{$t('about.blog_articles')}}</p>
        </div>
        <carousel
          :autoplay="true"
          :navigationEnabled="true"
          :perPageCustom="[[0, 1], [1024, 3]]"
          :paginationEnabled="true"
          :autoplayTimeout="4000"
          :loop="true"
          :navigationNextLabel="null"
          :navigationPrevLabel="null"
        >
          <slide class="article-preview-short" v-for="(a,index) in articles" :key="index">
            <nuxt-link :to="localePath('blog') + '/' + a.slug" class="a-p">
              <div class="article-preview-image" :style="{'background-image':'url('+ a.image+')'}"></div>
              <div class="article-preview-summary">
                <h3>{{a.title}}</h3>
                <!--<div><v-clamp autoresize :max-lines="6">{{a.body.replace(/<[^>]*>?/gm, '')}}</v-clamp></div>-->
              </div>
            </nuxt-link>
          </slide>
        </carousel>
      </div>
    </section>
    <!-- /BLOG -->

    <!--- SOCIAL MEDIA --->
    <section class="b13">
      <div class="container">
        <div class="header">
          <h3>{{$t('about.b13.header')}}</h3>
        </div>
        <div class="buttons">
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
    </section>
    <!--- /SOCIAL MEDIA --->

    <section class="b14" v-show="showBottomButtons">
      <div class="flex1 flex-justify">
        <a
          href="javascript:void(0)"
          class="btn1"
          @click="showPrice=false;openOrderForm($event)"
        >{{$t('landingCommon.buttons.make_order')}}</a>
      </div>
    </section>

    <Footer />
    <!-------------------------------------------------- MODALS ------------------------------------------------>
    <client-only>
      <!------ REVIEWS ------->
      <vk-modal size="container" :show.sync="modal.reviews" id="b-reviews">
        <vk-modal-close @click="toggleReviews()"></vk-modal-close>
        <owl-carousel :autoplay="false" :nav="true" :items="1" :dots="false" class="no-btn">
          <div v-for="(item, index) in reviews.images" :key="index" class="reviews">
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
        </owl-carousel>
      </vk-modal>
      <!------ / REVIEWS ------->
    </client-only>

    <MakeRequest
      :showContactForm="modal.order"
      @close-order-form="closeOrderForm"
      :userData="userData"
    />
  </div>
</template>

<script>
import NavMain from "~/layouts/partials/NavMain";
import Footer from "~/layouts/partials/footer";
import OrderForm from "~/components/OrderForm";
import OrderStepper from "~/components/OrderStepper";
import CampList from "~/components/CampList";
import Comments from "~/components/Comments";
import referralMixin from "~/mixins/referralMixin.js";
import generalMixin from "~/mixins/generalMixin.js";
import MakeRequest from "~/components/MakeRequest";

var serverData = {};
export default {
  asyncData({ req, res }) {
    //req, res,
    if (process.server && req) {
      serverData = req.headers;
    }
  },
  mixins: [referralMixin, generalMixin],
  layout: "default",
  auth: false,
  head() {
    return {
      title: this.$t("about.title"),
      __dangerouslyDisableSanitizers: ["script"],
      script: [
        {
          innerHTML: JSON.stringify(this.structuredData),
          type: "application/ld+json"
        }
      ]
    };
  },
  data() {
    return {
      //serverData: {
      //},
      mainBgImage: {
        src: "/img/b01_bg.jpg",
        loading: ""
      },
      structuredData: [
        {
          "@context": "http://schema.org",
          "@type": "WebPage",
          name: this.$t("about.title"),
          description: this.$t("about.main_description"),
          publisher: {
            "@type": "AboutPage",
            name: this.$t("organization")
          }
        },
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              item: {
                "@id": "https://" + serverData.host + this.localePath("index"),
                name: "Home"
                //"image": "http://example.com/images/icon-book.png"
              }
            },
            {
              "@type": "ListItem",
              position: 2,
              item: {
                "@id": "https://" + serverData.host + this.$nuxt.$route.path,
                name: this.$t("about.title")
                //"image": "http://example.com/images/icon-book.png"
              }
            }
          ]
        }
      ],
      modal: {
        reviews: false,
        order: false,
        loader: false
      },
      articles: [],
      showBottomButtons: true,
      products: [],
      reviews: {
        tmpImages: [],
        images: [
          {
            src: "/img/smart_camp_reviews/rev_sc_3.jpg"
          },
          {
            src: "/img/smart_camp_reviews/rev_sc_4.jpg"
          },
          {
            src: "/img/smart_camp_reviews/rev_sc_5.jpg"
          },
          {
            src: "/img/smart_camp_reviews/rev_sc_6.jpg"
          },
          {
            src: "/img/smart_camp_reviews/rev_sc_7.jpg"
          },
          {
            src: "/img/smart_camp_reviews/rev_sc_8.jpg"
          },
          {
            src: "/img/smart_camp_reviews/rev_sc_1.jpg"
          },
          {
            src: "/img/smart_camp_reviews/rev_sc_2.jpg"
          },
          {
            src: "/img/smart_camp_reviews/rev_sc_10.jpg"
          },
          {
            src: "/img/smart_camp_reviews/rev_sc_11.jpg"
          },
          {
            src: "/img/smart_camp_reviews/rev_sc_12.jpg"
          },
          {
            src: "/img/smart_camp_reviews/rev_sc_13.jpg"
          },
          {
            src: "/img/smart_camp_reviews/rev_sc_14.jpg"
          },
          {
            src: "/img/smart_camp_reviews/rev_sc_15.jpg"
          },
          {
            src: "/img/smart_camp_reviews/rev_sc_16.jpg"
          },
          {
            src: "/img/smart_camp_reviews/rev_sc_17.jpg"
          },
          {
            src: "/img/smart_camp_reviews/rev_sc_18.jpg"
          },
          {
            src: "/img/smart_camp_reviews/rev_sc_19.jpg"
          },
          {
            src: "/img/smart_camp_reviews/rev_sc_20.jpg"
          },
          {
            src: "/img/smart_camp_reviews/rev_sc_21.jpg"
          }
        ],
        index: null
      }
    };
  },
  methods: {
    toggleReviews() {
      this.modal.reviews = !this.modal.reviews;
      this.$store.commit("setStickyNav", false);
    },
    openOrderForm() {
      this.$store.commit("setStickyNav", false);
      this.$store.commit("setstickyNavDisabled", false);
      this.modal.order = true;
    },
    closeOrderForm() {
      this.modal.order = false;
      this.$store.commit("setstickyNavDisabled", false);
    },
    async getArticles() {
      await this.$axios
        .get("/articles/list/" + this.$i18n.locale)
        .then(response => {
          //console.log(response.data)
          //this.products.push(...response.data.data);
          this.articles = response.data;
        })
        .catch(err => {})
        .finally(err => {
          this.loader = false;
        });
    }
  },
  computed: {},
  mounted() {
    this.getProducts();
    this.getArticles();
    //serverData = this.serverData;
  },
  components: {
    NavMain,
    OrderForm,
    OrderStepper,
    Comments,
    Footer,
    CampList,
    MakeRequest
  }
};
</script>

<style lang="scss" scoped>
$max-container: 675px * 2;

.b14 {
  margin: 80px auto 80px;
  .flex-justify {
    justify-content: center;
  }
  @media screen and (max-width: 600px) {
    margin: 0;
  }
}

.article-preview-short {
  a.a-p {
    background-color: #f5f5f5;
    width: 310px;
    height: 320px;
    display: inline-block;
    &::not(:last-of-type) {
      margin-right: 30px;
    }
    &:hover {
      text-decoration: none;
    }
    .article-preview-image {
      height: 76%;
      width: 100%;
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
    }
    h3 {
      font-size: 18px;
      font-weight: 700;
      display: flex;
      justify-content: flex-start;
      align-content: center;
      padding: 10px 16px;
      margin: 0;
      text-align: left;
      &:hover {
        text-decoration: none;
      }
    }
  }
}
.b13 {
  padding: 80px 0 110px;
  margin: 0;
  @media screen and (max-width: 600px) {
    padding: 40px 0 50px;
  }
  .header {
    margin: 20px auto 0;
    //max-width: 670px;
    h3 {
      font-size: 48px;
      font-weight: 700;
      color: #ffffff !important;
      @media screen and (max-width: 1400px) {
        font-size: 38px;
      }
      @media screen and (max-width: 600px) {
        font-size: 28px;
      }
    }
  }
  .buttons {
    display: flex;
    justify-content: center;
    img {
      display: inline-block;
      height: 32px;
      width: 32px;
      @media screen and (max-width: 600px) {
        height: 22px;
        width: 22px;
      }
    }
    a {
      background: white;
      height: 64px;
      width: 64px;
      display: inline-block;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      @media screen and (max-width: 600px) {
        height: 44px;
        width: 44px;
      }
      &:not(:last-of-type) {
        margin-right: 20px;
      }
    }
  }
}
.b01_in2 {
  //min-height: 800px;
  @media screen and (max-width: 1400px) {
    //min-height: unset;
    max-height: 760px;
    min-height: 600px;
  }
  @media screen and (max-width: 600px) {
    height: unset;
    min-height: 360px;
  }
}

.container {
  @media screen and(min-width: 1200px) {
    //max-width: $max-container;
  }
}
.VueCarousel {
  display: flex;
  flex-direction: column;
  position: relative;
  @media screen and(min-width: 1600px) {
    max-width: 1400px;
  }
}
.container-name {
  display: grid;
  grid-template-columns: 1fr 1fr;
  @media screen and (max-width: 1000px) {
    display: flex;
    justify-content: center;
    min-height: 80vh;
    align-items: center;
  }
  @media screen and (max-width: 600px) {
    padding: 160px 0 20px;
  }
}
.b02 {
  @media screen and (max-width: 600px) {
    max-height: unset;
  }
  &.blog {
    padding-top: 0;
    .b01_in2_tx1 {
      margin-bottom: 50px;
    }
    .container {
      @media screen and (max-width: 1400px) {
        max-width: 1100px;
      }
    }
  }
}
.sitename {
  width: 100%;
  //position: absolute;
  right: 0;
  //height: 100vh;
  max-height: 1200px;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 1) 0%,
    rgba(247, 247, 247, 1) 100%
  );
  padding: 0 8vw 0 8vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  grid-column: 2/3;
  padding-top: 18vw;
  padding-bottom: 6vw;

  @media screen and (max-width: 1400px) {
    //min-height: 80vh;
    max-height: 760px;
    min-height: 600px;
    //padding-top: 80px;
  }
  @media screen and (max-width: 1000px) {
    width: 90%;
    height: unset;
    min-height: unset;
    background: rgba(255, 255, 255, 0.92);
    padding-top: 50px;
  }
  @media screen and (max-width: 600px) {
    position: relative;
    width: unset;
    right: unset;
    height: unset;
    background: rgba(255, 255, 255, 0.92);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    bottom: 0;
    margin: 0 10px 20px;
    padding: 20px;
    padding-top: 40px;
  }
  .b01_in2_tx2 {
    font-size: 18px;
    font-weight: 300;
    line-height: 1.7;
  }
}
.b04 {
  background: #f5f5f5;
}
.b02 {
  background: white;
  padding: 80px 0 88px;
  .flex-justify {
    justify-content: center;
  }
  .b01_in2_tx1 {
    margin-bottom: 80px;
    @media screen and (max-width: 1400px) {
      margin-bottom: 40px;
    }
    @media screen and (max-width: 600px) {
      margin-bottom: 20px;
    }
  }
}

.b04_in1 {
  position: relative;
  height: 120px;
  width: 100%;
}

.b12 {
  @media screen and (max-width: 1400px) {
    min-height: 250px;
    background-size: cover;
    margin-top: 0px;
    padding-top: 80px;
    margin-bottom: -5px;
    padding-bottom: 60px;
  }
}
.VueCarousel-navigation {
  button {
    @media screen and (max-width: 600px) {
      display: none;
    }
  }
}
.b02 {
  .VueCarousel {
    @media screen and (max-width: 1400px) {
      max-width: 1000px;
    }
    @media screen and (max-width: 600px) {
      overflow-x: hidden;
    }
  }
  &.blog {
    .VueCarousel {
      @media screen and (max-width: 1400px) {
        max-width: 1100px;
      }
      .VueCarousel-wrapper {
        display: flex;
        justify-content: center;
      }
    }
  }
}
.employee {
  padding: 0 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  &-img-container {
    min-height: 240px;
    max-height: 260px;
    min-width: 240px;
    max-width: 260px;
    background-size: cover;
    background-position: center;
    @media screen and (max-width: 1400px) {
      min-height: 220px;
      max-height: 240px;
      min-width: 220px;
      max-width: 240px;
    }
    @media screen and (max-width: 600px) {
      min-height: 180px;
      max-height: 200px;
      min-width: 180px;
      max-width: 200px;
    }
  }
  &-name {
    text-align: center;
    font-weight: 700;
    font-size: 20px;
  }
  &-position {
    text-align: center;
    font-size: 18px;
  }
}

.b05_02 {
  margin-bottom: 0;
  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
.b05_02_header {
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
  h2 {
    font-size: 48px;
    @media screen and (max-width: 1400px) {
      font-size: 48px;
    }
    @media screen and (max-width: 600px) {
      font-size: 28px;
    }
  }
}

.b10 {
  padding: 120px 0 90px;
  @media screen and (max-width: 1400px) {
    padding: 100px 0 40px;
  }
  @media screen and (max-width: 600px) {
    padding: 60px 0 30px;
  }
  .container {
    @media screen and (max-width: 1400px) {
      padding: 0 30px;
    }
    @media screen and (max-width: 600px) {
      padding: 0 30px;
    }
  }
  .b01_in2_tx1 {
    font-size: 32px;
    font-weight: 700;
    @media screen and (max-width: 1400px) {
      font-size: 24px;
    }
    @media screen and (max-width: 600px) {
      font-size: 22px;
    }
  }
  .b01_in2_tx2 {
    font-size: 18px;
    font-weight: 300;
    line-height: 1.5;
    @media screen and (max-width: 1400px) {
      margin-top: 10px;
    }
  }
  .b05_in2 {
    padding-left: 40px;
    margin-bottom: 30px;
    @media screen and (max-width: 600px) {
      padding-left: 20px;
      margin-bottom: 30px;
    }
    .b05_in2_tx1 {
      font-size: 18px;
      font-weight: 300;
      line-height: 1.7 !important;
      margin-bottom: 10px;
      margin-top: 5px;
      @media screen and (max-width: 1400px) {
        font-size: 16px;
      }
    }
    .b05_in2_tx2 {
      line-height: 1.7 !important;
      margin: 0 !important;
      min-height: 0 !important;
      font-style: italic;
      @media screen and (max-width: 1400px) {
        font-size: 14px;
      }
    }
  }
  .principles-list {
    .col6 {
      padding-right: 50px;
      @media screen and (max-width: 600px) {
        padding-right: 0;
      }
    }
  }
}
@media (max-width: 600px) {
  .b05_in2 {
    background: url(/img/circle.svg) no-repeat left 11px;
    margin-bottom: 10px;
    background-size: 8px;
    padding-left: 20px;
  }
}
.b14 {
  @media (max-width: 600px) {
    display: flex;
    width: 100vw;
    .btn1 {
      max-width: 100%;
      min-height: 50px !important;
    }
  }
}
</style>