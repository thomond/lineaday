<template>
  <div>
    <img :src="imageUrl" @click="lightbox = true" />
    <b-modal :active.sync="lightbox">
      <p class="image">
        <img :src="imageUrl">
      </p>
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
</style>
