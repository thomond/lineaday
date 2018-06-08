import Vue from 'vue'
import VueWait from 'vue-wait'
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
Vue.use(VueWait)

const unsubscribe = firebase.auth()
  .onAuthStateChanged((firebaseUser) => {
    new Vue({
      router,
      store,
      render: h => h(App),
      created() {
        if (firebaseUser) {
          store.dispatch('getUserFromAuthUser', firebaseUser)
        }
      },
      wait: new VueWait({
        useVuex: true,
        registerComponent: true,
        componentName: 'v-wait',
        registerDirective: true,
        directiveName: 'wait',
      }),
    }).$mount('#app')
    unsubscribe()
  })
