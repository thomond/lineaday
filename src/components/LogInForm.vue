<template>
  <form @submit.prevent="handleSubmit">
    <b-field horizontal label="Email">
      <b-input name="email" v-model="email" type="email" autoComplete="email" required></b-input>
    </b-field>
    <b-field horizontal label="Password">
      <b-input name="password" v-model="password" type="password" required></b-input>
    </b-field>
    <b-field horizontal v-if="isSignUp" label="Confirm Password">
      <b-input name="passwordConfirm" v-model="passwordConfirm" type="password" required></b-input>
    </b-field>
    <b-field horizontal v-if="isSignUp">
      <b-checkbox v-model="privacyPolicy" required>
        I have read and understand the
        <router-link to="/terms-and-conditions" target="_blank">Terms & Conditions</router-link> and
        <router-link to="/privacy-policy" target="_blank">Privacy Policy</router-link>.
      </b-checkbox>
    </b-field>
    <b-field horizontal>
      <p class="control">
        <button :class="buttonClasses" type="submit">
          {{ buttonText }}
        </button>
      </p>
    </b-field>
  </form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'SignIn',
  props: ['buttonText', 'onSubmit', 'isSignUp'],
  data() {
    return {
      email: '',
      password: '',
      passwordConfirm: '',
      privacyPolicy: false,
    }
  },
  computed: {
    ...mapGetters([
      'userIsLoading'
    ]),
    buttonClasses() {
      return {
        button: true,
        'is-loading': this.userIsLoading,
        'is-primary': true,
        'is-medium': true
      }
    }
  },
  methods: {
    ...mapActions([
      'userEmailSignIn'
    ]),
    formIsValid() {
      return (this.email.length && this.password.length &&
        (!!this.isSignUp === ((this.password === this.passwordConfirm) && this.privacyPolicy)))
    },
    handleSubmit() {
      if (this.formIsValid()) {
        this.onSubmit({ email: this.email, password: this.password })
      } else {
        this.$toast.open({
          message: 'You must agree to the Privacy Policy in order to sign up.',
          position: 'is-bottom',
          type: 'is-danger'
        })
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
