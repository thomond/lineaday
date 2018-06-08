<template>
  <div class="hero is-primary is-fullheight is-bold">
    <div class="hero-body">
      <div class="container">
        <h1 class="title is-4">Sign in</h1>
        <form @submit.prevent="onSubmit">
          <b-field label="Email" type="is-white" custom-class="has-text-white">
            <b-input name="email" v-model="email" type="email" autoComplete="email"></b-input>
          </b-field>
          <b-field label="Password" type="is-white" custom-class="has-text-white">
            <b-input name="password" v-model="password" type="password"></b-input>
          </b-field>
          <b-field label="Confirm Password" type="is-white" custom-class="has-text-white">
            <b-input name="passwordConfirm" v-model="passwordConfirm" type="password"></b-input>
          </b-field>
          <b-field>
            <p class="control">
              <button class="button is-primary" type="submit" :disabled="loading">
                Sign In
              </button>
            </p>
          </b-field>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'SignUp',
  data() {
    return {
      email: '',
      password: '',
      passwordConfirm: ''
    }
  },
  computed: {
    ...mapGetters([
      'loading'
    ]),
    passwordConfirmed() {
      return this.password === this.passwordConfirm
    }
  },
  methods: {
    ...mapActions([
      'userEmailSignUp'
    ]),
    onSubmit(e) {
      e.preventDefault()
      if (this.email.length && this.password.length && this.passwordConfirmed) {
        this.userEmailSignUp({ email: this.email, password: this.password })
      }
    }
  }
}
</script>
