<template>
  <div>
    <h3 class="title is-6">Your plan</h3>
    <div class="notification">
      <b-loading :is-full-page="false" :active="loading"></b-loading>
      <div class="columns" :style="style">
        <div class="column">
          <p class="title is-4">tinythoughts free</p>
          <p class="subtitle is-6">Upgrade now to get daily image uploads, and more!</p>
        </div>
        <div class="column is-narrow">
          <router-link
            :to="{ name: 'Upgrade' }"
            class="button is-primary is-rounded">
            Upgrade Now
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SubscriptionSettings',
  props: ['loading', 'subscription'],
  computed: {
    style() {
      return {
        visibility: this.loading ? 'hidden' : 'visible'
      }
    }
  }
};
</script>

<style scoped lang="scss">
.title.is-6 {
  margin-bottom: 5px;
}
</style>

