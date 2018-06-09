<template>
  <section class="hero is-primary is-medium is-bold">
    <div class="hero-body">
      <div class="container">
        <div class="columns">
          <div class="column is-three-fifths is-offset-one-fifth">
            <div class="card">
              <h1 class="title is-1 fancy has-text-primary entry has-text-centered">
                One Line a Day
              </h1>
              <div v-for="entry in entries" :key="entry.date" class="entry">
                <p class="subtitle is-6 has-text-dark">{{ entry.date }}</p>
                <p class="title is-4 has-text-dark">{{ entry.text }}</p>
              </div>
              <router-link class="button is-large is-primary" to="/login">Get started</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Welcome',
  data() {
    return {
      entries: [{
        date: 'June 1, 2018',
        text: 'Today I did some stuff.'
      }, {
        date: 'June 2, 2018',
        text: 'Today I did some stuff.'
      }, {
        date: 'June 3, 2018',
        text: 'Today I did some stuff.'
      }, {
        date: 'June 4, 2018',
        text: 'Today I did some stuff.'
      }]
    }
  }
};
</script>

<style scoped lang="scss">
.entry {
  height: 60px;
  margin: 0;
}

.columns {
  align-items: center;
}

.button {
  align-self: flex-end;
}

.card {
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  padding: 37px 55px 27px;
  position: relative;
  border: 1px solid #B5B5B5;
  background: white;
  background: linear-gradient(to top, #DFE8EC 0%, white 8%) 0 57px;
  background-size: 100% 30px;

  &:before {
    content:"";
    z-index: -1;
    margin: 0 1px;
    width: 706px;
    height: 10px;
    position: absolute;
    bottom:-3px; left:0;
    background: white;
    border:1px solid #B5B5B5;
  }

  &:after {
    content: '';
    position: absolute;
    width: 0px;
    top: 0;
    left: 39px;
    bottom: 0;
    border-left: 1px solid #F8D3D3;
  }
}
</style>

