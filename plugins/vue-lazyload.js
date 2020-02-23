import Vue from 'vue'
import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload, {
  preLoad: 2,
  //error: 'dist/error.png',
  loading: '/img/loading2.gif',
  attempt: 1
})
