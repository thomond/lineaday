<template>
  <section class="hero is-medium" id="features">
    <div class="hero-body">
      <div class="container">
        <h3 class="title fancy has-text-centered">Features</h3>
        <div class="columns is-mobile">
          <div class="column is-one-third-tablet is-one-quarter-mobile has-text-right">
            <div class="icon-container">
              <b-icon icon="bell" :size="iconSize"></b-icon>
            </div>
          </div>
          <div class="column is-two-thirds-tablet is-three-quarters-mobile">
            <p class="title is-3">Reminders</p>
            <p class="subtitle is-5">
              Choose a time and we'll send you a notification to remind you
              to write down your thoughts.
            </p>
            <div class="push">
              <img :src="pushImage" />
              <div>
                <p class="title is-6">tinythoughts</p>
                <p class="subtitle is-6">It's time to write in your journal today!</p>
              </div>
            </div>
          </div>
        </div>
        <div class="columns is-mobile">
          <div class="column is-one-third-tablet is-one-quarter-mobile has-text-right">
            <div class="icon-container">
              <b-icon icon="hashtag" :size="iconSize"></b-icon>
            </div>
          </div>
          <div class="column is-two-thirds-tablet is-three-quarters-mobile">
            <p class="title is-3">Tags</p>
            <p class="subtitle is-5">
              Add tags to your thoughts to filter by specific categories.
            </p>
            <notebook :entries="hashtagEntries" :small="true" :mobile-entry="0" />
          </div>
        </div>
        <div class="columns is-mobile">
          <div class="column is-one-third-tablet is-one-quarter-mobile has-text-right">
            <div class="icon-container">
              <b-icon icon="user-secret" :size="iconSize"></b-icon>
            </div>
          </div>
          <div class="column is-two-thirds-tablet is-three-quarters-mobile">
            <p class="title is-3">Privacy</p>
            <p class="subtitle is-5">
              No telepathy here. We use end-to-end encryption on your entries, so no one
              can read your thoughts but you.
            </p>
          </div>
        </div>
        <div class="columns is-mobile">
          <div class="column is-one-third-tablet is-one-quarter-mobile has-text-right">
            <div class="icon-container">
              <b-icon icon="cloud-download-alt" :size="iconSize"></b-icon>
            </div>
          </div>
          <div class="column is-two-thirds-tablet is-three-quarters-mobile">
            <p class="title is-3">Export Backups</p>
            <p class="subtitle is-5">
              Download your data in CSV format.
            </p>
          </div>
        </div>
        <div class="columns is-centered">
          <div class="column is-two-thirds is-offset-one-third">
            <p class="title is-3">...and more!</p>
            <p class="subtitle is-5">
              We are continually rolling out new features. Some features coming up
              include visualizations, image uploads, login with facebook
              or google, and more!
            </p>
          </div>
        </div>
        <down-arrow anchor="signup" :is-primary="true" />
      </div>
    </div>
  </section>
</template>

<script>
import Notebook from '@/components/Notebook.vue'
import pushImage from '@/assets/notebook.png'
import DownArrow from './DownArrow.vue'

export default {
  name: 'WelcomeFeatures',
  components: {
    DownArrow,
    Notebook
  },
  data() {
    return {
      pushImage,
      hashtagEntries: [{
        date: 'April 15',
        lines: [{
          year: '2017',
          text: 'Finished my first half marathon!',
          tags: ['fitness']
        }, {
          year: '2015',
          text: 'Started couch to 5k program',
          tags: ['fitness']
        }]
      }]
    }
  },
  computed: {
    iconSize() {
      if (this.$mq.above(this.$mv.mobile)) {
        return 'is-large'
      }

      return 'is-medium'
    }
  }
}
</script>

<style scoped lang="scss">
.hero {
  background-color: #f5f5f57d;
}

.container {
  max-width: 800px;
}

.columns {
  margin-bottom: 80px;
}

.push {
  align-items: center;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 2px 2px 8px 1px gray;
  display: flex;
  padding: 4px;

  img {
    margin-right: 15px;
    max-width: 64px;
    max-height: 64px;
  }

  & + .subtitle {
    padding-top: 20px;
  }
}

.icon-container {
  background: #7957d5;
  border: 5px solid #9b67df;
  border-radius: 200px;
  display: inline-block;
  margin: 0 60px;
  padding: 20px;

  .icon {
    color: #fff;
  }

  @media only screen and (max-device-width : 768px) {
    margin: 0;
    padding: 10px;
  }
}

</style>

