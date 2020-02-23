<template>
  <div>
    <client-only v-if="comply">
      <!-- important to add client-only-->
      <carousel
        :autoplay="true"
        :navigationEnabled="true"
        :perPageCustom="[[0, 1], [800, 2], [1024, 3]]"
        :paginationEnabled="true"
        :autoplayTimeout="4000"
        :loop="true"
        :navigationNextLabel="null"
        :navigationPrevLabel="null"
      >
        <slide class="item" v-for="(product, index) in products" :key="index">
          <past-camp-slide :localDateFormat="localDateFormat" :product="product"></past-camp-slide>
        </slide>
      </carousel>
    </client-only>

    <div v-else-if="products.length >=2" :class="{'sh-l-camps' : true}">
      <div class="item" v-for="(product, index) in products" :key="index">
        <past-camp-no-slide :localDateFormat="localDateFormat" :product="product"></past-camp-no-slide>
      </div>
    </div>

    <div v-else :class="{'one-camp' : true}">
      <div class="item" v-for="(product, index) in products" :key="index">
        <div class="item-card">
          <div class="wrapper">
            <div class="picture" :style="{'background-image': 'url(' + product.image + ')'}"></div>

            <div class="camp-info">
              <h3>{{product.name}}</h3>
              <div class="f-j">
                <p>{{product.capture}}</p>
                <star-rating
                  :rounded-corners="true"
                  :star-points="[23,2, 14,17, 0,19, 10,34, 7,50, 23,43, 38,50, 36,34, 46,19, 31,17]"
                  :read-only="true"
                  :show-rating="false"
                  :rating="(product.rating*1)"
                  :star-size="18"
                  active-color="#ff5722"
                  inactive-color="#999"
                  :round-start-rating="true"
                ></star-rating>
              </div>
              <div class="divider"></div>

              <div class="f-j">
                <div class="extra-info">
                  <vk-icon icon="location"></vk-icon>
                  <span class="b">{{product.location.country.name}}</span>
                  <span class="d">{{product.age_from}}-{{product.age_to}} {{$t('form.years')}}</span>
                </div>
              </div>

              <div class="f-j">
                <div class="extra-info">
                  <vk-icon icon="calendar"></vk-icon>
                  <span class="b">{{$t('dates')}}:</span>
                  <span
                    class="d"
                  >{{localDateFormat(product.starts_at)}} - {{localDateFormat(product.ends_at)}}</span>
                </div>
              </div>

              <div class="f-j">
                <div class="extra-info">
                  <vk-icon icon="users"></vk-icon>
                  <span class="b">{{$t('participants_sum')}}:</span>
                  <span class="d">{{product.participants}}</span>
                </div>
              </div>
            </div>

            <div class="camp-description">
              <v-clamp autoresize :max-lines="8" class="long-f">{{product.seo_description}}</v-clamp>

              <div class="r_m">
                <a
                  :href="($i18n.defaultLocale != $i18n.locale)?
                    '/' + $i18n.locale + '/'+ (product.location.country.name).toLowerCase() +'/' + product.slug
                    :'/'+ (product.location.country.name).toLowerCase() +'/' + product.slug"
                >{{$t('commonButtons.browse')}}</a>
              </div>
            </div>
          </div>
          <!-- /end of wrapper -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PastCampList",
  props: {
    products: Array,
    localDateFormat: Function
  },
  methods: {
    reffer(url) {
      //alert(url); return
      this.$router.push(url);
    }
  },
  computed: {
    comply() {
      let r =
        (this.$store.state.deviceWidth > this.$store.state.maxMobileWidth &&
          this.products.length >= 3) ||
        (this.$store.state.deviceWidth <= this.$store.state.maxMobileWidth &&
          this.products.length >= 2);
      return r;
    }
  },
  mounted() {
    //alert(this.$store.state.deviceWidth + ' ' + this.$store.state.maxMobileWidth)
  }
};
</script>

<style lang="scss" scoped>
.item-card {
  //cursor: pointer;
  @media screen and (max-width: 420px) {
    // max-width: 380px;
    // margin-right: 33px;
    margin: 0 4px !important;
  }
  @media screen and (max-width: 400px) {
    //max-width: 350px;
    // margin-right: 10px;
  }
}

.sh-l-camps {
  display: flex;
  justify-content: center;
  .item {
    flex: 1;
    max-width: 500px;
  }
}
.one-camp {
  .item {
    display: flex;
    justify-content: center;
  }
  .item-card {
    max-width: 860px;
    cursor: auto;
    height: auto;
    max-height: unset;
    overflow-y: auto;
    min-height: auto;
    @media screen and (max-width: 600px) {
      height: auto;
      max-height: unset;
    }
  }
  .wrapper {
    display: grid;
    grid-template-columns: 400px 1fr;
    grid-column-gap: 30px;
    grid-row-gap: 30px;
    padding: 24px;
    @media screen and (max-width: 600px) {
      grid-template-columns: 1fr;
      grid-column-gap: 0;
      grid-row-gap: 10px;
      padding: 14px;
    }
  }
  .camp-info {
    padding: 0 !important;
  }
  .camp-description {
    padding: 0 !important;
    grid-column: 1 / -1;
    height: auto;
    .long {
      display: block !important;
    }
  }
  .r_m {
    margin: 30px 0;
    @media screen and (max-width: 600px) {
      text-align: center;
    }
  }
}

.b05_02_header h2 {
  letter-spacing: unset;
}
</style>