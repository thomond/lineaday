<template>
  <div>
    <welcome-hero />
    <nav-menu :sticky="true" />
    <welcome-benefits />
    <welcome-tiles />
    <section class="hero is-primary">
      <div class="hero-body">
        <div class="columns is-centered">
          <div class="column is-half-desktop">
            <login-signup-form :starting-tab="1" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import LoginSignupForm from '@/components/LoginSignupForm.vue'
import NavMenu from '@/components/NavMenu.vue'
import WelcomeBenefits from '@/components/WelcomeBenefits.vue'
import WelcomeHero from '@/components/WelcomeHero.vue'
import WelcomeTiles from '@/components/WelcomeTiles.vue'

export default {
  name: 'Welcome',
  components: {
    LoginSignupForm,
    NavMenu,
    WelcomeBenefits,
    WelcomeHero,
    WelcomeTiles
  }
};
</script>

<style scoped lang="scss">

</style>

