<template>
  <div class="container">
    <line-form />
    <list />
  </div>
</template>

<script>
import LineForm from '@/components/LineForm.vue';
import List from '@/components/List.vue';

export default {
  name: 'home',
  components: {
    LineForm,
    List
  },
};
</script>
