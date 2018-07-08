<template>
  <router-link
    append
    :to="{ params: { tag: url } }"
    :class="classes">
    {{ omitHashtag ? '' : '#' }}{{ tag }}
  </router-link>
</template>

<script>
export default {
  name: 'TagLink',
  props: ['classes', 'omitHashtag', 'tag'],
  computed: {
    url() {
      return this.tag.replace('#', '')
    }
  }
};
</script>

<style scoped lang="scss">

</style>
