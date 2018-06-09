<template>
  <div class="container has-text-centered">
    <h1 class="title is-1 fancy">Uh oh!</h1>
    <h2 class="subtitle is-3">There is nothing here.</h2>
    <router-link to="/">Back to my journal</router-link>
  </div>
</template>

<script>

export default {
  name: 'NotFound',
};
</script>

<style scoped lang="scss">
.is-1 {
  font-size: 5rem;
}
</style>

