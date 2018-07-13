<template>
  <div class="container">
    <div class="columns">
      <div class="column">
        <h1 class="title is-2">tinythoughts premium</h1>
        <div class="subtitle is-4">
          $3/month
          <div class="is-size-6">Free for the first 30 days!</div>
        </div>
        <p>Premium features include:</p>
        <ul class="fa-ul">
          <li>
            <span class="fa-li">
              <i class="fas fa-angle-double-right has-text-primary"></i>
            </span>
            Daily image uploads
          </li>
          <li>
            <span class="fa-li">
              <i class="fas fa-angle-double-right has-text-primary"></i>
            </span>
            Image gallery view
          </li>
        </ul>
      </div>
      <div class="column">
        <stripe-pay />
      </div>
    </div>
  </div>
</template>

<script>
import StripePay from '@/components/StripePay.vue'

export default {
  name: 'Upgrade',
  components: {
    StripePay
  },
};
</script>

<style scoped lang="scss">
.container {
  margin-top: 100px;
}

p, li {
  line-height: 2.5rem;
}
</style>

