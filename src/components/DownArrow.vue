<template>
  <div class="has-text-centered">
    <a :href="link" v-smooth-scroll="{ duration: 600, offset: -50 }">
      <b-icon
        icon="chevron-down"
        :custom-class="classes"
        size="is-medium"></b-icon>
    </a>
  </div>
</template>

<script>
export default {
  name: 'DownArrow',
  props: ['anchor', 'isPrimary'],
  computed: {
    link() {
      return `#${this.anchor}`
    },
    classes() {
      return `pulse animated infinite ${this.isPrimary ? 'has-text-primary' : 'has-text-light'}`
    }
  }
};
</script>
