<template>
  <div class="page">
    <nav-menu />
    <router-view :key="$route.fullPath" class="view" />
    <div class="container links">
      <div class="has-text-right">
        <router-link to="/terms-and-conditions"><small>Terms</small></router-link> |
        <router-link to="/privacy-policy"><small>Privacy Policy</small></router-link>
      </div>
    </div>
  </div>
</template>

<script>
import NavMenu from '@/components/NavMenu.vue'

export default {
  name: 'App',
  components: {
    NavMenu,
  },
};
</script>

<style lang="scss">
.links {
  padding-bottom: 10px;

  a {
    padding: 0 5px;
  }
}

.view {
  flex: 1;
}

.page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
