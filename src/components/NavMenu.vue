<template>
  <nav class="navbar" role="navigation" aria-label="main navigation" v-if="isAuthenticated">
    <div class="navbar-brand">
      <h1 class="logo navbar-item">One Line a Day</h1>
        <a
          @click="isActive = !isActive"
          role="button"
          class="navbar-burger"
          aria-label="menu"
          aria-expanded="false">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
    </div>
    <div :class="{ 'navbar-menu': true, 'is-active': isActive }">
      <div class="navbar-end">
        <b-dropdown position="is-bottom-left">
          <a class="navbar-item is-primary" slot="trigger">
            <span>{{ userEmail }}</span>
            <b-icon icon="caret-down"></b-icon>
          </a>
          <b-dropdown-item @click="handleSignOut">
            Log Out
          </b-dropdown-item>
        </b-dropdown>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'NavMenu',
  data() {
    return {
      isActive: false
    }
  },
  computed: {
    ...mapGetters([
      'isAuthenticated',
      'userEmail'
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

</style>
