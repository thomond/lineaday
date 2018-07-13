<template>
  <div>
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
</template>

<script>
export default {
  name: 'PremiumFeatures',
};
</script>

<style scoped lang="scss">
p, li {
  line-height: 2.5rem;
}
</style>

