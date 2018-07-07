<template>
  <div>
    <img :src="imageUrl" @click="lightbox = true" />
    <b-modal :active.sync="lightbox" class="lightbox">
      <img :src="imageUrl">
    </b-modal>
  </div>
</template>

<script>

export default {
  name: 'ImageWithLightbox',
  props: ['imageUrl'],
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
</style>
