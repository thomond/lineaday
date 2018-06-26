<template>
    <section class="hero is-fullheight">
      <nav-menu />
      <div class="hero-body">
        <div class="container">
          <div v-if="!promptsAreLoading">
            <h1 class="title">{{ this.prompt }}</h1>
            <line-form :always-expanded="true" :hide-placeholder="true" :tall="true" />
          </div>
        </div>
      </div>
      <down-arrow anchor="hero" :is-primary="true" />
    </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
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
  }
};
</script>

<style scoped lang="scss">

</style>

