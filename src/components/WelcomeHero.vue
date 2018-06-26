<template>
  <section class="hero is-primary is-bold" id="hero">
    <div class="hero-body">
      <welcome-benefits />
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

