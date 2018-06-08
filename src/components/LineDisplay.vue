<template>
  <div class="message is-primary">
    <div class="message-body">
      <p class="subtitle is-6">{{ date }}</p>
      <p class="title is-4">{{ line.text }}</p>
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
      const createdAt = this.line.createdAt.toDate ?
        this.line.createdAt.toDate() : this.line.createdAt
      return moment(createdAt).format('MMMM D, YYYY')
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.message {
  margin: 20px 0;
}
</style>
