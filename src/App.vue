<template>
  <div>
    <notification-banner v-if="isAuthenticated" />
    <router-view v-if="!!encryptionKey === isAuthenticated" />
    <b-loading :is-full-page="true" :active="true" v-else></b-loading>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import NavMenu from '@/components/NavMenu.vue'
import NotificationBanner from '@/components/NotificationBanner.vue'

export default {
  name: 'App',
  components: {
    NavMenu,
    NotificationBanner
  },
  computed: {
    ...mapGetters([
      'encryptionKey',
      'isAuthenticated',
    ]),
  },
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Special+Elite|Raleway');
.logo {
  font-family: 'Special Elite', cursive;
  font-size: 1.5rem;
}

.fancy {
  font-family: 'Special Elite', cursive;
}

body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body, button, input, select, textarea {
  color: #2c3e50;
  font-family: 'Raleway', sans-serif;
}

.hero.is-primary .card .tabs li.is-active a,
.hero.is-primary .card .tabs li.is-active a:hover {
  background-color: #7957d5;
  border-color: #7957d5;
  color: white;
}

.hero.is-primary .card .tabs a {
  color: #4a4a4a;
}

.hero-body {
  overflow: hidden;
}

.message a:not(.button):not(.tag) {
  text-decoration: none;
}
</style>
