<template>
  <div class="content-wrapper">
    <!-- top head with navigation -->
    <section class="b">
      <NavMain />
    </section>
    <!-- / top head with navigation -->

    <div class="main container">
      <div class="left">
        <div v-if="loader" class="inner loading">
          <client-only>
            <vk-spinner ratio="4.5"></vk-spinner>
          </client-only>
        </div>
        <div v-else class="mb100">
          <div class="camp-header">
            <h1>{{product.i18n_name[$i18n.locale]}}</h1>
            <div class="camp-header-rating">
              <span
                v-if="product.i18n_capture"
                class="capture"
              >{{product.i18n_capture[$i18n.locale]}}</span>
              <client-only>
                <ea-star-rating :rating="(product.rating*1)"></ea-star-rating>
              </client-only>
            </div>
            <div class="camp-header-info">
              <vk-icon icon="location" v-if="product.country"></vk-icon>
              <span class="icon-info" v-if="product.country">{{product.country.name}}</span>
              <vk-icon icon="calendar"></vk-icon>
              <span
                class="icon-info"
              >{{localDateFormat(product.starts_at)}} - {{localDateFormat(product.ends_at)}}</span>
              <vk-icon icon="users"></vk-icon>
              <span class="icon-info">{{product.age_from}}-{{product.age_to}} {{$t('form.years')}}</span>
            </div>
          </div>
          <div class="camp-gallery">
            <div
              class="main-picture"
              v-lazy:background-image="product.image"
              v-if="product.image.length>0"
            ></div>
            <div
              class="main-picture"
              v-lazy:background-image="product.media[mediaIndex].full_url"
              v-else-if="product.media.length>0"
            ></div>
            <div class="other-pictures">
              <carousel
                :autoplay="false"
                :navigationEnabled="true"
                :perPageCustom="[[360, 2], [1024, 4]]"
                :paginationEnabled="true"
                :loop="true"
                :navigationNextLabel="null"
                :navigationPrevLabel="null"
              >
                <div v-for="(m,index) in product.media" :key="index">
                  <a href="javascript:void(0)" @click="mediaIndex=index" v-if="index!=mediaIndex">
                    <div class="item-picture" :v-lazy:background-image="m.full_url"></div>
                  </a>
                </div>
              </carousel>
            </div>
          </div>

          <section class="paragraph">
            <p v-if="product.data.description" v-html="product.data.description[$i18n.locale]"></p>
          </section>

          <!-- navigation links -->
          <section class="paragraph">
            <div class="links">
              <ul>
                <li v-for="(l, indx) in productNavigation" :key="indx">
                  <a :href="'#'+l.anchor">{{l.menu}}</a>
                </li>
              </ul>
            </div>
          </section>
          <!-- / navigation links -->

          <!---------------- MAIN SECTIONS LOOP -------------------->
          <section
            v-for="(s, ind) in product.sections"
            :class="{
                    'paragraph': true, 
                    'prizes':(s.context=='prizes' || s.context=='excursions-previews'), 
                    'bold-list': s.context=='goals', 
                    'pictures':s.type=='carousel',
                    'no-btn':s.type=='carousel',
                    }"
            :key="ind"
            :id="s.anchor"
          >
            <PrizesMC :header="s.title" v-if="s.context=='prizes' && s.type=='other'" />
            <ExcursionsPreviewsList
              :addonsShorted="addonsShorted"
              v-if="s.context=='excursions-previews' && s.type=='other'"
            />
            <h2 v-if="s.type=='html' && s.title && s.title.length>0">{{s.title}}</h2>
            <div v-if="s.type=='html' && s.body && s.body.length>0" class="text" v-html="s.body"></div>

            <div class="thumb-wrap" v-if="s.type=='video' && s.body && s.body.length>0">
              <iframe
                width="100%"
                :src="s.body"
                frameborder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>
            <div class="img-wrap" v-if="s.type=='image' && s.body && s.body.length>0">
              <img v-lazy="s.body" style="width:100%" />
            </div>
            <!-- carousel 1 -->
            <div
              class="no-pad-rt carouselLanding"
              v-if="s.type=='carousel' && commonMedia(s.context).length>0"
            >
              <client-only>
                <owl-carousel
                  :autoplay="false"
                  :nav="true"
                  :items="1"
                  :dots="true"
                  :navText="['', '']"
                >
                  <!--<div v-for="(p, ind) in pictures.first" :key="ind">-->
                  <div v-for="(p, ind) in commonMedia(s.context)" :key="ind">
                    <div class="facility-c" v-lazy:background-image="p.full_url"></div>
                  </div>
                </owl-carousel>
              </client-only>
            </div>
          </section>
          <!---------------- / MAIN SECTIONS LOOP -------------------->

          <!-- addons description 
                <section class="paragraph prizes">
              
                </section>
          /addons description-->
        </div>
      </div>
      <!-- /LEFT -->

      <!-- ORDER SELECTOR RIGHT -->
      <div class="right" ref="right">
        <div v-if="loader" class="inner loading">
          <client-only>
            <vk-spinner ratio="4.5"></vk-spinner>
          </client-only>
        </div>
        <div v-else :style="orderSelectionClass" ref="orderSelection" id="orderSelection">
          <div v-if="product.active>0" class="order-select">
            <div class="order-select-options">
              <h2>{{$t('commonCamps.right.header')}}</h2>
              <div class="order-select-options__flex">
                <div class="options">
                  <h3>{{$t('commonCamps.right.accomodation_header')}}</h3>
                  <ul>
                    <li v-for="(varnt, index) in product.variations" :key="index">
                      <label>
                        <input class="uk-radio" type="radio" :value="varnt" v-model="variation" />
                        <span class="var-name">{{varnt.i18n_name?varnt.i18n_name[$i18n.locale]:''}}</span>
                        <span class="var-price">${{(varnt.price*1)}}</span>
                      </label>
                    </li>
                  </ul>
                </div>
                <div class="addons" v-show="addons.length>0">
                  <h3>{{$t('commonCamps.right.options_header')}}</h3>
                  <ul>
                    <li v-for="(addon, index) in addons" :key="index">
                      <label>
                        <input
                          class="uk-checkbox"
                          type="checkbox"
                          :value="addon"
                          @change="onSelectAddon()"
                          v-model="selectedAddons"
                        />
                        <span class="var-name">{{addon.i18n_name?addon.i18n_name[$i18n.locale]:''}}</span>
                        <span class="var-price">${{addon.price*1}}</span>
                      </label>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="order-select">
            <h3>{{$t('commonCamps.right.header_inactive')}} {{localDateFormat(product.ends_at)}}</h3>
            <div class="order-select-options__flex complete">
              <div class="f-j">
                <div class="left-complete">
                  <vk-icon icon="users"></vk-icon>
                  <span class="b">{{$t('participants_sum')}}:</span>
                  <span class="d">{{product.orders_manual || product.participants}}</span>
                </div>

                <div class="f-j">
                  <div class="extra-info">
                    <vk-icon icon="calendar"></vk-icon>
                    <span class="b">{{$t('dates_complete')}}:</span>
                    <span
                      class="d"
                    >{{localDateFormat(product.starts_at)}} - {{localDateFormat(product.ends_at)}}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-if="product.active==0" class="reviews1">
            <h3>{{$t('pastCamps.our_videos_title')}} {{product.i18n_name[$i18n.locale]}}</h3>
            <div class="video-review" v-if="getVideoByIndex">
              <iframe
                style="width: 100%;"
                :src="getVideoByIndex"
                frameborder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>
            <div class="video-list" v-if="getVideoByIndex">
              <ul v-for="(v,index) in product.videos" :key="index">
                <li>
                  <a href="javascript:void(0)" @click="selectVideo(index)">{{v.title}}</a>
                </li>
              </ul>
            </div>
            <div v-else>{{$t('pastCamps.we_currently_collecting_videos')}}</div>
          </div>

          <div v-if="product.active==0 && reviews.images.length>0" class="reviews2">
            <h3>{{$t('pastCamps.our_reviews')}} {{product.i18n_name[$i18n.locale]}}</h3>
            <a
              href="javascript:void(0)"
              class="btn1"
              @click="toggleReviews()"
            >{{$t('about.b12.button')}}</a>
          </div>

          <div class="total-opt" v-show="computedTotal>0 && product.active!=0">
            <span class="total-opt-price">${{computedTotal}}</span>
            <button class="btn1" @click="onPurchaseFormSubmit()">{{$t('commonCamps.right.button')}}</button>
          </div>
        </div>
      </div>
    </div>
    <!-- / ORDER SELECTOR RIGHT -->

    <Footer />

    <div class="sticky-button" v-if="showBottomButtons">
      <a
        href="javascript:void(0)"
        class="btn1"
        @click="openOrderForm($event)"
      >{{$t('commonButtons.select_options')}}</a>
    </div>

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
                <img class="review" v-lazy="item.src" />
              </div>
            </div>
          </div>
        </owl-carousel>
      </vk-modal>
      <!------ / REVIEWS ------->
    </client-only>

    <client-only>
      <vk-modal-full center :show.sync="modal.makeOrder">
        <vk-grid
          collapse
          class="uk-grid-collapse uk-child-width-expand@s uk-flex-middle order-modal-body"
        >
          <!--spacer-->
          <div>
            <div class="uk-width-auto@m"></div>
          </div>
          <!--/spacer-->

          <div class="uk-width-2-3@m uk-padding-large mobile-order">
            <vk-modal-full-close large @click="closeOrderForm()"></vk-modal-full-close>
            <div class="modal-logo">
              <img src="/img/logo.png" alt />
            </div>
            <div>
              <div>
                <OrderStepper :stepper="1" />
              </div>
              <!--<h1>Headline</h1>-->
              <OrderForm
                :countries="countries"
                :order="order"
                :product="product"
                :addons="addons"
                :variationModel="variation"
                :addonsModel="selectedAddons"
                :total="computedTotal*1"
                @on-form-submit="onPurchaseFormSubmit"
                @variation-emit="variationSelectedSet"
                @addons-emit="addonsSelectedSet"
              />
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
  </div>
</template>

<script>
import NavMain from "~/layouts/partials/NavMain";
import Footer from "~/layouts/partials/footer";
import OrderForm from "~/components/OrderForm";
import OrderStepper from "~/components/OrderStepper";
import CampList from "~/components/CampList";
import PrizesMC from "~/components/PrizesMC";
import ExcursionsPreviewsList from "~/components/ExcursionsPreviewsList";
import referralMixin from "~/mixins/referralMixin.js";
import generalMixin from "~/mixins/generalMixin.js";

var Window = null,
  Document = null,
  fixedBlock = null;
if (process.client) {
  Window = window;
  Document = document;
}

export default {
  mixins: [referralMixin, generalMixin],
  layout: "default",
  auth: false,
  head() {
    return {
      title: this.seoTitle,
      meta: [
        { name: "description", content: this.seoDescription }
        //{ name: 'keywords', content: 'index.keywords'},
      ]
    };
  },
  data() {
    return {
      order: {},
      variation: {},
      selectedAddons: [],
      modal: {
        reviews: false,
        makeOrder: false
      },
      loader: true,
      //showBottomButtons: true,
      product: {},
      mediaIndex: 0,
      addons: [],
      reviews: {
        tmpImages: [],
        images: [],
        index: null
      },
      orderSelectionClass: {},
      videoIndex: 0,
      reviewIndex: 0
    };
  },
  methods: {
    addonsSelectedSet(val) {
      this.selectedAddons = val;
      ////console.log(this.selectedAddons)
    },
    variationSelectedSet(val) {
      this.variation = val;
      ////console.log(this.variation)
    },
    onPurchaseFormSubmit() {
      let orderToProcess = {
        productID: this.product.id,
        variationID: this.variation.id,
        addons: this.selectedAddons
      };
      localStorage.setItem("orderToProcess", JSON.stringify(orderToProcess));
      localStorage.setItem("orderToProcessExpire", Date.now() + 60 * 60 * 1000);
      ////console.log('submited');
      let domain =
        location.protocol +
        "//" +
        location.hostname +
        (location.port ? ":" + location.port : "");
      window.location.replace(domain + "/" + this.$i18n.locale + "/clientarea");
    },
    onSelectAddon() {
      ////console.log(this.selectedAddons)
    },
    toggleReviews() {
      this.modal.reviews = !this.modal.reviews;
      this.$store.commit("setStickyNav", false);
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
    async getProduct() {
      var res = this.$route.path.split("/");
      var slug = res[res.length - 1]; //this.$nuxt.$route.name ||
      await this.$axios
        .get("/products/slug/" + slug + "/" + this.$i18n.locale)
        .then(response => {
          //console.log(slug + ":" + response.data.data)
          //this.products.push(...response.data.data);
          if (response.data.data.variations) {
            this.product = response.data.data;
            this.addons = this.product.addons;
            this.setInitialVariation();
            for (let i = 0, l = this.product.reviews.length; i < l; i++) {
              console.log(this.product.reviews[i].img_url);
              try {
                if (this.product.reviews[i].img_url)
                  this.reviews.images.push(this.product.reviews[i].img_url);
              } catch (e) {}
            }
          }
        })
        .catch(err => {})
        .finally(() => {
          //this.initCountDown(this.product.starts_at);
          ////console.log("starts at: " + this.product.starts_at)
          this.loader = false;
        });
    },
    setInitialVariation() {
      this.variation = this.product.variations[0];
    },
    setSticky() {
      let w = this.$refs.right.clientWidth;
      this.orderSelectionClass = {
        position: "fixed",
        top: "10px",
        width: w + "px"
      };
    },
    unsetSticky() {
      this.orderSelectionClass = {
        position: "relative"
      };
    },
    handleScroll(event) {
      if (!process.client) return null;
      let fh = this.$store.state.footerHeight;
      let ftp = document.getElementById("footer").offsetTop;
      let wth = Window.innerHeight;
      if (
        this.$store.state.deviceWidth > 800 &&
        typeof this.$refs.orderSelection != "undefined"
      ) {
        let top = this.$refs.orderSelection.getBoundingClientRect().top;
        let bottom = this.$refs.orderSelection.getBoundingClientRect().bottom;
        let height = this.$refs.orderSelection.clientHeight;
        let stbtm = Window.pageYOffset + height + 30;
        if (Window.pageYOffset >= top) {
          //console.log('sticky set')
          /*console.log(
                  'yOffSet: ' + Window.pageYOffset, 
                  'top: ' + top,
                  'bottom: ' + bottom, 
                  'Block height: '+ height, 
                  'Window height: '+ wth ,
                  'Footer height: '+ fh,
                  'Footer pos: '+  ftp)*/
          if (stbtm < ftp) {
            this.$refs.orderSelection.style.position = "fixed";
            this.$refs.orderSelection.style.bottom = "unset";
            this.$refs.orderSelection.style.top = "10px";
            this.setSticky();
          } else {
            //console.log('absolute')
            //let ee = document.getElementById("orderSelection");
            //this.$refs.orderSelection.removeAttribute("style");
            this.$refs.orderSelection.style.position = "absolute";
            this.$refs.orderSelection.style.bottom = "28px";
            this.$refs.orderSelection.style.top = "unset";
          }
        } else {
          //console.log('sticky unset')
          //console.log(Window.pageYOffset, top, bottom )
          this.unsetSticky();
        }
      }
    },
    selectVideo(i) {
      this.videoIndex = i;
    },
    commonMedia(slug) {
      let e = [];
      this.product.common_media_sets.filter(function(v, i, self) {
        if (v.slug == slug) {
          e = [...v.media];
          return;
        }
      });
      return e;
    }
  },
  mounted() {
    this.getProduct();
    //this.getAddons();
  },
  updated() {},
  computed: {
    showBottomButtons() {
      if (this.$store.state.deviceWidth <= 800) {
        return this.$store.state.showBottomButtons;
      } else {
        return true;
      }
    },
    getVideoByIndex() {
      if (
        typeof this.product.videos == "undefined" ||
        this.product.videos.lenght == 0
      ) {
        return null;
      } else {
        if (typeof this.product.videos[this.videoIndex] != "undefined")
          return this.product.videos[this.videoIndex].url;
      }
    },
    seoTitle() {
      return typeof this.product.data != "undefined"
        ? this.product.data.seo_title[this.$i18n.locale]
        : this.product.name;
    },
    seoDescription() {
      return typeof this.product.data != "undefined" &&
        typeof this.product.data.seo_description != "undefined"
        ? this.product.data.seo_description[this.$i18n.locale]
        : "";
    },
    productNavigation() {
      let e = this.product.sections.filter(v => {
        return v.menu && v.anchor;
      });
      return e;
    },
    /*
    commonMediaFirst() {
      let e = [];
      this.product.common_media_sets.filter(function(v, i, self) {
        //return self.indexOf(v) === i; //mediaIndex
        if (v.slug == "first") {
          e = [...v.media];
          return;
        }
      });
      ////console.log('filtered arr');
      ////console.log(e);
      return e;
    },
    */
    addonsShorted() {
      let e = this.addons.filter(function(v, i, self) {
        return i < 2;
      });
      //console.log(e);
      return e;
    },
    computedTotal() {
      let t = 0;
      for (let i = 0, lt = this.selectedAddons.length; i < lt; i++) {
        t += this.selectedAddons[i].price * 1;
      }
      return t + this.variation.price * 1;
    }
  },
  components: {
    NavMain,
    OrderForm,
    OrderStepper,
    PrizesMC,
    Footer,
    CampList,
    ExcursionsPreviewsList
  },
  created() {
    if (Window) {
      Window.addEventListener("scroll", this.handleScroll);
    }
  },
  destroyed() {
    Window.removeEventListener("scroll", this.handleScroll);
  }
};
</script>

<style lang="scss" scoped>
$max-container: 675px * 2;

.b {
  @media screen and (max-width: 800px) {
    margin-bottom: 40px;
  }
}
.b01_in1 {
  position: relative;
  @media screen and (max-width: 800px) {
    position: relative;
    &.sticky {
      position: fixed;
    }
  }
}
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 50vh;
  @media screen and (max-width: 800px) {
    display: block;
  }
}
.main {
  display: flex;
  min-height: 90vh;
  //padding-top: 90px;
  .left {
    flex: 0 0 60%;
    max-width: 60%;
    @media screen and (max-width: 800px) {
      max-width: 100%;
    }
  }
  .right {
    flex: 0 0 40%;
    position: relative;
    .loading {
      background: #f5f5f5;
    }
    @media screen and (max-width: 800px) {
      display: none;
    }
  }
}
.camp-header {
  display: flex;
  flex-direction: column;
  h1 {
    font-size: 32px;
    font-weight: 700;
    margin-bottom: 16px;
    @media screen and (max-width: 1400px) {
      font-size: 28px;
    }
    @media screen and (max-width: 800px) {
      font-size: 24px;
    }
  }
}
.links {
  ul {
    flex-wrap: wrap;
    @media screen and (max-width: 800px) {
      padding-left: 0 !important;
    }
  }
  li {
    a {
      white-space: nowrap;
    }
  }
}
.camp-gallery,
.paragraph {
  padding-right: 40px;
  margin-bottom: 40px;
  @media screen and (max-width: 800px) {
    padding-right: 0;
  }
}
.main-picture {
  min-height: 560px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  @media screen and (max-width: 1400px) {
    min-height: 460px;
  }
  @media screen and (max-width: 800px) {
    min-height: 360px;
  }
}
.item-picture {
  min-height: 56px;
  min-width: 80px;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  margin-right: 10px;
}
.other-pictures {
  margin: 10px 0;
}
.camp-header-rating {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 28px;
  @media screen and (max-width: 800px) {
    align-items: flex-start;
    margin-bottom: 10px;
    flex-direction: column;
    & > span {
      margin-bottom: 10px;
    }
    .vue-star-rating {
      display: flex;
      align-items: center;
      align-self: flex-end;
    }
  }
  & > span {
    display: inline-block;
    margin-right: 20px;
  }
}
.vue-star-rating {
  display: flex;
  align-items: center;
  margin-top: -6px;
}
.camp-header-info {
  margin-bottom: 36px;
  display: flex;
  align-items: center;
  @media screen and (max-width: 800px) {
    display: grid;
    grid-template-columns: 20px 1fr;
    grid-gap: 4px;
    margin-bottom: 20px;
  }
  .icon-info {
    display: inline-block;
    margin: 0 24px 0 8px;
  }
}
.b06_in2 {
  margin-top: 30px;
}

.paragraph.bold-list {
  margin-bottom: 20px;
  margin-top: 60px;
  @media screen and (max-width: 800px) {
    margin-top: 20px;
  }
}

.facility-c {
  height: 560px;
  @media screen and (max-width: 1400px) {
    height: 460px;
  }
  @media screen and (max-width: 800px) {
    height: 260px;
  }
}
.paragraph {
  .links {
    ul {
      list-style: none;
      display: flex;
      padding-left: 0;
      @media screen and (max-width: 800px) {
        padding-left: 20px;
      }
      li {
        list-style-type: none;
        display: inline-block;
        &:not(:last-child) {
          margin-right: 12px;
          &::after {
            content: "|";
            margin-left: 10px;
          }
        }
        a {
          font-size: 16px;
        }
      }
    }
  }
}
#orderSelection {
  h2 {
    font-weight: 700;
    font-size: 28px;
    letter-spacing: 1.5px;
    @media screen and (max-width: 1400px) {
      font-size: 24px;
      margin-bottom: 0;
    }
  }
  .order-select {
    background: #f5f5f5;
    padding: 40px 50px;
    @media screen and (max-width: 1500px) {
      padding: 26px;
    }
    @media screen and (max-width: 1400px) {
      padding: 26px;
    }
    &-options {
      &__flex {
        display: flex;
      }
    }
  }
  .order-select-options {
    &__flex {
      padding-top: 2px;
      flex-direction: column;
      h3 {
        font-size: 18px;
        font-weight: 700;
      }
      .options,
      .addons {
        display: flex;
        flex-direction: column;
        ul {
          padding-left: 0;
          margin-top: 6px;
          margin-bottom: 6px;
          label {
            display: flex;
            align-items: center;
            @media screen and (max-width: 1400px) {
              align-items: flex-start;
            }
          }
          li {
            margin-bottom: 12px;
            &:not(:last-child) {
              border-bottom: #efefef 1px dashed;
            }
          }
          .var-name {
            font-size: 18px;
            display: inline-block;
            margin: 0 10px 0 10px;
            //max-width: 220px;
            width: 220px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            padding: 0 4px 0;
            line-height: 1;
            //margin-bottom: -3px;
            padding-left: 8px;
            flex: 1;
            @media screen and (max-width: 1500px) {
              //max-width: 120px;
              width: auto;
              white-space: unset;
              margin: -6px 6px -1px 8px;
              font-size: 16px;
            }
            @media screen and (max-width: 1400px) {
              //max-width: 120px;
              width: auto;
              white-space: unset;
              margin: -6px 6px -1px 8px;
              font-size: 16px;
            }
          }
          .var-price {
            font-size: 18px;
            display: inline-block;
            color: #8c8c8c;
            padding-bottom: 3px;
            @media screen and (max-width: 1500px) {
              margin: -5px 0 -1px 0;
            }
            @media screen and (max-width: 1400px) {
              margin: -5px 0 -1px 0;
            }
          }
        }
      }
    }
  }
  .total-opt {
    display: grid;
    grid-template-columns: 30% 70%;
    padding-top: 30px;
    justify-items: center;
    align-items: center;
    &-price {
      font-weight: 700;
      font-size: 42px;
    }
  }
}
.sticky-button {
  position: fixed;
  width: 100%;
  bottom: 0;
  z-index: 999;
  @media screen and (min-width: 800px) {
    display: none;
  }
  .btn1 {
    width: 100% !important;
    min-width: 100% !important;
    border-radius: 0;
    min-height: 50px !important;
  }
}
.inner.loading {
  @media screen and (max-width: 800px) {
    width: 100%;
    display: flex;
    margin-top: 20vw;
    justify-content: center;
    align-items: center;
  }
}
.mobile-order {
  background: #fff;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 2px 4px 0px !important;
  align-self: start;
  min-height: 100vh;
  position: absolute;
  width: 100vw;
  overflow-x: hidden;
}
.stepper {
  min-height: 80px;
  @media screen and (max-width: 800px) {
    margin-left: -30px;
    margin-right: -30px;
  }
}
.complete {
  padding-top: 0 !important;
}
.left-complete {
  flex: 0 0 70%;
  @media screen and (max-width: 1200px) {
    flex: 0 0 100%;
  }
  .f-j {
    margin-bottom: 10px;
  }
  .uk-icon {
    margin-right: 10px;
  }
  .b {
    flex: 1;
  }
  .extra-info {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
}
.reviews2 {
  background-color: #f5f5f5;
  background-image: url("/img/review_cloud_bg.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  min-height: 200px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid #f5f5f5;
  //box-shadow: 1px 1px 10px rgba(255,255,255, .15)
  h3 {
    font-weight: 700;
    font-size: 16px;
  }
}
.reviews1 {
  display: grid;
  grid-template-columns: 320px 1fr;
  grid-template-rows: 40px 220px;
  grid-column-gap: 20px;
  //height: 260px;
  background: #f5f5f5;
  margin-top: 20px;
  padding: 20px;
  h3 {
    grid-column: 1 / -1;
    font-size: 14px;
    font-weight: 700;
  }
  .video-review {
    width: 100%;
    background: palevioletred;
  }
  .video-list {
    overflow-y: scroll;
    li:not(:last-of-type) {
      margin-bottom: 10px;
      font-size: 16px;
    }
  }
}
</style>