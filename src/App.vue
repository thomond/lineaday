<template>
  <div>
    <nav-menu />
    <router-view/>
  </div>
</template>

<script>
// @ is an alias to /src
import NavMenu from '@/components/NavMenu.vue';

export default {
  name: 'App',
  components: {
    NavMenu,
  },
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Special+Elite|Raleway|Reenie+Beanie');
.logo {
  font-family: 'Special Elite', cursive;
  font-size: 1.5rem;
}

.fancy {
  font-family: 'Reenie Beanie', cursive;
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
</style>
