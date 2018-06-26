<template>
  <div class="hero is-primary is-fullheight is-bold">
    <div class="hero-body">
      <div class="container">
        <h1 class="title logo has-text-light is-size-3-mobile">tinythoughts</h1>
        <login-signup-form />
      </div>
    </div>
  </div>
</template>

<script>
import LoginSignupForm from '@/components/LoginSignupForm.vue'

export default {
  name: 'Login',
  components: {
    LoginSignupForm
  },
}
</script>

<style scoped lang="scss">
.container {
  align-items: center;
  display: flex;
  flex-direction: column;
  max-width: 600px;
}

.logo {
  font-size: 3rem;
}
</style>
