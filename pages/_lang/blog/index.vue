<template>
<div>

<!-- top head with navigation -->
<section class="b">
  <NavMain/>
</section>
<!-- / top head with navigation -->

<!-- main header -->
<section class="b05">
  <div class="container">
    <div class="b01_main_in2">
      <div class="simple-header">
          <h1 class="b01_in2_tx1">{{$t('blog.b1.header')}}</h1>
          <ul class="uk-breadcrumb">
            <li><nuxt-link :to="localePath('/')">{{$t('nav.home')}}</nuxt-link></li>
            <li class="disabled">{{$t('nav.blog')}}</li>
          </ul>
      </div>
    </div>
  </div>
</section>
<!-- / -->

<section class="articles-holder">
    <div class="container" v-if="loader">
      <div class="articles-list">
        <div class="article-preview-loader" v-for="index in 6" :key="index">
          <div class="article-preview-loader-image"></div>
          <div class="article-preview-loader-text">
            <p></p>
            <p></p>
            <p></p>
            <p></p>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
        <div class="articles-list">
            <div class="article-preview" v-for="(a,index) in articles" :key="index">
              <nuxt-link :to="localePath('blog') + '/' + a.slug">
              <div class="article-preview-image" :style="{'background-image':'url('+ a.image+')'}"></div>
              <div class="article-preview-summary">
                <h2>{{a.title}}</h2>
                <div><v-clamp autoresize :max-lines="6">{{a.seo_description}}</v-clamp></div>
              </div>
              </nuxt-link>
            </div>
        </div>
    </div>
</section>

<Footer />
</div>
</template>

<script>
import NavMain from '~/layouts/partials/NavMain';
import Footer from '~/layouts/partials/footer';
export default {
  auth: false,
  data() {
      return {
        articles: [],
        loader: true
      }
  },
  methods:{
    async getArticles(){
        console.time('1');

      await this.$axios.get('/articles/list/' + this.$i18n.locale)
          .then((response) => {
            //console.log(response.data)
              this.articles = response.data;
          })
          .catch((err) => {

          })
          .finally((err) => {
            this.loader = false;
          })
        console.timeEnd('1');
    },
  },
  mounted(){
    this.getArticles();
  },
  components:{
      NavMain,
      Footer
  }
}
</script>

<style lang="scss" scoped>
$base-color: #f3f3f3;
$shine-color: #f8f8f8;
$animation-duration: 1.2s;

.b05 {
    padding: 0 0 20px;
}

.b01_in1 {
    position: relative;
}
.b01_main_in2{
  position: relative;
}
.simple-header{
    margin-top: 60px;
    @media screen and (max-width: 600px){
      margin-top: 20px;
    }
}
.b01_in2_tx1{
    margin-bottom: 0;
}
.articles-list{
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: minmax(290px, max-content);
  grid-gap: 68px;
  margin-bottom: 120px;
  @media screen and (max-width: 800px){
    grid-template-columns: 1fr;
    grid-auto-rows: max-content;
    grid-gap: 28px;
  }
}
.article-preview-loader{
  display: grid;
  grid-template-columns: 48% 1fr;
  height: 100%;
  &-image{
    //background: #f3f3f3;
    background-image: linear-gradient(90deg, $base-color 0px, $shine-color 60px, $base-color 80px);
    background-size: 200%;
    animation: shine-lines $animation-duration infinite linear;
  }
  &-text{
    padding:40px;
    background: #fbfbfb;
    p{
      display: inline-block;
      width: 100%;
      //background: #f3f3f3;
      background-image: linear-gradient(90deg, $base-color 0px, $shine-color 40px, $base-color 80px);
      background-size: 200%;
      animation: shine-lines $animation-duration infinite linear;
      height: 26px;
      margin-bottom: 20px;
      margin-top: 0;
    }
  }
}

</style>
