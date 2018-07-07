import Vue from 'vue'
import VueAnalytics from 'vue-analytics'
import vClickOutside from 'v-click-outside'
import vMediaQuery from 'v-media-query'
import vueSmoothScroll from 'vue2-smooth-scroll'
import bugsnagVue from 'bugsnag-vue'
import Buefy from 'buefy'
import 'buefy/lib/buefy.css'

import App from './App.vue'
import router from './router'
import firebase from './firebase'
import store from './store'
import './registerServiceWorker'
import bugsnagClient from './bugsnag'
import mobileDetect from './plugins/mobileDetect'

Vue.config.productionTip = false

if (process.env.NODE_ENV === 'production') {
  bugsnagClient.use(bugsnagVue(Vue))
  Vue.use(VueAnalytics, {
    id: process.env.VUE_APP_GOOGLE_ANALYTICS_ID,
    router
  })
}

Vue.use(Buefy, {
  defaultIconPack: 'fas',
})

Vue.use(vClickOutside)

Vue.use(vMediaQuery, {
  variables: {
    mobile: 768
  }
})

Vue.use(vueSmoothScroll)

Vue.use(mobileDetect)

const unsubscribe = firebase.auth()
  .onAuthStateChanged((firebaseUser) => {
    new Vue({
      router,
      store,
      render: h => h(App),
      created() {
        if (firebaseUser) {
          store.dispatch('onUserLogin', firebaseUser)
        }
      },
    }).$mount('#app')
    unsubscribe()
  })
