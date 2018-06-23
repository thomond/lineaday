<template>
  <div>
    <nav-menu />
    <router-view :key="$route.fullPath" />
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

</style>
