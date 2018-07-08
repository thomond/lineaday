<template>
  <nav
    :class="classes"
    role="navigation"
    aria-label="main navigation">
    <div class="navbar-menu" v-if="isAuthenticated">
      <router-link to="/home" class="navbar-item" active-class="has-text-primary">
        <b-icon icon="calendar-alt" pack="far"></b-icon>
        <p class="icon-label">Timeline</p>
      </router-link>
      <router-link to="/photos" class="navbar-item" active-class="has-text-primary">
        <b-icon icon="images" pack="far"></b-icon>
        <p class="icon-label">Gallery</p>
      </router-link>
    </div>
    <div class="navbar-brand">
      <router-link class="navbar-item" to="/home">
        <span class="logo">tinythoughts</span>
      </router-link>
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
          <b-dropdown-item has-link>
            <router-link to="/settings">Settings</router-link>
          </b-dropdown-item>
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
    classes() {
      return {
        navbar: true,
        sticky: this.sticky,
        'is-primary': this.isPrimary,
        container: this.$mq.above(this.$mv.mobile)
      }
    }
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

.logo {
  margin-right: 10px;
}

.icon-label {
  padding-left: 5px;
}
</style>
