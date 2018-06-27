<template>
  <login-signup-form :starting-tab="1" :line="line">
    <div class="has-text-centered">
      <h4 class="title">Welcome!</h4>
      <h5 class="subtitle">Sign up or log in to continue</h5>
    </div>
  </login-signup-form>
</template>

<script>
import LoginSignupForm from '@/components/LoginSignupForm.vue'

export default {
  name: 'WelcomeModal',
  props: ['line'],
  components: {
    LoginSignupForm,
  }
};
</script>

<style scoped lang="scss">
.has-text-centered {
  margin-bottom: 20px;
}
</style>
