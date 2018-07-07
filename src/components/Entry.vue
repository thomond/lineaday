<template>
  <div class="message">
    <div class="message-body">
      <p class="title is-6 fancy">
        {{ date }}
      </p>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Entry',
  props: ['date'],
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.message {
  margin: 30px 0;
}
</style>
