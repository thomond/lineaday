<template>
  <div :class="{ card: true, small: small }">
    <div v-for="(entry, i) in someEntries" :key="entry.date || i" class="entry">
      <p class="title is-5 fancy has-text-dark" v-if="entry.date">{{ entry.date }}</p>
      <p
        class="subtitle is-4 has-text-dark"
        v-for="(line, j) in entry.lines"
        :key="line.year || j">
        <span class="subtitle is-6 has-text-grey" v-if="line.year">{{ line.year }}:</span>
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
  props: ['entries', 'small'],
  computed: {
    someEntries() {
      if (this.$mq.above(this.$mv.mobile)) {
        return this.entries
      }

      return [this.entries[1]]
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

  &.small {
    padding-left: 37px;
    padding-right: 20px;

    &:after {
      left: 22px;
    }
  }
}
</style>

