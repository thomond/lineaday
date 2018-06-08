<template>
  <nav class="navbar" role="navigation" aria-label="main navigation" v-if="isAuthenticated">
    <div class="navbar-brand">
      <h1 class="logo navbar-item">Line a Day</h1>
    </div>
    <div class="navbar-menu">
      <div class="navbar-start">
        <router-link to="/" class="navbar-item">Today</router-link>
        <router-link to="/list" class="navbar-item">Past Days</router-link>
      </div>
      <div class="navbar-end">
        <a class="navbar-item" @click="handleSignOut">Sign Out</a>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'NavMenu',
  computed: {
    ...mapGetters([
      'isAuthenticated'
    ]),
  },
  methods: {
    ...mapActions([
      'userSignOut'
    ]),
    handleSignOut() {
      this.userSignOut()
    }
  }
}
</script>

<style scoped lang="scss">
.el-container {
  align-items: center;
  justify-content: space-between;
}
</style>
