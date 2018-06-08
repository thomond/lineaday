import Vue from 'vue';
import Router from 'vue-router';
import firebase from 'firebase';

import Form from './views/Form.vue';
import List from './views/List.vue';
import SignIn from './views/SignIn.vue';
import SignUp from './views/SignUp.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'form',
      component: Form,
      meta: { requiresAuth: true }
    },
    {
      path: '/list',
      name: 'list',
      component: List,
      meta: { requiresAuth: true }
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/signin',
      name: 'SignIn',
      component: SignIn
    }
  ],
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const isAuthenticated = firebase.auth().currentUser
  if (requiresAuth && !isAuthenticated) {
    next('/signin')
  } else {
    next()
  }
})

export default router;
