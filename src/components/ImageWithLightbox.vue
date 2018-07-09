<template>
  <div>
    <div :class="{ small, thumbnail }">
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
  props: ['imageUrl', 'small', 'tags', 'thumbnail', 'year'],
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

  &:hover {
    cursor: pointer;
  }
}

img {
  height: 100%;
  max-height: 100%;
  max-width: 100%;
  object-fit: contain;
  width: 100%;
}

.thumbnail {

  img {
    border-radius: 4px;
    height: 175px;
    min-height: 175px;
    min-width: 175px;
    width: 175px;
    object-fit: cover;

    @media only screen and (max-device-width : 768px) {
      height: 120px;
      min-height: 120px;
      min-width: 120px;
      width: 120px;
    }
  }

  &.small {
    img {
      height: 100px;
      min-height: 100px;
      min-width: 100px;
      width: 100px;
    }
  }
}

</style>
