import Vue from 'vue'
import Router from 'vue-router'

import firebase from './firebase'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import NotFound from './views/NotFound.vue'
import PrivacyPolicy from './views/PrivacyPolicy.vue'
import Settings from './views/Settings.vue'
import Terms from './views/Terms.vue'
import Welcome from './views/Welcome.vue'

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Welcome',
      component: Welcome,
    },
    {
      path: '/home/:tag?',
      name: 'home',
      component: Home,
      meta: { requiresAuth: true },
      props: true
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/privacy-policy',
      name: 'PrivacyPolicy',
      component: PrivacyPolicy,
    },
    {
      path: '/settings',
      name: 'Settings',
      component: Settings,
      meta: { requiresAuth: true },
    },
    {
      path: '/terms-and-conditions',
      name: 'Terms',
      component: Terms,
    },
    {
      path: '*',
      component: NotFound,
      meta: { requiresAuth: true }
    }
  ],
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const isAuthenticated = firebase.auth().currentUser
  if (requiresAuth && !isAuthenticated) {
    next('/login')
  } else if (!requiresAuth && isAuthenticated) {
    next('/home')
  } else {
    next()
  }
})

export default router;
