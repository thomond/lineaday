<template>
  <nav
    :class="classes"
    role="navigation"
    aria-label="main navigation">
    <div :class="{ container: !isMobile }">
      <div class="navbar-menu" v-if="isAuthenticated">
        <router-link to="/home" class="navbar-item has-text-primary" active-class="is-bold">
          Timeline
        </router-link>
        <router-link to="/photos" class="navbar-item has-text-primary" active-class="is-bold">
          Gallery
        </router-link>
      </div>
      <div class="navbar-brand">
        <router-link class="navbar-item" to="/home">
          <span class="logo is-size-6">tinythoughts</span>
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
          <router-link
            v-if="isMobile"
            to="/home"
            class="navbar-item has-text-primary"
            active-class="is-bold">
            Timeline
          </router-link>
          <router-link
            v-if="isMobile"
            to="/photos"
            class="navbar-item has-text-primary"
            active-class="is-bold">
            Gallery
          </router-link>
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
          <router-link
            to="/login"
            class="is-primary navbar-item"
            v-else>
            Sign up/Log in
          </router-link>
        </div>
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
      }
    },
    isMobile() {
      return this.$mq.below(this.$mv.mobile)
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

.is-bold {
  font-weight: 600;
}
</style>
