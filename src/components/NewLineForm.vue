<template>
  <div class="form-container">
    <h1 class="title date fancy has-text-centered-mobile">{{ todaysDate }}</h1>
    <line-form />
  </div>
</template>

<script>
import moment from 'moment'
import LineForm from './LineForm.vue'

export default {
  name: 'NewLineForm',
  components: {
    LineForm
  },
  computed: {
    todaysDate() {
      return moment().format('MMMM D, YYYY');
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.form-container {
  min-height: 40vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.date {
  font-size: 2rem;
}
</style>
