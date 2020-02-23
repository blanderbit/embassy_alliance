<template>
<div class="b01_in1">

    <div class="top_menu">
    </div>
    <div class="container mainLogin">
      <div class="flex flex-justify flex-v-center flex-column">

        <div class="col0 logo-container">
          <a href="/"><img src="/img/logo.png" alt=""></a>
        </div>
        <div class="loginForm" v-if="$store.state.orderSending">
          <div class="inner loading">
            <client-only>
          <vk-spinner ratio="4.5"></vk-spinner>
          </client-only>
          </div>
        </div>

       <nuxt/>

      </div>

    </div>
  </div>
</template>

<script>
    export default {
        created(){
            console.log('order.vue')
        },
    }
</script>

<style lang="scss" scoped>

.logo-container{
  margin-top:0;
  margin-bottom: 10vh;
}
.b01_in1{
  min-height: 100vh;
  position: relative;
  margin: 0!important;
  legend{
    margin-bottom: 16px;
  }
}
</style>
