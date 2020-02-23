export default function ({ isHMR, app, store, route, params, error, redirect }) {
  console.log('middleware i18n.js')
  const defaultLocale = app.i18n.fallbackLocale
  // If middleware is called from hot module replacement, ignore it
  if (isHMR) return

  let cla = /^\/clientarea/.test(route.fullPath)
  //console.log('clientarea route: ' + cla)
  if(cla){
    //console.log('client area route')
    let tmpLocale = null;

      // check if the locale cookie is set
      if (req.headers.cookie) {
        const cookies = req.headers.cookie.split('; ').map(stringCookie => stringCookie.split('='));
        const cookie = cookies.find(cookie => cookie[0] === 'locale');

        if (cookie) {
          tmpLocale = cookie[1];
        }
      }

      // if the locale cookie is not set, fallback to accept-language header
      if (!tmpLocale) {
        tmpLocale = req.headers['accept-language'].split(',')[0].toLocaleLowerCase().substring(0, 2);
      }
    const locale = tmpLocale;
  } else {
    // Get locale from params
    const locale = params.lang || defaultLocale
  }
  if (store.state.locales.indexOf(locale) === -1) {
    return error({ message: 'This page could not be found.', statusCode: 404 })
  }
  // Set locale
  store.commit('SET_LANG', locale)
  app.i18n.locale = store.state.locale
  // If route is /<defaultLocale>/... -> redirect to /...
  if (locale === defaultLocale && route.fullPath.indexOf('/' + defaultLocale) === 0) {
    const toReplace = '^/' + defaultLocale + (route.fullPath.indexOf('/' + defaultLocale + '/') === 0 ? '/' : '')
    const re = new RegExp(toReplace)
    return redirect(
      route.fullPath.replace(re, '/')
    )
  }
}
