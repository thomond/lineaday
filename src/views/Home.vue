<template>
  <div class="container">
    <line-form v-if="!loading" />
    <list />
    <b-loading :is-full-page="true" :active.sync="loading"></b-loading>
  </div>
</template>

<script>
import { mapWaitingGetters } from 'vue-wait'
import LineForm from '@/components/LineForm.vue'
import List from '@/components/List.vue'

export default {
  name: 'home',
  components: {
    LineForm,
    List
  },
  computed: {
    ...mapWaitingGetters({
      loading: 'loading lines',
    }),
  }
};
</script>

<style scoped lang="scss">
.container {
  max-width: 800px;
  padding: 0 20px;
}
</style>

