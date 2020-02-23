<template>
    <div>
        <client-only>
<vk-modal size="container" :show="isOpen" id="f-reviews">
  <vk-modal-close @click="isOpen = false"></vk-modal-close>
  <carousel :autoplay="false" :nav="true" :items="1" :dots="true">
      <div v-for="(item, index) in items" :key="index" class="reviews">
        <div class="items_tx1" v-if="item.comment && item.name">
          <p class="">{{item.name}}</p>
          <p class="">{{item.comment}}</p>
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
    name: 'Reviews',
  props: { 
      items: Array,
      isOpen: Boolean,
      },
    methods: {
        
    }
}

</script>
