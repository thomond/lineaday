<template>
  <div class="notification">
    <div class="payment" v-if="!submitted">
      <label class="label">
        Payment details:
        <card class="stripe-card"
          :class="{ complete }"
          :stripe="stripeKey"
          @change="complete = $event.complete"
        />
      </label>
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
            :disabled="!complete">
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
  </div>
</template>

<script>
import { Card, createToken } from 'vue-stripe-elements-plus'
import poweredByStripe from '@/assets/powered_by_stripe.svg'
import { addSubscription } from '@/firebase'

export default {
  data() {
    return {
      complete: false,
      poweredByStripe,
      submitted: false,
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
  computed: {
    stripeKey() {
      if (process.env.NODE_ENV === 'production') {
        return process.env.VUE_APP_STRIPE_PUBLISHABLE_PRODUCTION_KEY
      }

      return process.env.VUE_APP_STRIPE_PUBLISHABLE_TEST_KEY
    }
  },
  methods: {
    async pay() {
      try {
        const data = await createToken()
        this.submitted = true
        const response = await this.subscribeUser(data.token)
        console.log(response)
      } catch (err) {
        console.log(err)
        console.log('code', err.code)
        console.log('message', err.message)
        console.log('details', err.details)
      }
    },
    subscribeUser(token) {
      return addSubscription({
        stripePlan: 'premium_monthly',
        stripeToken: token.id,
      })
    }
  }
}
</script>

<style>
.container {
  padding: 0 20px;
}

.stripe-card.complete {
  border-color: green;
}

input,
.StripeElement {
  display: block;
  margin: 10px 0 20px 0;
  padding: 10px 14px;
  font-size: 1em;
  box-shadow:
    rgba(50, 50, 93, 0.14902) 0px 1px 3px,
    rgba(0, 0, 0, 0.0196078) 0px 1px 0px;
  border: 0;
  outline: 0;
  border-radius: 4px;
  background: #fff;
}

input:focus,
.StripeElement--focus {
  box-shadow:
    rgba(50, 50, 93, 0.109804) 0px 4px 6px,
    rgba(0, 0, 0, 0.0784314) 0px 1px 3px;
  transition: all 150ms ease;
}

.card {
  border-radius: 4px;
}

.disclaimer {
  margin: 20px 0;
}
</style>
