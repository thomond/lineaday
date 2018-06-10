<template>
  <div>
    <welcome-hero />
    <nav-menu :sticky="true" :is-primary="true" />
    <section class="hero is-light is-medium" id="notebook">
      <div class="hero-body">
        <div class="container">
          <div class="columns is-8 is-variable">
            <div class="column">
              <notebook />
            </div>
            <div class="column quote">
              <p class="title is-1 has-text-primary">
                &ldquo;The little things? The little moments? They aren’t little.&rdquo;
              </p>
              <p class="subtitle is-3 has-text-right">&ndash; Jon Kabat-Zinn</p>
            </div>
          </div>
          <down-arrow anchor="tiles" :is-primary="true" />
        </div>
      </div>
    </section>
    <welcome-tiles />
    <section class="hero is-primary" id="signup">
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
import DownArrow from '@/components/DownArrow.vue'
import LoginSignupForm from '@/components/LoginSignupForm.vue'
import NavMenu from '@/components/NavMenu.vue'
import Notebook from '@/components/Notebook.vue'
import WelcomeHero from '@/components/WelcomeHero.vue'
import WelcomeTiles from '@/components/WelcomeTiles.vue'

export default {
  name: 'Welcome',
  components: {
    DownArrow,
    LoginSignupForm,
    NavMenu,
    Notebook,
    WelcomeHero,
    WelcomeTiles
  }
};
</script>

<style scoped lang="scss">
.quote {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>

