<template>
  <section class="hero is-medium is-light" id="features">
    <div class="hero-body">
      <div class="container">
        <h3 class="title fancy has-text-centered">Features</h3>
        <div class="columns is-centered is-multiline">
          <div class="column is-half">
            <div class="box">
              <p class="title is-5 has-text-centered">Reminders</p>
              <div class="push">
                <img :src="pushImage" />
                <div>
                  <p class="title is-6">tinythoughts</p>
                  <p class="subtitle is-6">It's time to write in your journal today!</p>
                </div>
              </div>
              <p class="subtitle is-6">
                Choose a time and we'll send you a notification to remind you
                to write down your thoughts.
              </p>
            </div>
          </div>
          <div class="column is-half hashtag">
            <div class="box">
              <p class="title is-5 has-text-centered">Tags</p>
              <notebook :entries="hashtagEntries" :small="true" />
              <p class="subtitle is-6">
                Add tags to your thoughts to filter by specific categories.
              </p>
            </div>
          </div>
          <div class="column is-half privacy">
            <div class="box">
              <p class="title is-5 has-text-centered">Privacy</p>
                <b-icon icon="user-secret" size="is-large"></b-icon>
              <p class="subtitle is-6">
                No telepathy here. We use end-to-end encryption on your entries, so no one
                can read your thoughts but you.
              </p>
            </div>
          </div>
          <div class="column is-half backup">
            <div class="box">
              <p class="title is-5 has-text-centered">Export Backups</p>
                <b-icon icon="cloud-download-alt" size="is-large"></b-icon>
              <p class="subtitle is-6">
                Download your data in CSV format.
              </p>
            </div>
          </div>
        </div>
        <div class="columns is-centered">
          <div class="column is-one-third-desktop">
            <p class="title is-4 has-text-centered">...and more!</p>
            <p class="subtitle is-6 has-text-centered">
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
  }
}
</script>

<style scoped lang="scss">
.box {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.hashtag .subtitle {
  background: white;
  margin: -20px -5px 0;
  padding: 20px 5px 0;
  position: relative;
  z-index: 1;
}

.push {
  align-items: center;
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

.backup,
.privacy {
  .icon {
    align-self: center;
    font-size: 2.5rem;
    height: auto;
    margin-bottom: 20px;
  }
}
</style>

