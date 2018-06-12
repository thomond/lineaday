<template>
  <div>
    <span class="subtitle is-6 has-text-grey">{{ year }}</span>
    <div v-if="isEditing">
      <line-form :handle-blur="handleBlur" :handle-submit="handleSubmit" />
    </div>
    <div v-else>
      <span v-for="(word, index) in words" :key="index">
        <span v-if="word.startsWith('#')">
          <router-link class="has-text-primary link" :to="url(word)">
            {{ word }}
          </router-link>
        </span>
        <span v-else>{{ word }}</span>
      </span>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import { tagToUrl } from '@/util'
import LineForm from './LineForm.vue'

export default {
  name: 'LineDisplay',
  components: {
    LineForm
  },
  props: ['id', 'text', 'year'],
  computed: {
    ...mapGetters([
      'getEditingLine'
    ]),
    isEditing() {
      return this.getEditingLine && (this.getEditingLine.id === this.id)
    },
    url: () => tagToUrl,
    words() {
      return this.text.split(' ')
    }
  },
  methods: {
    ...mapActions([
      'editLine'
    ]),
    ...mapMutations([
      'resetEditing'
    ]),
    handleBlur(text) {
      if (text === this.text) {
        this.resetEditing()
      }
    },
    handleSubmit({ text, tags }) {
      this.editLine({ text, tags, id: this.id })
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
span {
  margin: 1px;
}

.message a.link {
  text-decoration: none;
}
</style>
