<template>
  <div>
    <router-view v-if="showRouterView" />
    <b-loading :is-full-page="true" :active="true" v-else></b-loading>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'App',
  computed: {
    ...mapGetters([
      'encryptionKey',
      'isAuthenticated',
      'userIsLoading'
    ]),
    showRouterView() {
      return ((!!this.encryptionKey === this.isAuthenticated) && !this.userIsLoading)
    }
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

.upload-draggable {
  width: 100%;
}

.lightbox {
  .modal-content {
    height: 100%;
    overflow: hidden;
  }
}
</style>
