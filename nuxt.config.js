const pkg = require('./package')

import bodyParser from 'body-parser'
import session from 'express-session'
require('dotenv').config()

export default {
  // mode 'universal' causes the rendering issue
  // mode 'spa' doesn't do pre render

  mode: 'universal',

  dev: (process.env.NODE_ENV !== 'production'),

   vue: {
     config: {
       productionTip: (process.env.NODE_ENV == 'production'),
       devtools: (process.env.NODE_ENV !== 'production')
     }
   },
  /*
  ** Headers of the page
  */
  head: {
    title: "Embassy Camps",
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/img/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Montserrat:300,400,700|Material+Icons' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
    '@/assets/scss/main.scss'
  ],

  /*
  ** Plugins to load before mounting the App
  */

  /*
  ** Nuxt.js modules
  */
 buildModules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    '@nuxtjs/dotenv',
    'cookie-universal-nuxt',
    '@nuxtjs/toast',
    //'nuxt-material-design-icons',
    ['@nuxtjs/moment', ['ru']],
    '@nuxtjs/gtm',
    //['@nuxtjs/google-analytics', {
    //    id: 'UA-116676442-4'
    //}],
    //['nuxt-facebook-pixel-module', {
    //  track: 'PageView',
    //  pixelId: '502563743614940',
    //  disabled: false
    //}],
    //['@nuxtjs/google-tag-manager', { id: 'GTM-5J2KZFT' }],
    ['nuxt-i18n', {
        locales: [
        {
          code: 'en',
          iso: 'en-US',
          file: 'en.json',
          name: 'English'
        },
        {
          code: 'ru',
          iso: 'ru-RU',
          file: 'ru.json',
          name: 'Русский'
        }],
        lazy: true,
        langDir: 'locales/',
        defaultLocale: 'ru',
        differentDomains: false,
        vueI18n: {
          fallbackLocale: 'en',
      },
      detectBrowserLanguage: {
        useCookie: true,
        cookieKey: 'my_custom_cookie_name'
      }
    }]
  ],
  gtm: {
    id: 'GTM-MHK43SS'
  },
  toast: {
    position: 'top-center',
    register: [ // Register custom toasts
      {
        name: 'my-error',
        message: 'Oops...Something went wrong',
        options: {
          type: 'error'
        }
      }
    ]
},
  axios: {
    baseURL: process.env.BASE_URL//'http://ea-education.local/api'//'https://api.embassy.camp/api'
  },
  auth: {
    redirect: {
      login: '/login',
      logout: '/',
      callback: '/login',
      home: '/clientarea'
    },
    strategies: {
        local: {
            endpoints: {
                login: {
                    url: '/auth/login',
                    method: 'post',
                    propertyName: 'access_token'
                },
                logout: {
                    url: '/auth/logout',
                    method: 'post'
                },
                edit:{
                    url: '/auth/edit',
                    method: 'post'
                },
                user: {
                    url: '/auth/me',
                    method: 'post',
                    propertyName: false // <--- Default "user"
                },
            }
        }
      }
  },
  /*
  ** Nuxt.js plugins
  */
  plugins: [
    //'~/plugins/i18n.js',
    '~/plugins/firebase.js',
    '~/plugins/vue-uuid.js',
    { src: '~/plugins/vue-gallery.js', ssr: false },
    { src: '~/plugins/owl.js', ssr: false },
    { src: '~/plugins/vue-silentbox.js', ssr: false },
    { src: '~/plugins/vuikit.js', ssr: false },
    { src: '~/plugins/recaptcha.js', ssr: false },
    { src: '~/plugins/datepicker.js', ssr: false },
    { src: '~/plugins/vue-star-rating.js', ssr: false },
    { src: '~/plugins/vue-carousel.js', ssr: false },
    { src: '~/plugins/vue-clamp.js', ssr: false },
    { src: '~/plugins/vue-lazyload.js', ssr: false },
    { src: '~/plugins/vee-validate.js', ssr: true },
    { src: '~/plugins/global-components.js', ssr: false },
    //{ src: '~/plugins/v-photoswipe.js', ssr: false },
  ],
  /*
  ** ROUTER
  *
  router: {
     middleware: ['auth']
  },*/


  router: {
    // middleware: ['i18n','auth'],
    extendRoutes (routes, resolve) {
      routes.push(
        {
          name: 'campage___en',
          path: '/en/:country/:slug',
          component: resolve(__dirname, 'pages/_lang/_country/_slug.vue')
        },
        {
          name: 'campage___ru',
          path: '/:country/:slug',
          component: resolve(__dirname, 'pages/_lang/_country/_slug.vue')
        });
    },
  },

  generate: {
    routes: [
      '/',
      '/english_language_camp_malaysia',
      '/ru',
      '/ru/about',
      '/clientarea'
    ]
  },

  serverMiddleware: [
      // body-parser middleware
      bodyParser.json(),
      // session middleware
      session({
          secret: 'super-secret-key',
          resave: false,
          saveUninitialized: false,
          cookie: {
              maxAge: 60000
          }
      }),
    // Api middleware
    // We add /api/login & /api/logout routes
    '~/api'
  ],

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    minimize: true,
    minimizer: [
      'optimize-css-assets-webpack-plugin'
    ],
    extractCSS: (this.dev===false),
    filenames: {
      app: ({ isDev }) => isDev ? '[name].js' : '[chunkhash].js',
      chunk: ({ isDev }) => isDev ? '[name].js' : '[chunkhash].js',
      css: ({ isDev }) => isDev ? '[name].css' : '[contenthash].css',
      img: ({ isDev }) => isDev ? '[path][name].[ext]' : 'img/[hash:7].[ext]',
      font: ({ isDev }) => isDev ? '[path][name].[ext]' : 'fonts/[hash:7].[ext]',
      video: ({ isDev }) => isDev ? '[path][name].[ext]' : 'videos/[hash:7].[ext]'
    }
    //extend(config, ctx) {

    //}
  },
}

// run as:
// `npm run dev -- --port 4000`
