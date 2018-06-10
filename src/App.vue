<template>
  <div>
    <nav-menu v-if="isAuthenticated" />
    <router-view/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import NavMenu from '@/components/NavMenu.vue';

export default {
  name: 'App',
  components: {
    NavMenu,
  },
  computed: {
    ...mapGetters([
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
</style>
