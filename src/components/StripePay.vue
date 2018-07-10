<template>
  <div class="card">
    <div class="card-content payment" v-if="!submitted">
      <h1 class="title is-4">tinythoughts premium subscription</h1>
      <p class="subtitle is-6">You will be billed <strong>$3/month</strong>.</p>
      <label class="label">
        Payment details:
        <card class="stripe-card"
          :class="{ complete }"
          :stripe="stripeKey"
          @change="complete = $event.complete"
        />
      </label>
      <button
        class="pay-with-stripe button is-primary"
        @click="pay"
        :disabled="!complete">
        Pay $3 with credit card
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { Card, createToken } from 'vue-stripe-elements-plus'

export default {
  data () {
    return {
      complete: false,
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
    ...mapActions([
      'subscribeUser'
    ]),
    async pay () {
      try {
        const data = await createToken()
        this.submitted = true
        const response = await subscribeUser({ token: data.token })
        console.log(response)
      } catch(err) {
        console.log(err)
      }
    }
  }
}
</script>

<style>
.stripe-card.complete {
  border-color: green;
}

input,
.StripeElement {
  display: block;
  margin: 10px 0 20px 0;
  max-width: 500px;
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
</style>
