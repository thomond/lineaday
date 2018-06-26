<template>
  <section class="hero is-primary is-fullheight is-bold" id="hero">
    <div class="hero-body">
      <div class="container">
        <h1 class="title is-1 is-size-3-mobile fancy">
          tinythoughts
        </h1>
        <h2 class="subtitle is-3 is-size-5-mobile">
          Because keeping a journal is hard
        </h2>
        <div class="columns">
          <div class="column is-narrow">
            <router-link
              to="/login"
              class="button is-primary is-inverted is-large">
              Get Started
            </router-link>
          </div>
          <div class="column">
            <a
              href="#notebook"
              class="button is-primary is-inverted is-outlined is-large"
              v-smooth-scroll="{ duration: 600, offset: -50 }">
              Learn More
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="hero-foot has-text-centered">
      <welcome-benefits />
      <down-arrow anchor="notebook" />
    </div>
  </section>
</template>

<script>
import DownArrow from '@/components/DownArrow.vue'
import WelcomeBenefits from '@/components/WelcomeBenefits.vue'

export default {
  name: 'WelcomeHero',
  components: {
    DownArrow,
    WelcomeBenefits,
  },
};
</script>

<style scoped lang="scss">

</style>

