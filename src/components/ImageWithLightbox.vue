<template>
  <div>
    <figure :class="{ thumbnail }">
      <img :src="imageUrl" @click="lightbox = true" />
      <figcaption v-if="year" class="has-text-right has-text-white">{{ year }}</figcaption>
    </figure>
    <b-modal :active.sync="lightbox" class="lightbox">
      <img :src="imageUrl" />
    </b-modal>
  </div>
</template>

<script>

export default {
  name: 'ImageWithLightbox',
  props: ['imageUrl', 'thumbnail', 'year'],
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
  border-radius: 4px;
  position: relative;
  height: 175px;
  width: 175px;

  @media only screen and (max-device-width : 768px) {
    height: 150px;
    width: 150px;
  }

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }

  figcaption {
    background-color: #000;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    bottom: 0;
    height: 40px;
    left: 0;
    line-height: 40px;
    opacity: .5;
    padding: 0 10px;
    position: absolute;
    right: 0;
  }
}

</style>
