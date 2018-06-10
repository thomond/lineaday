<template>
  <div class="container">
    <line-form v-if="showForm" />
    <list :lines="lines" />
    <b-loading :is-full-page="true" :active.sync="loading"></b-loading>
  </div>
</template>

<script>
import { mapWaitingGetters } from 'vue-wait'
import { mapActions, mapGetters } from 'vuex'
import LineForm from '@/components/LineForm.vue'
import List from '@/components/List.vue'

export default {
  name: 'home',
  props: ['tag'],
  components: {
    LineForm,
    List
  },
  mounted() {
    this.getLines({ tag: this.tag })
  },
  methods: {
    ...mapActions([
      'getLines'
    ]),
  },
  computed: {
    ...mapWaitingGetters({
      loading: 'loading lines',
    }),
    ...mapGetters([
      'lines'
    ]),
    showForm() {
      return !this.loading && !this.tag
    }
  }
};
</script>

<style scoped lang="scss">
.container {
  max-width: 800px;
  padding: 0 20px;
}
</style>

