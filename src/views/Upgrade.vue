<template>
  <div class="container">
    <div class="columns">
      <div class="column">
        <premium-features />
      </div>
      <div class="column">
        <stripe-pay />
      </div>
    </div>
  </div>
</template>

<script>
import PremiumFeatures from '@/components/PremiumFeatures.vue'
import StripePay from '@/components/StripePay.vue'

export default {
  name: 'Upgrade',
  components: {
    PremiumFeatures,
    StripePay
  },
};
</script>

<style scoped lang="scss">
.container {
  margin-top: 100px;
}
</style>

