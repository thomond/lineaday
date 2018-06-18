<template>
  <div class="card">
    <div v-for="entry in entries" :key="entry.date" class="entry">
      <p class="title is-5 fancy has-text-dark">{{ entry.date }}</p>
      <p
        class="subtitle is-4 has-text-dark"
        v-for="line in entry.lines"
        :key="line.year">
        <span class="subtitle is-6 has-text-grey">{{ line.year }}:</span>
        {{ line.text }}
        <span class="has-text-primary" v-for="tag in line.tags" :key="tag">
          #{{ tag }}
        </span>
      </p>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Notebook',
  data() {
    return {
      allEntries: [{
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
  computed: {
    entries() {
      if (this.$mq.above(this.$mv.mobile)) {
        return this.allEntries
      }

      return [this.allEntries[1]]
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
  overflow: hidden;

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

