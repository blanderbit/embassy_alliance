<template>
  <div class="item-card">
    <div class="wrapper">
      <div class="picture" :style="{'background-image': 'url(' + product.image + ')'}"></div>
      <div class="slider">
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
          <v-clamp autoresize :max-lines="2" class="short">{{product.seo_description}}</v-clamp>
        </div>
        <div class="camp-cta">
          <a :href="url">{{$t('camp_details_link')}} &rarr;</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    product: Object,
    localDateFormat: Function
  },
  computed: {
    url() {
      let ret =
        this.$i18n.defaultLocale != this.$i18n.locale
          ? "/" +
            this.$i18n.locale +
            "/" +
            this.product.location.country.name.toLowerCase() +
            "/" +
            this.product.slug
          : "/" +
            this.product.location.country.name.toLowerCase() +
            "/" +
            this.product.slug;
      return ret;
    }
  }
};
</script>