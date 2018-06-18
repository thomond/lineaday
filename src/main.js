import Vue from 'vue'
import VueAnalytics from 'vue-analytics'
import vMediaQuery from 'v-media-query'
import vueSmoothScroll from 'vue2-smooth-scroll'
import Buefy from 'buefy'
import 'buefy/lib/buefy.css'

import App from './App.vue'
import router from './router'
import firebase from './firebase'
import store from './store'
import './registerServiceWorker'

Vue.config.productionTip = false

Vue.use(Buefy, {
  defaultIconPack: 'fas',
})
Vue.use(vMediaQuery, {
  variables: {
    mobile: 768
  }
})
Vue.use(vueSmoothScroll)

if (process.env.NODE_ENV === 'production') {
  Vue.use(VueAnalytics, {
    id: process.env.VUE_APP_GOOGLE_ANALYTICS_ID,
    router
  })
}

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
