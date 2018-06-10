<template>
  <div>
    <welcome-hero />
    <nav-menu :sticky="true" />
    <section class="hero">
      <div class="hero-body">
        <div class="container">
          <p class="title is-1 has-text-primary">&ldquo;The little things? The little moments? They aren’t little.&rdquo;</p>
          <p class="subtitle is-3 has-text-right">&ndash; Jon Kabat-Zinn</p>
        </div>
      </div>
    </section>
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
import WelcomeHero from '@/components/WelcomeHero.vue'
import WelcomeTiles from '@/components/WelcomeTiles.vue'

export default {
  name: 'Welcome',
  components: {
    LoginSignupForm,
    NavMenu,
    WelcomeHero,
    WelcomeTiles
  }
};
</script>

<style scoped lang="scss">

</style>

