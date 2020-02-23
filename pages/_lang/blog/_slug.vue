<template>
  <div class="page-blog">
    <!-- top head with navigation -->
    <section class="b">
      <NavMain />
    </section>
    <!-- / top head with navigation -->

    <!-- main header -->
    <section class="b05">
      <div class="container">
        <div class="b01_main_in2">
          <div class="simple-header">
            <ul class="uk-breadcrumb">
              <li>
                <nuxt-link :to="localePath('/')">{{$t('nav.home')}}</nuxt-link>
              </li>
              <li>
                <nuxt-link :to="localePath('blog')">{{$t('nav.blog')}}</nuxt-link>
              </li>
              <li class="uk-disabled">{{article.title}}</li>
            </ul>
          </div>
        </div>
      </div>
      <!-- Skeleton -->
      <div class="container" v-if="loader">
        <div class="article-preview-loader">
          <div class="article-preview-loader-image"></div>
          <div class="article-preview-loader-text">
            <p></p>
            <p></p>
            <p></p>
            <p></p>
          </div>
        </div>
      </div>
      <!-- / -->
    </section>
    <!-- / main header -->

    <section class="single-article">
      <div class="container">
        <div
          class="single-article-main-image"
          :style="{'background-image':'url('+ article.image + ')'}"
        ></div>
        <h1>{{article.title}}</h1>
        <div class="single-article-body" v-html="article.body"></div>
        <div v-for="(a,index) in article.sections" :key="index" class="a-section">
          <h2>{{a.title}}</h2>
          <img v-if="a.img" v-lazy="a.img" />
          <div class="single-article-body" v-html="a.body"></div>
        </div>

        <!-- article rating -->
        <div v-if="!rated" class="single-article-rating">
          <div
            class="single-article-rating__question"
            v-if="!justRated"
          >{{$t('article.was_this_helpful')}}</div>
          <div class="single-article-rating__buttons" v-if="!justRated">
            <a href="javascript:void(0)" class="positive" @click="ratePositive()">
              {{$t('article.yes')}}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 478.2 478.2"
                style="enable-background:new 0 0 478.2 478.2;"
                xml:space="preserve"
              >
                <path
                  d="M457.575,325.1c9.8-12.5,14.5-25.9,13.9-39.7c-0.6-15.2-7.4-27.1-13-34.4c6.5-16.2,9-41.7-12.7-61.5
		c-15.9-14.5-42.9-21-80.3-19.2c-26.3,1.2-48.3,6.1-49.2,6.3h-0.1c-5,0.9-10.3,2-15.7,3.2c-0.4-6.4,0.7-22.3,12.5-58.1
		c14-42.6,13.2-75.2-2.6-97c-16.6-22.9-43.1-24.7-50.9-24.7c-7.5,0-14.4,3.1-19.3,8.8c-11.1,12.9-9.8,36.7-8.4,47.7
		c-13.2,35.4-50.2,122.2-81.5,146.3c-0.6,0.4-1.1,0.9-1.6,1.4c-9.2,9.7-15.4,20.2-19.6,29.4c-5.9-3.2-12.6-5-19.8-5h-61
		c-23,0-41.6,18.7-41.6,41.6v162.5c0,23,18.7,41.6,41.6,41.6h61c8.9,0,17.2-2.8,24-7.6l23.5,2.8c3.6,0.5,67.6,8.6,133.3,7.3
		c11.9,0.9,23.1,1.4,33.5,1.4c17.9,0,33.5-1.4,46.5-4.2c30.6-6.5,51.5-19.5,62.1-38.6c8.1-14.6,8.1-29.1,6.8-38.3
		c19.9-18,23.4-37.9,22.7-51.9C461.275,337.1,459.475,330.2,457.575,325.1z M48.275,447.3c-8.1,0-14.6-6.6-14.6-14.6V270.1
		c0-8.1,6.6-14.6,14.6-14.6h61c8.1,0,14.6,6.6,14.6,14.6v162.5c0,8.1-6.6,14.6-14.6,14.6h-61V447.3z M431.975,313.4
		c-4.2,4.4-5,11.1-1.8,16.3c0,0.1,4.1,7.1,4.6,16.7c0.7,13.1-5.6,24.7-18.8,34.6c-4.7,3.6-6.6,9.8-4.6,15.4c0,0.1,4.3,13.3-2.7,25.8
		c-6.7,12-21.6,20.6-44.2,25.4c-18.1,3.9-42.7,4.6-72.9,2.2c-0.4,0-0.9,0-1.4,0c-64.3,1.4-129.3-7-130-7.1h-0.1l-10.1-1.2
		c0.6-2.8,0.9-5.8,0.9-8.8V270.1c0-4.3-0.7-8.5-1.9-12.4c1.8-6.7,6.8-21.6,18.6-34.3c44.9-35.6,88.8-155.7,90.7-160.9
		c0.8-2.1,1-4.4,0.6-6.7c-1.7-11.2-1.1-24.9,1.3-29c5.3,0.1,19.6,1.6,28.2,13.5c10.2,14.1,9.8,39.3-1.2,72.7
		c-16.8,50.9-18.2,77.7-4.9,89.5c6.6,5.9,15.4,6.2,21.8,3.9c6.1-1.4,11.9-2.6,17.4-3.5c0.4-0.1,0.9-0.2,1.3-0.3
		c30.7-6.7,85.7-10.8,104.8,6.6c16.2,14.8,4.7,34.4,3.4,36.5c-3.7,5.6-2.6,12.9,2.4,17.4c0.1,0.1,10.6,10,11.1,23.3
		C444.875,295.3,440.675,304.4,431.975,313.4z"
                />
              </svg>
            </a>
            <a href="javascript:void(0)" class="negative" @click="rateNegative()">
              {{$t('article.no')}}
              <svg
                version="1.1"
                id="Capa_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 486.805 486.805"
                style="enable-background:new 0 0 486.805 486.805;"
                xml:space="preserve"
              >
                <path
                  d="M485.9,241.402l-26.8-167c-5.2-41.9-34.5-66-80.4-66H243.6h-6.8h-65.9c-19.2,0-36.9,8.3-49.4,21.6
		c-4.5-5.5-11.4-8.9-19-8.9H24.7c-13.6,0-24.7,11.1-24.7,24.7v228.4c0,13.6,11.1,24.7,24.7,24.7h77.9c9,0,17-4.9,21.3-12.2l2.9,0.7
		c4.4,1.3,80.8,25,80.8,90.7v84.9c0,5.2,3.4,9.9,8.4,11.4c0.9,0.3,12.9,4,28.3,4c13.3,0,29.1-2.7,42.5-12.6
		c18.4-13.5,27.7-36.5,27.7-68.4v-75.8h32.4h56.9h15.8c15.6,0,31-5.8,43.3-16.2C480.9,290.002,489.8,265.402,485.9,241.402z
		 M103.2,274.302c0,0.4-0.3,0.7-0.7,0.7H24.7c-0.4,0-0.7-0.3-0.7-0.7v-228.4c0-0.4,0.3-0.7,0.7-0.7h77.9c0.4,0,0.7,0.3,0.7,0.7
		v228.4H103.2z M447.3,287.202c-7.9,6.8-17.8,10.5-27.7,10.5h-15.8h-56.9h-44.5c-6.6,0-12,5.4-12,12v87.8c0,23.8-6,40.3-17.8,49
		c-13,9.6-30.8,8.6-41.1,7v-75.3c0-35.6-17.3-66.7-49.9-89.9c-23.9-16.9-47.6-23.7-48.6-24c-0.2,0-0.3-0.1-0.5-0.1l-5.2-1.2v-191.5
		c0.2-0.7,0.4-1.4,0.5-2.1c3.3-21,21.8-36.9,43.1-36.9h65.9h6.8h135.1c33.9,0,52.9,15.2,56.6,45.1c0,0.2,0,0.3,0.1,0.4l26.9,167.1
		C464.8,261.002,459,277.102,447.3,287.202z"
                />
              </svg>
            </a>
          </div>
          <div class="single-article-rating__options" v-if="justRated=='negative'">
            <h3>{{$t('article.we_sorry')}}</h3>
            <span>{{$t('article.what_went_wrong')}}</span>
            <label
              :for="'options' + index"
              v-for="(b,index) in $t('article.went_wrong_options')"
              :key="index"
              class="single-article-rating__opt"
            >
              <input
                :id="'options' + index"
                type="radio"
                class="ar_radio"
                name="ar_radio"
                :value="b.score"
                v-model="score"
              />
              <span>{{b.text}}</span>
            </label>
            <a
              href="javascript:void(0)"
              class="btn2 btn2-form-xs"
              @click="sendNegative()"
            >{{$t('form.send')}}</a>
          </div>
          <div class="single-article-rating__options" v-if="justRated=='complete'">
            <h3>{{$t('article.thank_you')}}</h3>
            <span>{{$t('article.what_else')}}</span>
            <div class v-if="!$store.state.auth.loggedIn">
              <input
                class="uk-input"
                name="email"
                :data-vv-as="$t('clientarea.db.'+label)"
                v-model.lazy="sMessage.email"
                v-validate="'required|email'"
                type="text"
                :placeholder="$t('form.email')"
              />
              <span v-if="errors.has(label)" class="input-invalid">{{ errors.first(label) }}</span>
            </div>
            <div class="uk-margin">
              <textarea
                v-model="sMessage.message"
                class="uk-textarea"
                v-validate="'required'"
                rows="5"
                :placeholder="$t('form.message')"
              ></textarea>
            </div>
            <a
              href="javascript:void(0)"
              class="btn2 btn2-form-md submit-btn inactive"
              @click="sendInqury()"
            >{{$t('form.send')}}</a>
          </div>
          <div class="single-article-rating__options" v-if="justRated=='thanks'">
            <h3>{{$t('article.thank_you_no_more.head')}}</h3>
            <span>{{$t('article.thank_you_no_more.body')}}</span>
          </div>
        </div>
        <!-- / -->
      </div>
    </section>

    <Footer />
  </div>
</template>

<script>
import referralMixin from "~/mixins/referralMixin.js";
import generalMixin from "~/mixins/generalMixin.js";
import NavMain from "~/layouts/partials/NavMain";
import Footer from "~/layouts/partials/footer";

export default {
  mixins: [referralMixin, generalMixin],
  layout: "default",
  auth: false,
  async fetch({ app, store, params, req }) {
    if (process.server && req) {
      console.time('2');
      var res = req.url.split("/");
      var slug = res[res.length - 1];
      await app.$axios
        .get("/articles/slug/" + app.i18n.locale + "/" + slug)
        .then(response => {
          store.commit("setArticle", response.data);
        })
        .catch(err => {})
        .finally(() => {
          let seo = {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: store.state.article.title,
            alternativeHeadline: store.state.article.seo_title,
            image: store.state.article.image,
            author: "Embassy Camps",
            //"award": "Best article ever written",
            //"editor": "Craig Mount",
            genre: "summer camps articles",
            //"keywords": "seo sales b2b",
            //"wordcount": "1120",
            publisher: {
              "@type": "Organization",
              name: "Embassy Camps",
              logo: {
                "@type": "ImageObject",
                url: "https://" + req.headers.host + "/img/logo.png"
              }
            },
            url: "https://" + req.headers.host + req.url,
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": "https://" + req.headers.host + req.url
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: store.state.article.rating,
              reviewCount: store.state.article.voted,
              bestRating: "100",
              worstRating: "1"
            },
            datePublished: store.state.article.created_at,
            dateCreated: store.state.article.created_at,
            dateModified: store.state.article.updated_at,
            description: store.state.article.seo_description
            //"articleBody": "You can paste your entire post in here, and yes it can get really really long."
          };
          store.commit("setArticleSEO", seo);
        });
      console.log('2');
      console.timeEnd('2');
    }
  },
  head() {
    return {
      title: this.$store.state.article.seo_title,
      meta: [
        //{ charset: 'utf-8' },
        {
          hid: "description",
          name: "description",
          content: this.$store.state.article.seo_description
        }
        //{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
      __dangerouslyDisableSanitizers: ["script"],
      script: [
        {
          innerHTML: JSON.stringify(this.$store.state.articleSEO),
          type: "application/ld+json"
        }
      ]
    };
  },
  data() {
    return {
      article: {},
      loader: true,
      rated: null,
      rateStored: {},
      justRated: null,
      feedbackMessage: "",
      score: null,
      negativeReviewText: "",
      sMessage: {},
      sToken: null
    };
  },
  methods: {
    getArticle() {
      if (Object.keys(this.$store.state.article).length > 0) {
        this.article = this.$store.state.article;
        this.getRatingLocal();
        this.getRated();
        this.loader = false;
        console.log("Retrieved from store");
        console.log(this.article);
      } else {
        this.fetchArticle();
      }
    },
    async fetchArticle() {
      let res = this.$route.path.split("/");
      let slug = res[res.length - 1]; //this.$nuxt.$route.name ||
      await this.$axios
        .get("/articles/slug/" + this.$i18n.locale + "/" + slug)
        .then(response => {
          this.article = response.data;
          this.getRatingLocal();
        })
        .catch(err => {})
        .finally(() => {
          this.getRated();
          this.loader = false;
        });
    },
    getRated() {
      if (
        typeof this.rateStored != "undefined" &&
        typeof this.rateStored.token != "undefined" &&
        this.rateStored.token != null
      ) {
        this.rated = true;
      }
    },
    getRatingLocal() {
      let rate = JSON.parse(
        localStorage.getItem("articleID" + this.article.id)
      );
      if (typeof rate != "undefined" && rate != null) {
        this.rateStored = rate;
      }
    },
    storeRatingLocal() {
      localStorage.setItem(
        "articleID" + this.article.id,
        JSON.stringify(this.rateStored)
      );
    },
    ratePositive() {
      this.score = 100;
      this.justRated = "complete";
      this.sendRating();
    },
    rateNegative() {
      this.justRated = "negative";
    },
    sendNegative() {
      this.justRated = "complete";
      this.sendRating();
    },
    sendRating() {
      this.$axios
        .post("/articles/" + this.article.id + "/rate", {
          rating: this.score
        })
        .then(response => {
          //console.log(response.data);
          this.rateStored.rateID = response.data.id;
          this.rateStored.token = response.data.token;
          this.rateStored.score = this.score;
          this.rateStored.complete = 50;
          this.storeRatingLocal();
          //this.justRated = 'thanks';
        })
        .catch(err => {});
    },
    sendInqury() {
      this.$axios
        .post("/articles/" + this.article.id + "/comment", {
          id: this.rateStored.rateID,
          token: this.rateStored.token,
          email: this.sMessage.email,
          message: this.sMessage.message
        })
        .then(response => {
          this.rateStored.complete = 100;
          this.storeRatingLocal();
          this.justRated = "thanks";
        })
        .catch(err => {});
    }
  },
  mounted() {
    this.getArticle();
  },
  computed: {
    seoTitle() {
      return typeof this.article.seo_title != "undefined"
        ? this.article.seo_title
        : "";
    },
    seoDescription() {
      return typeof this.article.seo_description != "undefined"
        ? this.article.seo_description
        : "";
    }
  },
  components: {
    NavMain,
    Footer
  }
};
</script>

<style lang="scss" scoped>
$max-container: 675px * 2;
$base-color: #f3f3f3;
$shine-color: #f8f8f8;
$animation-duration: 1.2s;
$green: #97ba78;

.b01_in1 {
  position: relative;
}
.single-article-rating__options {
  display: flex;
  flex-direction: column;
  width: 100%;
  label {
    display: flex;
    margin: 8px;
    span {
      display: inline-block;
      margin-left: 8px;
    }
  }
  & > span {
    display: block;
    margin: 10px 0;
    @media screen and (max-width: 600px) {
      text-align: center;
    }
  }
  .btn2 {
    max-width: 180px !important;
    margin-top: 20px;
    @media screen and (max-width: 600px) {
      margin: 20px auto;
    }
  }
  h3 {
    @media screen and (max-width: 600px) {
      display: block;
      text-align: center;
    }
  }
  .submit-btn {
    align-self: flex-end;
  }
}
.single-article-rating {
  display: flex;
  flex-direction: column;
  margin: 30px auto 20px;
  width: 100%;
  justify-content: center;
  align-items: center;
  &__question {
    font-size: 18px;
    font-weight: 700;
    max-width: 512px;
    @media screen and (max-width: 600px) {
      text-align: center;
    }
  }
  &__buttons {
    display: flex;
    justify-content: space-around;
    padding: 30px 20px;
    min-width: 320px;
    a {
      border: 1px solid #ccc;
      border-radius: 3px;
      display: flex;
      justify-content: center;
      align-items: center;
      min-width: 80px;
      padding: 8px 12px;
      transition: transform 0.3s;
      backface-visibility: hidden;
      font-size: 18px;
      font-weight: 700;
      position: relative;
      &.positive {
        color: $green !important;
        svg {
          fill: $green;
          position: relative;
          top: -3px;
        }
      }
      &.negative {
        color: #888 !important;
        svg {
          fill: #888;
          position: relative;
          top: 3px;
        }
      }
      &:hover {
        transform: scale(1.1);
        text-decoration: none;
      }
      &:active {
        transform: scale(1);
      }
      &.positive:hover {
        border-color: $green;
      }
      svg {
        margin-left: 8px;
        height: 18px;
      }
    }
  }
}
.simple-header {
  margin-top: 0;
}
.b05 {
  padding: 0 0 10px;
}
.single-article {
  margin-bottom: 110px;
  &-main-image {
    height: 512px;
    @media screen and (max-width: 600px) {
      height: 360px;
    }
  }
}
h1 {
  font-size: 28px;
  line-height: 1.2;
}
.uk-disabled {
  pointer-events: none;
  display: flex;
  max-width: 100%;
}
.a-section {
  img {
    display: block;
    //max-width: 100%;
    //max-height: 512px;
    //margin: 2em auto;
    width: 100%;
  }
  h2 {
    font-size: 22px;
  }
}

.article-preview-loader {
  display: flex;
  flex-direction: column;
  height: 100%;
  max-width: 920px !important;
  margin: 0 auto;
  &-image {
    //background: #f3f3f3;
    background-image: linear-gradient(
      90deg,
      $base-color 0px,
      $shine-color 60px,
      $base-color 80px
    );
    background-size: 200%;
    animation: shine-lines $animation-duration infinite linear;
    height: 512px;
  }
  &-text {
    padding: 40px;
    background: #fbfbfb;
    p {
      display: inline-block;
      width: 100%;
      //background: #f3f3f3;
      background-image: linear-gradient(
        90deg,
        $base-color 0px,
        $shine-color 40px,
        $base-color 80px
      );
      background-size: 200%;
      animation: shine-lines $animation-duration infinite linear;
      height: 26px;
      margin-bottom: 20px;
      margin-top: 0;
    }
  }
}
</style>
