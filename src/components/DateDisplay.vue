<template>
  <div :class="{ message: true, 'is-primary': isToday }">
    <div class="message-body">
      <div class="title-container">
        <p :class="{ title: true,  'is-6': !isToday, 'is-2': isToday, fancy: true }">
          {{ date }}
        </p>
        <button class="edit button small is-text has-text-primary" v-if="isToday">edit</button>
      </div>
      <p v-for="line in lines" class="subtitle is-5" :key="key(line)">
        <line-display :year="year(line)" :text="line.text" />
      </p>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { groupByDateFormat } from '@/util'
import LineDisplay from './LineDisplay.vue'

export default {
  name: 'DateDisplay',
  props: ['lines', 'date'],
  components: {
    LineDisplay
  },
  computed: {
    isToday() {
      return moment().format(groupByDateFormat) === this.date
    },
    key: () => line => line.createdAt.seconds || line.createdAt.toISOString(),
    year: () => (line) => {
      const createdAt = line.createdAt.toDate ?
        line.createdAt.toDate() : line.createdAt
      return moment(createdAt).format('YYYY')
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.is-2 {
  margin-bottom: .5rem;
}

.message {
  margin: 20px 0;
}

.title-container {
  align-items: baseline;
  display: flex;
}

.edit {
  margin-left: 10px;
  text-decoration: none;
}
</style>
