<template>
  <nav
    :class="{ navbar: true, sticky: sticky, 'is-primary': isPrimary }"
    role="navigation"
    aria-label="main navigation">
    <div class="navbar-brand">
      <router-link class="logo navbar-item" to="/home">tinythoughts</router-link>
        <a
          @click="isActive = !isActive"
          role="button"
          :class="{ 'navbar-burger': true, 'has-text-white': isPrimary }"
          aria-label="menu"
          aria-expanded="false">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
    </div>
    <div :class="{ 'navbar-menu': true, 'is-active': isActive }">
      <div class="navbar-end">
        <b-dropdown position="is-bottom-left" v-if="isAuthenticated">
          <a class="navbar-item is-primary" slot="trigger">
            <span>{{ userEmail }}</span>
            <b-icon icon="caret-down"></b-icon>
          </a>
          <b-dropdown-item @click="handleSignOut">
            Log Out
          </b-dropdown-item>
        </b-dropdown>
        <router-link to="/login" class="is-primary navbar-item" v-else>Sign up/Log in</router-link>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'NavMenu',
  props: ['sticky', 'isPrimary'],
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
.sticky {
  position: sticky;
  top: 0;
}
</style>
