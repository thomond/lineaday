import Vue from 'vue';
import Router from 'vue-router';
import Form from './views/Form.vue';
import About from './views/About.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'form',
      component: Form,
    },
    {
      path: '/about',
      name: 'about',
      component: About,
    },
  ],
});
