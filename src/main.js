import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import App from './App.vue'
import router from './router'
import firebase from './firebase'
import store from './store'
import './registerServiceWorker'

Vue.config.productionTip = false

Vue.use(ElementUI)

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
