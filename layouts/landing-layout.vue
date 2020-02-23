<template>
  <div>
    <nuxt/>
  </div>
</template>

<script>

export default {
  created(){
      console.log('landing-layout.vue')
  },
  head () {
    return this.$nuxtI18nSeo()
  }
}
</script>
