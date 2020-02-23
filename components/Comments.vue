<template>
  <client-only>
    <!-- important to add client-only-->
    <owl-carousel :autoplay="true" :nav="false" :items="1" :dots="true">
      <div class="b02_in1" v-for="(comment, index) in comments" :key="index">
        <p :class="['b02_in1_tx1', comment.class]">{{comment.text}}</p>
        <div class="b02_in2">
          <div class="b02_in2_img">
            <img class="avatar" :src="comment.avatar" />
          </div>
          <p class="b02_in2_tx1">{{comment.name}}</p>
        </div>
      </div>
    </owl-carousel>
  </client-only>
</template>

<script>
export default {
  name: "Comments",
  props: {
    comments: Array
  }
};
</script>

<style lang="scss" scoped>
.avatar {
  height: 60px !important;
  width: 60px !important;
  @media (max-width: 700px) {
    height: 50px !important;
    width: 50px !important;
  }
}
.fnt-smaller-md {
  font-size: 22px;
  @media screen and (max-width: 1400px) {
    font-size: 20px;
  }
  @media (max-width: 700px) {
    font-size: 16px;
    line-height: 1.4;
  }
}
.fnt-smaller-sm {
  font-size: 22px;
  @media screen and (max-width: 1400px) {
    font-size: 18px;
  }
  @media (max-width: 700px) {
    font-size: 16px;
  }
}
</style>