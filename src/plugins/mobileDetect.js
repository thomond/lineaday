import MobileDetect from 'mobile-detect'

export default {
  install(Vue) {
    const md = new MobileDetect(window.navigator.userAgent)
    Vue.prototype.$md = {
      isMobile: md.mobile()
    }
  }
}
