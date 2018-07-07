<template>
  <div>
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
          <list :is-purpleable="isPurpleable" :tag="tag" />
        </div>
        <div class="column is-one-fifth tag-column" v-if="!isMobile">
          <div>
            <div :key="t" v-for="t in tags">
              <router-link :to="tagUrl(t)" >#{{ t }}</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <b-loading :is-full-page="true" :active="loading"></b-loading>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
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
  computed: {
    ...mapGetters([
      'hasToday',
      'encryptionKey',
      'isEditing',
      'linesAreLoading',
      'userIsLoading',
      'tags'
    ]),
    isMobile() {
      return this.$mq.below(this.$mv.mobile)
    },
    isPurpleable() {
      return this.hasToday && !this.tag
    },
    loading() {
      return this.userIsLoading || !this.encryptionKey
    },
    showForm() {
      return !this.linesAreLoading && !this.tag && !this.hasToday
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

