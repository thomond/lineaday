<template>
  <section class="hero is-primary is-fullheight is-bold">
    <div class="hero-body">
      <div class="container">
        <h1 class="title is-1 fancy">
          One Line a Day
        </h1>
        <h2 class="subtitle is-3">
          Because keeping a journal is hard
        </h2>
        <router-link
          to="/login"
          class="get-started button is-primary is-inverted is-large">
          Get Started
        </router-link>
        <a
          href="#notebook"
          class="button is-primary is-inverted is-outlined is-large"
          v-smooth-scroll="{ duration: 600, offset: -50 }">
          Learn More
        </a>
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
.get-started {
  margin-right: 20px;
}
</style>

