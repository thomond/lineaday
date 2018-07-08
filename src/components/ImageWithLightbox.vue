<template>
  <div>
    <img :src="imageUrl" @click="lightbox = true" :class="{ thumbnail }" />
    <b-modal :active.sync="lightbox" class="lightbox">
      <img :src="imageUrl" />
    </b-modal>
  </div>
</template>

<script>

export default {
  name: 'ImageWithLightbox',
  props: ['imageUrl', 'thumbnail'],
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
  height: 175px;
  width: 175px;
  object-fit: cover;

  @media only screen and (max-device-width : 768px) {
    height: 150px;
    width: 150px;
  }
}
</style>
