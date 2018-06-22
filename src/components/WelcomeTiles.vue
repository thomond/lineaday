<template>
  <section class="hero" id="tiles">
    <div class="hero-body">
      <div class="container">
        <h3 class="title"><span class="fancy">tinythoughts</span> can be about...</h3>
        <div class="columns is-multiline is-centered is-mobile">
          <div
            class="column is-2-desktop is-3-tablet"
            v-for="tile in tiles"
            :key="tile.icon">
            <div class="icon-tile">
              <div>
                <b-icon :icon="tile.icon" size="is-large"></b-icon>
              </div>
              <p class="subtitle is-5 is-size-6-mobile has-text-primary">#{{ tile.label }}</p>
            </div>
          </div>
        </div>
        <down-arrow anchor="features" :is-primary="true" />
      </div>
    </div>
  </section>
</template>

<script>
import DownArrow from './DownArrow.vue'

export default {
  name: 'WelcomeTiles',
  components: {
    DownArrow
  },
  data() {
    return {
      tiles: [{
        icon: 'plane',
        label: 'Travels'
      }, {
        icon: 'child',
        label: 'Milestones'
      }, {
        icon: 'heartbeat',
        label: 'Health'
      }, {
        icon: 'smile',
        label: 'Mood'
      }, {
        icon: 'lightbulb',
        label: 'Ideas'
      }, {
        icon: 'graduation-cap',
        label: 'Knowledge'
      }, {
        icon: 'redo-alt',
        label: 'Habits'
      }, {
        icon: 'utensils',
        label: 'Food'
      }, {
        icon: 'hand-holding-heart',
        label: 'Gratitude',
      }, {
        icon: 'walking',
        label: 'Fitness'
      }, {
        icon: 'bed',
        label: 'Dreams'
      }, {
        icon: 'briefcase',
        label: 'Career'
      }]
    }
  }
};
</script>

<style scoped lang="scss">
.icon-tile {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 40px;
}

.subtitle {
  margin-top: 15px;
  word-break: keep-all;
}
</style>

