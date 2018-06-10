<template>
  <div class="message is-primary">
    <div class="message-body">
      <p class="title is-6 fancy">{{ date }}</p>
      <p v-for="line in lines" class="subtitle is-5" :key="key(line)">
        <span class="subtitle is-6 has-text-grey">{{ year(line) }}: </span>
        <span v-html="text(line.text)"></span>
      </p>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { tagRegExp } from '@/util'

export default {
  name: 'DateDisplay',
  props: ['lines', 'date'],
  computed: {
    key: () => line => line.createdAt.seconds || line.createdAt.toISOString(),
    year: () => (line) => {
      const createdAt = line.createdAt.toDate ?
        line.createdAt.toDate() : line.createdAt
      return moment(createdAt).format('YYYY')
    },
    text: () => lineText => lineText.replace(tagRegExp, match => `<span class="tag is-primary is-rounded is-medium">${match}</span>`)
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.message {
  margin: 20px 0;
}
</style>
