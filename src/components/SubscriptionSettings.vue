<template>
  <div>
    <h3 class="title is-6">Your plan</h3>
    <div class="notification">
      <b-loading :is-full-page="false" :active="loading"></b-loading>
      <div class="columns" :style="style">
        <div class="column">
          <p class="title is-4 fancy">
            tinythoughts <span :class="plan.class">{{ plan.text }}</span>
          </p>
          <p class="subtitle is-6">
            {{ planDescription }}
          </p>
        </div>
        <div class="column is-narrow">
          <button
            @click="unsubscribe"
            v-if="hasSubscription && !subscription.cancelAtPeriodEnd"
            :disabled="loading"
            :class="{ button: true, 'is-loading': loading, 'is-outlined': true,
              'is-rounded': true, 'is-small': true }">
            Cancel Subscription
          </button>
          <button
            @click="resubscribe"
            v-if="hasSubscription && subscription.cancelAtPeriodEnd"
            :disabled="loading"
            :class="{ button: true, 'is-loading': loading, 'is-rounded': true,
              'is-primary': true }">
            Resubscribe
          </button>
          <router-link
            v-if="!hasSubscription"
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
import moment from 'moment'

export default {
  name: 'SubscriptionSettings',
  props: ['hasSubscription', 'loading', 'resubscribe', 'subscription', 'unsubscribe'],
  computed: {
    plan() {
      return this.hasSubscription ? { text: 'premium', class: 'has-text-primary' } :
        { text: 'free', class: 'has-text-grey' }
    },
    planDescription() {
      if (this.subscription.cancelAtPeriodEnd) {
        return `Your subscription has been canceled. It will remain active until
          ${moment.unix(this.subscription.currentPeriodEnd).format('MMMM Do')}. You will not be charged again for this subscription.`
      }

      switch (this.subscription.status) {
        case 'trialing':
          return `Your trial expires in ${moment.unix(this.subscription.trialEnd).diff(moment(), 'days')} days.`
        case 'active':
          return ''
        case 'past_due':
        case 'unpaid':
        case 'canceled':
        default:
          return 'Upgrade now to get daily image uploads, and more!'
      }
    },
    style() {
      return {
        visibility: this.loading ? 'hidden' : 'visible'
      }
    },
  }
};
</script>

<style scoped lang="scss">
.title.is-6 {
  margin-bottom: 5px;
}
</style>

