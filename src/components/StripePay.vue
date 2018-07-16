<template>
  <div class="notification">
    <div class="payment">
      <div v-if="message" class="notification is-danger">
        {{ message }} Please try again.
      </div>
      <label class="label">
        Payment details:
        <card
          class="stripe-card"
          ref="stripe"
          :class="{ complete }"
          :stripe="stripeKey"
          @change="complete = $event.complete"
        />
      </label>
      <b-field label="Coupon Code">
        <b-input v-model="coupon" class="coupon-input"></b-input>
      </b-field>
      <p class="disclaimer">
        <small>
          By clicking 'subscribe', you will be charged a recurring fee of
          $3 per month. You can cancel at any time by going to
          <router-link :to="{ name: 'Settings' }">User Settings</router-link>.
        </small>
      </p>
      <div class="columns">
        <div class="column">
          <button
            class="pay-with-stripe button is-primary"
            @click="pay"
            :disabled="!complete || submitting">
            Subscribe
          </button>
        </div>
        <div class="column is-narrow">
          <a href="https://stripe.com/" target="_blank">
            <img :src="poweredByStripe" />
          </a>
        </div>
      </div>
    </div>
    <b-loading :is-full-page="false" :active="submitting"></b-loading>
  </div>
</template>

<script>
import { Card, createToken } from 'vue-stripe-elements-plus'
import { mapActions } from 'vuex'
import poweredByStripe from '@/assets/powered_by_stripe.svg'

export default {
  data() {
    return {
      complete: false,
      coupon: '',
      remount: true,
      poweredByStripe,
      message: null,
      submitting: false,
      stripeKey: process.env.VUE_APP_STRIPE_PUBLISHABLE_KEY,
      stripeOptions: {
        style: {
          base: {
            letterSpacing: '0.025em',
          },
          invalid: {
            color: '#9e2146',
          },
        },
      }
    }
  },
  components: { Card },
  methods: {
    ...mapActions([
      'subscribeUser'
    ]),
    async pay() {
      try {
        this.submitting = true
        this.message = null
        const data = await createToken()
        await this.subscribeUser({ token: data.token, coupon: this.coupon })
      } catch (err) {
        this.$refs.stripe.clear()
        this.submitting = false
        this.complete = false
        this.message = err.message
      }
    },
  }
}
</script>

<style scoped lang="scss">
.container {
  padding: 0 20px;
}

.stripe-card.complete {
  border-color: green;
}

.card {
  border-radius: 4px;
}

.disclaimer {
  margin: 20px 0;
}
</style>
