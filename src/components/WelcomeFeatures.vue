<template>
  <section class="hero is-medium is-light" id="tiles">
    <div class="hero-body">
      <div class="container">
        <h3 class="title fancy has-text-centered">Features</h3>
        <div class="columns is-multiline is-centered is-mobile">
          <div class="column">
            <div class="box">
              <p class="title is-5 has-text-centered">Reminders</p>
              <p class="subtitle is-6">
                Choose a time and we'll send you a notification as a reminder
                to write down your thoughts.
              </p>
            </div>
          </div>
          <div class="column">
            <div class="box">
              <p class="title is-5 has-text-centered">Tags</p>
              <notebook :entries="hashtagEntries" :small="true" />
              <p class="subtitle is-6">
                Add tags to your thoughts to filter by specific categories. Watch your
                #fitness goals progress, or see a timeline of your #milestones.
              </p>
            </div>
          </div>
          <div class="column">
            <div class="box">
              <p class="title is-5 has-text-centered">Privacy</p>
              <p class="subtitle is-6">
                No telepathy here. We use end-to-end encryption on your entries, so no one
                can read your thoughts but you.
              </p>
            </div>
          </div>
          <div class="column">
            <div class="box">
              <p class="title is-5 has-text-centered">???</p>
              <p class="subtitle is-6">
                We are continually rolling out new features. What could come next? Exporting
                entries, visualizations, image uploads, and more!
              </p>
            </div>
          </div>
        </div>
        <down-arrow anchor="signup" :is-primary="true" />
      </div>
    </div>
  </section>
</template>

<script>
import Notebook from '@/components/Notebook.vue'
import DownArrow from './DownArrow.vue'

export default {
  name: 'WelcomeFeatures',
  components: {
    DownArrow,
    Notebook
  },
  data() {
    return {
      hashtagEntries: [{
        lines: [{
          text: 'Went to Scot:Lands and then ate chocolate covered strawberries from the Christmas market',
          tags: ['vacation', 'food']
        }]
      }]
    }
  }
}
</script>

<style scoped lang="scss">
</style>

