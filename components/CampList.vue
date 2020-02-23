<template>
  <div>
    <div v-if="comply">
      <client-only>
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
            <camp-slide :localDateFormat="localDateFormat" :product="product"></camp-slide>
          </slide>
        </carousel>
      </client-only>
    </div>
    <div v-else-if="products.length >=2" :class="{'sh-l-camps' : true}">
      <div class="item" v-for="(product, index) in products" :key="index">
        <camp-no-slide :localDateFormat="localDateFormat" :product="product"></camp-no-slide>
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
                <ea-star-rating :rating="(product.rating*1)"></ea-star-rating>
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
            </div>

            <div class="camp-description">
              <v-clamp autoresize :max-lines="8" class="long-f">{{product.seo_description}}</v-clamp>

              <div class="r_m">
                <a
                  :href="($i18n.defaultLocale != $i18n.locale)?
                    '/' + $i18n.locale + '/'+ (product.location.country.name).toLowerCase() +'/' + product.slug
                    :'/'+ (product.location.country.name).toLowerCase() +'/' + product.slug"
                >{{$t('commonButtons.select')}}</a>
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
  name: "CampList",
  props: {
    products: Array,
    localDateFormat: Function
  },
  methods: {},
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
.b05_02_header h2 {
  letter-spacing: unset;
}
</style>