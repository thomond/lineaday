<template>
  <div>
    <div :class="{ thumbnail }">
      <div v-if="year" class="is-6 has-text-grey">{{ year }}</div>
      <img :src="imageUrl" @click="lightbox = true" />
      <div v-if="tags" class="has-text-right is-size-7">
        <tag-link
          v-for="(value, tag) in tags"
          :tag="tag"
          :key="tag"
          classes="has-text-primary" />
      </div>
    </div>
    <b-modal :active.sync="lightbox" class="lightbox">
      <img :src="imageUrl" />
    </b-modal>
  </div>
</template>

<script>
import TagLink from './TagLink.vue'

export default {
  name: 'ImageWithLightbox',
  props: ['imageUrl', 'tags', 'thumbnail', 'year'],
  components: {
    TagLink
  },
  data() {
    return {
      lightbox: false,
    }
  }
};
</script>

<style scoped lang="scss">
img {
  border-radius: 4px;
  width: 100%;

  &:hover {
    cursor: pointer;
  }
}

.thumbnail {

  img {
    border-radius: 4px;
    height: 100px;
    min-height: 100px;
    min-width: 100px;
    width: 100px;
    object-fit: cover;
  }
}

</style>
