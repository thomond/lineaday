import Vue from 'vue'
import Buefy from 'buefy'
import 'buefy/lib/buefy.css'

import App from './App.vue'
import router from './router'
import firebase from './firebase'
import store from './store'
import './registerServiceWorker'

Vue.config.productionTip = false

Vue.use(Buefy)

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
      }
    }).$mount('#app')
    unsubscribe()
  })
