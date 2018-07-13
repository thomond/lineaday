<template>
  <div>
    <router-view v-if="hasSubscription"></router-view>
    <div v-if="showMessage" class="needs-subscription">
      <h3 class="title is-5" v-if="isPremiumRoute && !hasSubscription">
        {{ $route.name }} is a <span class="has-text-primary">premium</span> feature.
        Please upgrade to continue.
      </h3>
      <div class="notification">
        <premium-features />
        <router-link
          v-if="!hasSubscription"
          class="button is-primary is-medium"
          :to="{ name: 'Upgrade' }">
          Subscribe Now!
        </router-link>
      </div>
    </div>
    <b-loading :is-full-page="true" :active="subscriptionIsLoading"></b-loading>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import PremiumFeatures from '@/components/PremiumFeatures.vue'

export default {
  name: 'Premium',
  components: {
    PremiumFeatures
  },
  computed: {
    ...mapGetters([
      'hasSubscription',
      'subscriptionIsLoading',
    ]),
    isPremiumRoute() {
      return this.$route.name !== 'premium'
    },
    showMessage() {
      return !this.subscriptionIsLoading && (!this.isPremiumRoute || !this.hasSubscription)
    }
  }
};
</script>

<style scoped lang="scss">
.needs-subscription {
  margin-top: 20px;
}

.notification {
  display: flex;
  flex-direction: column;

  .button {
    align-self: flex-end;
    margin-top: 10px;

      @media only screen and (max-device-width : 768px) {
        align-self: center;
      }
  }
}
</style>

