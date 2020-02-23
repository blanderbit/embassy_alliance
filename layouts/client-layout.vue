<template>
  <div>
    <div class="b">
    <Navcp/>
    </div>
    <main class="container clientarea">

      <div class="sidebar">
        <h2>{{$t('clientarea.title')}}</h2>
        <SideLinks/>
      </div>
      <div class="cp-content">
         <nuxt/>
      </div>
    </main>
    <Footer/>
  </div>
</template>

<script>
//import Navcp from '~/layouts/partials/navcp';
import Navcp from '~/layouts/partials/NavMain';
import SideLinks from '~/layouts/partials/sidelinks';
import Footer from '~/layouts/partials/footer';
export default {
  components: {
      Navcp, SideLinks, Footer
    },
  created(){
    console.log('client-layout.vue')
  },
}
</script>

<style lang="scss" scoped>
.flex{
  @media (max-width: 750px){
    margin:0;
  }
}
#topNav{
  margin-bottom: 30px;
  position: relative;
  .container{
    padding: 0 40px 0 30px;
    @media screen and (max-width: 1400px){
      width: 95%;
      max-width: 95%;
      padding: 0 30px;
    }
  }
}
</style>
