<template>
  <el-container v-if="isAuthenticated">
    <h1 class="logo">Line a Day</h1>
    <div>
      <router-link to="/">Today</router-link>
      <router-link to="/list">Past Days</router-link>
    </div>
    <el-button type="text" @click="handleSignOut">Sign Out</el-button>
  </el-container>
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
