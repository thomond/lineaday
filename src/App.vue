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
@import url('https://fonts.googleapis.com/css?family=Special+Elite');
.logo {
  font-family: 'Special Elite', cursive;
  font-size: 1.5rem;
}

body {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

</style>
