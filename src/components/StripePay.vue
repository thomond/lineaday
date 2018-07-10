<template>
  <div class="card">
    <div class="card-content">
      <h1>Please give us your payment details:</h1>
      <card class="stripe-card"
        :class="{ complete }"
        :stripe="stripeKey"
        @change="complete = $event.complete"
      />
      <button class="pay-with-stripe button" @click="pay" :disabled="!complete">
        Pay with credit card
      </button>
    </div>
  </div>
</template>

<script>
// import { stripeKey, stripeOptions } from './stripeConfig.json'
import { Card, createToken } from 'vue-stripe-elements-plus'

export default {
  data () {
    return {
      complete: false,
      stripeOptions: {
        // see https://stripe.com/docs/stripe.js#element-options for details
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
    pay () {
      // createToken returns a Promise which resolves in a result object with
      // either a token or an error key.
      // See https://stripe.com/docs/api#tokens for the token object.
      // See https://stripe.com/docs/api#errors for the error object.
      // More general https://stripe.com/docs/stripe.js#stripe-create-token.
      createToken().then(data => console.log(data.token))
    }
  }
}
</script>

<style>
.stripe-card {
  width: 300px;
  border: 1px solid grey;
}
.stripe-card.complete {
  border-color: green;
}
</style>
