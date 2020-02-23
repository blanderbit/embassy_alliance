<template>
  <star-rating
    :rounded-corners="true"
    :star-points="[23,2, 14,17, 0,19, 10,34, 7,50, 23,43, 38,50, 36,34, 46,19, 31,17]"
    :read-only="true"
    :show-rating="false"
    :rating="rating"
    :star-size="18"
    active-color="#ff5722"
    inactive-color="#999"
    :round-start-rating="true"
  ></star-rating>
</template>
<script>
export default {
  props: {
    rating: Number
  }
};
</script>