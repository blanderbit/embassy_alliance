import Vuex from 'vuex'
import axios from 'axios'

const cookieparser = process.server ? require('cookieparser') : undefined

export const getters = {
  isAuthenticated(state) {
    return state.auth.loggedIn
  },

  loggedInUser(state) {
    return state.auth.user
  },
  getTelegramPopub(state) {
    return state.telegramPopub
  }
}
// export const actions = {
//     nuxtServerInit({ commit }, { req }) {
//       let auth = null
//       if (req.headers.cookie) {
//         const parsed = cookieparser.parse(req.headers.cookie)
//         try {
//           auth = JSON.parse(parsed.auth)
//         } catch (err) {
//           // No valid cookie found
//         }
//       }
//       commit('setAuth', auth)
//     },
// }


export const state = () => ({
  locales: ['en', 'ru'],
  locale: 'en',
  auth: null,
  telegramPopub: false,
  imgURL: process.env.IMG_URL,//'http://ea-education.local'
  baseURL: process.env.BASE_URL,
  orderSending: false,
  stickyNav: false,
  stickyNavDisabled: false,
  deviceWidth: 0,
  deviceHeight: 0,
  maxMobileWidth: 800,
  showBottomButtons: false,
  appDomain: process.env.APP_DOMAIN,
  appWWW :  'www.' + process.env.APP_DOMAIN,
  appURL : process.env.APP_PROTO + '://' + 'www.' + process.env.APP_DOMAIN,
  hereAppId : process.env.HERE_API_ID,
  hereAppCode: process.env.HERE_APP_CODE,
  socialMedia: {
    facebook: process.env.SOCIAL_FB,
    vk: process.env.SOCIAL_VK,
    instagram: process.env.SOCIAL_INSTA
  },
  footerHeight: 0,
  footerTopPos: 0,
  products: [],
  pastProducts: [],
  countries: [],
  articles: [],
  seoSdMain: [],
  campListMenu: [],
  dwnFiles: {
    en: {
      parent_approval: process.env.DOWNLOAD_FILES_PA_EN,
      rules: process.env.DOWNLOAD_FILES_RULES_EN,
      medical_form : process.env.DOWNLOAD_FILES_MEDICAL_EN
    },
    ru:{
      parent_approval: process.env.DOWNLOAD_FILES_PA_RU,
      rules: process.env.DOWNLOAD_FILES_RULES_RU,
      medical_form : process.env.DOWNLOAD_FILES_MEDICAL_RU
    }
  },
  article:{},
  articleSEO:{}
})

export const mutations = {
  SET_LANG(state, locale) {
    if (state.locales.indexOf(locale) !== -1) {
      state.locale = locale
    }
  },
  setOrderSending(state,orderSending){
    state.orderSending = orderSending;
  },
  setAuth(state, auth) {
    state.auth = auth
  },
  setBaseUrl(state, baseURL){
    state.baseURL = baseURL
  },
  setImgUrl(state, imgURL){
    state.imgURL = imgURL
  },
  setMedicalFormLink(state, medicalFormLink){
    state.medicalFormLink = medicalFormLink
  },
  setRulesLink(state, rulesLink){
    state.rulesLink = rulesLink
  },
  setDeviceWidth(state, deviceWidth){
    state.deviceWidth = deviceWidth
  },
  setDeviceHeight(state, deviceHeight){
    state.deviceHeight = deviceHeight
  },
  setStickyNav(state, stickyNav){
    state.stickyNav = stickyNav
  },
  setTelegramPopub(state, telegramPopub){
    state.telegramPopub = telegramPopub
  },
  setstickyNavDisabled(state, stickyNavDisabled){
    state.stickyNavDisabled = stickyNavDisabled
  },
  setShowBottomButtons(state, showBottomButtons){
    state.showBottomButtons = showBottomButtons
  },
  setConstFooterHeight(state, footerHeight){
    state.footerHeight = footerHeight
  },
  setConstFooterTopPos(state, footerTopPos){
    state.footerTopPos = footerTopPos
  },
  setProducts(state, products){
    state.products = products
  },
  setPastProducts(state, pastProducts){
    state.pastProducts = pastProducts
  },
  setCountries(state, countries){
    state.countries = countries
  },
  setArticles(state, articles){
    state.articles = articles
  },
  setSeoSdMain(state, seoSdMain){
    state.seoSdMain = seoSdMain
  },
  setCampListMenu(state, campListMenu){
    state.campListMenu = campListMenu
  },
  setArticle(state, article){
    state.article = article
  },
  setArticleSEO(state, articleSEO){
    state.articleSEO = articleSEO
  },
}

export const actions = {

}

