<template>
  <div>
    <div v-for="entry in lines" :key="entry[0]">
      <date-display :lines="entry[1]" :date="entry[0]" />
    </div>
  </div>
</template>

<script>
import DateDisplay from '@/components/DateDisplay.vue'

export default {
  name: 'List',
  props: ['lines'],
  components: {
    DateDisplay
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
