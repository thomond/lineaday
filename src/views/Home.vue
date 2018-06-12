<template>
  <div class="container">
    <div class="columns">
      <div class="column is-three-fifths is-offset-one-fifth">
        <line-form v-if="showForm" />
        <div v-if="tag" class="tag-container">
          <h1 class="title is-1 fancy">#{{ tag }}</h1>
          <router-link to="/home" class="subtitle is-6 has-text-primary">clear</router-link>
        </div>
      </div>
    </div>
    <div class="columns">
      <div class="column is is-three-fifths is is-offset-one-fifth">
        <list :lines="lines" />
        <b-loading :is-full-page="true" :active.sync="loading"></b-loading>
      </div>
      <div class="column is-one-fifth tag-column">
        <div :key="t" v-for="t in tags">
          <router-link :to="tagUrl(t)" >#{{ t }}</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapWaitingGetters } from 'vue-wait'
import { mapActions, mapGetters } from 'vuex'
import LineForm from '@/components/LineForm.vue'
import List from '@/components/List.vue'
import { tagToUrl } from '@/util'

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
      'hasToday',
      'lines',
      'tags'
    ]),
    showForm() {
      return !this.loading && !this.tag && !this.hasToday
    },
    tagUrl: () => tagToUrl
  }
};
</script>

<style scoped lang="scss">
.container {
  padding: 0 20px;
}

.tag-container {
  display: flex;
  align-items: baseline;
}

.title {
  margin-bottom: 0;
}

.subtitle {
  margin: 0 10px;
}

.tag-column {
  margin: 20px;
}
</style>

