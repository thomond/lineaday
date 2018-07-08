<template>
  <div>
    <div :class="{ thumbnail }">
      <div v-if="year" class="is-6 has-text-grey">{{ year }}</div>
      <img :src="imageUrl" @click="lightbox = true" />
      <div v-if="tags" class="has-text-right">
        <router-link
          :to="url(tag)"
          v-for="(value, tag) in tags"
          :key="tag"
          class="has-text-primary is-size-7">
          #{{ tag }}
        </router-link>
      </div>
    </div>
    <b-modal :active.sync="lightbox" class="lightbox">
      <img :src="imageUrl" />
    </b-modal>
  </div>
</template>

<script>
import { tagToUrl } from '@/util'

export default {
  name: 'ImageWithLightbox',
  props: ['imageUrl', 'tags', 'thumbnail', 'year'],
  data() {
    return {
      lightbox: false,
    }
  },
  computed: {
    url: () => tagToUrl
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
  border-radius: 4px;

  img {
    height: 175px;
    min-height: 175px;
    min-width: 175px;
    width: 175px;
    object-fit: cover;

    @media only screen and (max-device-width : 768px) {
      height: 150px;
      min-height: 150px;
      min-width: 150px;
      width: 150px;
    }
  }
}

</style>
