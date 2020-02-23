<template>
<div>
  <section class="container">
    <h1>Services</h1>
    <p class="subheading">They're juicy and stuff.</p>

    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptates sed tenetur quas! Laudantium odio consectetur, quia dolore veritatis quae quam nobis</p>
 

    <div class="paragraph">
      <h3>PhotoSwipe</h3>
      <div>
        <a href="#" @click="showPhotoSwipe(0)">Link to open the reviews</a>
        
      </div>
    </div>

  
      <!--<vue-picture-swipe  v-if="isOpen" :items="items" @close="hidePhotoSwipe"></vue-picture-swipe>-->

  </section>
  <client-only>
<vk-modal size="container" :show="isOpen" id="f-reviews">
  <vk-modal-close @click="isOpen = false"></vk-modal-close>
  <carousel :autoplay="false" :nav="true" :items="1" :dots="true">
      <div v-for="(item, index) in items" :key="index" class="reviews">
        <div class="items_tx1" v-if="item.comment">
          <p class="">Родион (Россия, Санкт-Петербург)</p>
          <p class="">
            Вы в корне изменили моего ребенка
            в лучшую сторону. Спасибо!
          </p>
        </div>
          <div class="reviews__holder">
            <div class="reviews__holder_img-container">
              <img class="review" :src="item.src" >
            </div>
            
          </div>
      </div>
  </carousel>
</vk-modal>
</client-only>
</div>
</template>

<script>
export default {
    head() {
        return {
            title: 'About Nuxt',
            meta: [
                { name: 'description', content: 'This is my about description here.'},
                { name: 'keywords', content: 'about nuxt, nuxt info'},
            ],
        }
    },
    data(){
      return{
        isOpen: false,
      isOpenGallery: false,
      options: {
        index: 0
      },
      optionsGallery: {},
        items:[
                {
                  src: '/img/rev_1.jpg',                 
                },
                {
                  src: '/img/rev_2.jpg',
                },
                {
                  src: '/img/rev_3.jpg',
                 
                },
                {
                  src: '/img/rev_4.jpg',                
                }
        ]
      }
    },
    methods: {
    showPhotoSwipe (index) {
      this.isOpen = true
      //this.$set(this.options, 'index', index)
    },
    hidePhotoSwipe () {
      this.isOpen = false
    }
  }
}
</script>

<style lang="scss">

</style>

