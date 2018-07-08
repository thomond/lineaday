<template>
  <div>
    <span class="subtitle is-6 has-text-grey">{{ year }}</span>
    <div v-if="isEditing">
      <line-form :handle-blur="handleBlur" :handle-submit="handleSubmit" />
    </div>
    <div v-else>
      <div v-if="imageUrl">
        <image-with-lightbox :image-url="imageUrl" :thumbnail="true" />
      </div>
      <div v-if="text">
        <div class="word-container">
          <span v-for="(word, index) in words" :key="index">
            <span v-if="word.startsWith('#')">
              <tag-link classes="has-text-primary link" :tag="word" :omit-hashtag="true" />
            </span>
            <span v-else>{{ word }}</span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import { tagToUrl } from '@/util'
import ImageWithLightbox from './ImageWithLightbox.vue'
import LineForm from './LineForm.vue'
import TagLink from './TagLink.vue'

export default {
  name: 'LineDisplay',
  components: {
    ImageWithLightbox,
    LineForm,
    TagLink
  },
  props: ['id', 'text', 'imageUrl', 'year'],
  computed: {
    ...mapGetters([
      'getEditingLine'
    ]),
    isEditing() {
      return this.getEditingLine && (this.getEditingLine.id === this.id)
    },
    url: () => tagToUrl,
    words() {
      return this.text.split(/\s/)
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
    handleSubmit({
      image, imageUrl, text, tags
    }) {
      this.editLine({
        image, imageUrl, text, tags, id: this.id
      })
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
span {
  margin: 1px;
}

.word-container {
  display: flex;
  flex-wrap: wrap;
}
</style>
