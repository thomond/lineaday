<template>
  <section class="hero is-primary is-bold">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-8 is-variable">
          <div class="column">
            <div class="card">
              <div v-for="entry in entries" :key="entry.date" class="entry">
                <p class="title is-5 fancy has-text-dark">{{ entry.date }}</p>
                <p
                  class="subtitle is-4 has-text-dark"
                  v-for="line in entry.lines"
                  :key="line.year">
                  <span class="subtitle is-6 has-text-grey">{{ line.year }}:</span>
                  {{ line.text }}
                </p>
              </div>
            </div>
          </div>
          <div class="column">
            <h1 class="title is-1 fancy">
              One Line a Day
            </h1>
            <h2 class="subtitle is-3">
              Because keeping a journal is hard
            </h2>
            <router-link
              to="/login"
              class="button is-primary is-inverted is-outlined is-large">
              Get Started
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>

export default {
  name: 'WelcomeHero',
  data() {
    return {
      entries: [{
        date: 'January 1',
        lines: [{
          year: 2017,
          text: 'Lazy day off, cuddling with the cats.'
        }, {
          year: 2016,
          text: 'Woke up late and went to Scot:Lands and then ate chocolate covered strawberries from the Christmas market'
        }]
      }, {
        date: 'December 31',
        lines: [{
          year: 2017,
          text: 'Ate dinner with the folks and then watched the ball drop from my couch!',
        }, {
          year: 2016,
          text: 'Visited the botanical gardens in the morning and then danced in the new year at the ceilidh.'
        }]
      }, {
        date: 'December 30',
        lines: [{
          year: 2016,
          text: 'Went to Edinburgh Castle in the morning and carried torches up Calton Hill in the evening!'
        }]
      }]
    }
  }
};
</script>

<style scoped lang="scss">
.entry {
  &:first-of-type {
    margin-top: -7px;
  }

  p {
    line-height: 30px;
  }

  .subtitle,
  .title {
    margin: 0;
  }
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
  padding: 37px 70px 27px;
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
    left: 50px;
    bottom: 0;
    border-left: 1px solid #F8D3D3;
  }
}
</style>

