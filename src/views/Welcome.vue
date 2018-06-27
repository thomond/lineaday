<template>
  <div :class="{ 'overflow-hidden': modalActive }">
    <welcome-line-form :handle-submit="handleSubmit" />
    <nav-menu :sticky="true" />
    <welcome-hero />
    <section class="hero is-light is-medium" id="notebook">
      <div class="hero-body">
        <div class="container">
          <div class="columns is-8 is-variable">
            <div class="column quote">
              <p class="is-size-1 has-text-right">
                <span class="fancy">tinythoughts</span> is
                a <strong class="has-text-primary">sentence a day</strong> journal
              </p>
            </div>
            <div class="column">
              <notebook :entries="notebookEntries" :mobile-entry="1" />
            </div>
          </div>
          <down-arrow anchor="tiles" :is-primary="true" />
        </div>
      </div>
    </section>
    <welcome-tiles />
    <welcome-features />
    <section class="hero is-primary" id="signup">
      <div class="hero-body">
        <div class="columns is-centered">
          <div class="column is-half-desktop">
            <h3 class="title">Try it now, for free!</h3>
            <login-signup-form :starting-tab="1" />
          </div>
        </div>
      </div>
    </section>
    <tiny-footer />
      <b-modal :active.sync="modalActive" has-modal-card>
        <welcome-modal :line="line" />
      </b-modal>
  </div>
</template>

<script>
import DownArrow from '@/components/DownArrow.vue'
import LoginSignupForm from '@/components/LoginSignupForm.vue'
import NavMenu from '@/components/NavMenu.vue'
import Notebook from '@/components/Notebook.vue'
import TinyFooter from '@/components/Footer.vue'
import WelcomeFeatures from '@/components/WelcomeFeatures.vue'
import WelcomeHero from '@/components/WelcomeHero.vue'
import WelcomeLineForm from '@/components/WelcomeLineForm.vue'
import WelcomeModal from '@/components/WelcomeModal.vue'
import WelcomeTiles from '@/components/WelcomeTiles.vue'

export default {
  name: 'Welcome',
  components: {
    DownArrow,
    LoginSignupForm,
    NavMenu,
    Notebook,
    TinyFooter,
    WelcomeFeatures,
    WelcomeHero,
    WelcomeLineForm,
    WelcomeModal,
    WelcomeTiles,
  },
  methods: {
    handleSubmit(line) {
      this.modalActive = true
      this.line = line
    }
  },
  data() {
    return {
      line: undefined,
      modalActive: false,
      notebookEntries: [{
        date: 'January 1',
        lines: [{
          year: 2017,
          text: 'Lazy day off, cuddling with the cats.'
        }, {
          year: 2016,
          text: 'Went to Scot:Lands and then ate chocolate covered strawberries from the Christmas market',
          tags: ['vacation', 'food']
        }]
      }, {
        date: 'December 31',
        lines: [{
          year: 2017,
          text: 'Dinner at Fiola with the folks and then watched the ball drop from my couch!',
          tags: ['restaurants']
        }, {
          year: 2016,
          text: 'Visited the botanical gardens in the morning and then danced in the new year at the ceilidh.',
          tags: ['botanicalgardens', 'vacation']
        }]
      }, {
        date: 'December 30',
        lines: [{
          year: 2016,
          text: 'Went to Edinburgh Castle in the morning and carried torches up Calton Hill in the evening!',
          tags: ['vacation']
        }]
      }]
    }
  },
};
</script>

<style scoped lang="scss">
.quote {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.overflow-hidden {
  overflow: hidden;
}
</style>

