<template>
  <div>
    <div v-for="entry in lines" :key="entry[0]">
      <date-display
        :is-purpleable="isPurpleable"
        :lines="entry[1]"
        :date="entry[0]" />
    </div>
    <b-loading :active="linesAreLoading"></b-loading>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import DateDisplay from '@/components/DateDisplay.vue'

export default {
  name: 'List',
  props: ['isPurpleable', 'tag'],
  components: {
    DateDisplay
  },
  mounted() {
    this.getLines({ tag: this.tag })
  },
  computed: {
    ...mapGetters([
      'lines',
      'linesAreLoading',
    ]),
  },
  methods: {
    ...mapActions([
      'getLines'
    ]),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
