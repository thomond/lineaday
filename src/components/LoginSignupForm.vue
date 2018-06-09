<template>
  <div class="card">
    <div class="card-content">
      <b-tabs type="is-toggle" expanded v-model="activeTab">
        <b-tab-item label="Log In">
          <login-form :on-submit="handleSignIn" buttonText="Log in" />
        </b-tab-item>
        <b-tab-item label="Sign Up">
          <login-form
            :on-submit="handleSignUp"
            :showConfirmPassword="true"
            buttonText="Sign up" />
        </b-tab-item>
      </b-tabs>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import LoginForm from './LogInForm.vue'

export default {
  name: 'LoginSignupForm',
  components: {
    LoginForm
  },
  props: {
    startingTab: {
      default: 0,
      type: Number
    }
  },
  data() {
    return {
      activeTab: this.startingTab
    }
  },
  methods: {
    ...mapActions([
      'userEmailSignIn',
      'userEmailSignUp'
    ]),
    handleSignIn(user) {
      this.userEmailSignIn(user)
    },
    handleSignUp(user) {
      this.userEmailSignUp(user)
    }
  }
}
</script>

<style scoped lang="scss">
.card {
  border-radius: 4px;
  width: 100%;
}
</style>
