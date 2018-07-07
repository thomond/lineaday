<template>
  <div class="page">
    <nav-menu />
    <notification-banner v-if="isAuthenticated" />
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
import { mapGetters } from 'vuex'
import NavMenu from '@/components/NavMenu.vue'
import NotificationBanner from '@/components/NotificationBanner.vue'

export default {
  name: 'Page',
  components: {
    NavMenu,
    NotificationBanner,
  },
  computed: {
    ...mapGetters([
      'isAuthenticated',
    ]),
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
