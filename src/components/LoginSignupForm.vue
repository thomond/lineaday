<template>
  <div class="card">
    <div class="card-content">
      <slot></slot>
      <b-tabs type="is-toggle" expanded v-model="activeTab">
        <b-tab-item label="Log In">
          <login-form :on-submit="handleSignIn" buttonText="Log in" />
        </b-tab-item>
        <b-tab-item label="Sign Up">
          <login-form
            :on-submit="handleSignUp"
            :is-sign-up="true"
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
    classes: {
      default: '',
      type: String
    },
    startingTab: {
      default: 0,
      type: Number
    },
    line: {
      type: Object
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
      this.userEmailSignIn({ user, line: this.line })
    },
    handleSignUp(user) {
      this.userEmailSignUp({ user, line: this.line })
    }
  }
}
</script>

<style scoped lang="scss">
.card {
  border-radius: 4px;
  width: 100%;

  @media only screen and (min-device-width : 768px) {
    min-width: 550px;
  }
}
</style>
