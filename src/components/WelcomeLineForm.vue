<template>
  <section class="hero is-fullheight">
    <div class="hero-body">
      <div class="container">
        <div v-if="!promptsAreLoading">
          <h2 class="subtitle fancy is-4">{{ today }}</h2>
          <h1 class="title is-2">{{ prompt }}</h1>
          <line-form :always-expanded="true" :hide-placeholder="true" :tall="true" />
        </div>
      </div>
    </div>
    <div class="hero-foot">
      <div class="has-text-centered slogan">
        <p class="logo">tinythoughts</p>
        <p>Because keeping a journal is hard.</p>
      </div>
      <div class="columns is-centered is-mobile">
        <div class="column is-narrow">
          <router-link
            to="/login"
            class="button is-primary is-outlined">
            Get Started
          </router-link>
        </div>
        <div class="column is-narrow">
          <down-arrow anchor="notebook" :is-primary="true" text="Learn More" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import moment from 'moment'
import DownArrow from '@/components/DownArrow.vue'
import NavMenu from '@/components/NavMenu.vue'
import LineForm from './LineForm.vue'

export default {
  name: 'WelcomeLineForm',
  components: {
    DownArrow,
    LineForm,
    NavMenu
  },
  methods: {
    ...mapActions([
      'getPrompts'
    ]),
  },
  mounted() {
    this.getPrompts()
  },
  computed: {
    ...mapGetters([
      'prompt',
      'promptsAreLoading'
    ]),
    today() {
      return moment().format('MMMM D')
    }
  }
};
</script>

<style scoped lang="scss">
.is-fullheight {
  border-top: 5px solid #7957d5;
}

.slogan {
  margin-bottom: 10px;
}
</style>

