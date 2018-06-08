<template>
  <div class="hero is-primary is-fullheight is-bold">
    <div class="hero-body">
      <div class="container">
        <h1 class="title logo has-text-light">One Line a Day</h1>
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
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import LoginForm from '@/components/LogInForm.vue'

export default {
  name: 'Login',
  components: {
    LoginForm
  },
  data() {
    return {
      activeTab: 0
    }
  },
  computed: {
    ...mapGetters([
      'loading'
    ]),
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
.container {
  align-items: center;
  display: flex;
  flex-direction: column;
  max-width: 600px;
}

.card {
  border-radius: 4px;
  width: 100%;
}

.logo {
  font-size: 3rem;
}
</style>
