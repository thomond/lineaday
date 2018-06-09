<template>
  <form @submit.prevent="handleSubmit">
    <b-field horizontal label="Email">
      <b-input name="email" v-model="email" type="email" autoComplete="email" required></b-input>
    </b-field>
    <b-field horizontal label="Password">
      <b-input name="password" v-model="password" type="password" required></b-input>
    </b-field>
    <b-field horizontal v-if="showConfirmPassword" label="Confirm Password">
      <b-input name="passwordConfirm" v-model="passwordConfirm" type="password" required></b-input>
    </b-field>
    <b-field horizontal>
      <p class="control">
        <button class="button is-primary is-medium" type="submit">
          {{ buttonText }}
        </button>
      </p>
    </b-field>
  </form>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'SignIn',
  props: ['buttonText', 'onSubmit', 'showConfirmPassword'],
  data() {
    return {
      email: '',
      password: '',
      passwordConfirm: ''
    }
  },
  methods: {
    ...mapActions([
      'userEmailSignIn'
    ]),
    formIsValid() {
      return (this.email.length && this.password.length &&
        (this.showConfirmPassword && (this.password === this.passwordConfirm)))
    },
    handleSubmit() {
      if (this.email.length && this.password.length) {
        this.onSubmit({ email: this.email, password: this.password })
      }
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  align-items: center;
  display: flex;
  flex-direction: column;
}

.card {
  border-radius: 4px;
  max-width: 500px;
  width: 100%;
}

.logo {
  font-size: 3rem;
}
</style>
