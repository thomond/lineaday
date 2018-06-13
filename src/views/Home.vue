<template>
  <div class="container">
    <div class="columns" v-if="showForm || tag">
      <div class="column is-three-fifths is-offset-one-fifth">
        <new-line-form v-if="showForm" />
        <div v-if="tag" class="tag-container">
          <h1 class="title is-1 fancy">#{{ tag }}</h1>
          <router-link to="/home" class="subtitle is-6 has-text-primary">clear</router-link>
        </div>
      </div>
    </div>
    <div class="columns">
      <div class="column mobile-tags" v-if="isMobile">
        <router-link :to="tagUrl(t)" :key="t" v-for="t in tags">#{{ t }}</router-link>
      </div>
      <div class="column is is-three-fifths is is-offset-one-fifth">
        <list :lines="lines" :is-purpleable="isPurpleable" />
        <b-loading :is-full-page="true" :active.sync="loading"></b-loading>
      </div>
      <div class="column is-one-fifth tag-column" v-if="!isMobile">
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
import NewLineForm from '@/components/NewLineForm.vue'
import List from '@/components/List.vue'
import { tagToUrl } from '@/util'

export default {
  name: 'home',
  props: ['tag'],
  components: {
    List,
    NewLineForm
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
      'isEditing',
      'lines',
      'tags'
    ]),
    isMobile() {
      return this.$mq.below(this.$mv.mobile)
    },
    isPurpleable() {
      return this.hasToday && !this.tag
    },
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

.mobile-tags {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 0;
  padding-bottom: 0;

  a {
    margin: 2px;
  }
}

.tag-container {
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
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

