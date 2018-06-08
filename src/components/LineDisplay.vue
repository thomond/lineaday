<template>
  <div class="container">
    <div class="message">
      <div class="message-body">
        <p class="subtitle">{{ date }}</p>
        <p class="title">{{ line.text }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'LineDisplay',
  props: ['line'],
  computed: {
    date() {
      return moment(this.line.createdAt.toDate()).format('MMMM D, YYYY')
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
