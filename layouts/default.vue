<template>
  <div>
      <nuxt/>
      <div id="recaptcha" />
  </div>
</template>


<script>
  export default {
  head () {
    return this.$nuxtI18nSeo()
  },
      created(){
          console.log('default.vue')
      },
}
</script>

<style lang="scss">

</style>
