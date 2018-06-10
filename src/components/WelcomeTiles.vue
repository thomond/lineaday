<template>
  <section class="hero is-light">
    <div class="hero-body">
      <div class="container">
        <h3 class="title">Track your...</h3>
        <div class="columns is-multiline is-centered is-mobile">
          <div
            class="column is-2-tablet is-3-mobile"
            v-for="tile in tiles"
            :key="tile.icon">
            <div class="icon-tile">
              <div>
                <b-icon :icon="tile.icon" size="is-large"></b-icon>
              </div>
              <p class="subtitle is-4">{{ tile.label }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'WelcomeTiles',
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
}
</style>

