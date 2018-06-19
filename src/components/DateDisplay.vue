<template>
  <div :class="{ message: true, 'is-primary': isPurple }">
    <div class="message-body">
      <div class="title-container">
        <p :class="{ title: true,  'is-6': !isPurple, 'is-2': isPurple, fancy: true }">
          {{ date }}
        </p>
        <span v-if="false && isPurple">
          <a
            @click="resetEditing"
            class="edit has-text-primary"
            v-if="isEditing">
            cancel
          </a>
          <a
            @click="setEditingLine"
            class="edit has-text-primary"
            v-else>
              edit
          </a>
        </span>
      </div>
      <p v-for="line in lines" class="subtitle is-5" :key="line.id">
        <line-display :year="year(line)" :text="line.text" :id="line.id" />
      </p>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { mapGetters, mapMutations } from 'vuex'
import { groupByDateFormat } from '@/util'
import LineDisplay from './LineDisplay.vue'

export default {
  name: 'DateDisplay',
  props: ['isPurpleable', 'lines', 'date'],
  components: {
    LineDisplay
  },
  computed: {
    ...mapGetters([
      'isEditing'
    ]),
    isPurple() {
      return this.isPurpleable && moment().format(groupByDateFormat) === this.date
    },
    year: () => (line) => {
      const createdAt = line.createdAt.toDate ?
        line.createdAt.toDate() : line.createdAt
      return moment(createdAt).format('YYYY')
    }
  },
  methods: {
    ...mapMutations([
      'resetEditing',
      'setEditing'
    ]),
    setEditingLine() {
      this.setEditing(this.lines[0])
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
}
</style>
