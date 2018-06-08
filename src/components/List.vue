<template>
  <div>
    <div v-for="line in lines" :key="line.createdAt.seconds">
      <line-display :line="line" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import LineDisplay from '@/components/LineDisplay.vue'

export default {
  name: 'List',
  components: {
    LineDisplay
  },
  computed: {
    ...mapGetters([
      'lines'
    ]),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
