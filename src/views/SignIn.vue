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
  name: 'SignIn',
  data() {
    return {
      email: '',
      password: '',
    }
  },
  computed: {
    ...mapGetters([
      'loading'
    ]),
  },
  methods: {
    ...mapActions([
      'userEmailSignIn'
    ]),
    onSubmit(e) {
      e.preventDefault()
      if (this.email.length && this.password.length) {
        this.userEmailSignIn({ email: this.email, password: this.password })
      }
    }
  }
}
</script>

<style scoped lang="scss">

</style>
