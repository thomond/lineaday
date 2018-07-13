<template>
  <div class="has-text-centered down-arrow">
    <a
      :class="buttonClasses"
      :href="link"
      v-smooth-scroll="{ duration: 600, offset: -50 }">
      <span v-if="text">{{ text }}</span>
      <b-icon
        v-else
        icon="chevron-down"
        :custom-class="iconClasses"
        size="is-medium"></b-icon>
    </a>
  </div>
</template>

<script>
export default {
  name: 'DownArrow',
  props: {
    anchor: {
      type: String
    },
    classes: {
      default: () => {},
      type: Object
    },
    isPrimary: {
      type: Boolean
    },
    text: {
      type: String,
    }
  },
  computed: {
    link() {
      return `#${this.anchor}`
    },
    iconClasses() {
      return `pulse animated infinite ${this.isPrimary ? 'has-text-primary' : 'has-text-light'}`
    },
    buttonClasses() {
      return {
        button: !!this.text,
        'is-primary': !!this.text,
        'is-outlined': !!this.text,
        ...this.classes
      }
    }
  }
};
</script>

<style scoped lang="scss">
.down-arrow {
  margin-bottom: 20px;
}
</style>
