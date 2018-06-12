<template>
  <div>
    <span class="subtitle is-6 has-text-grey">{{ year }}</span>
    <div>
      <span v-for="(word, index) in words" :key="index">
        <span v-if="word.startsWith('#')">
          <router-link class="has-text-primary link" :to="url(word)">
            {{ word }}
          </router-link>
        </span>
        <span v-else>{{ word }}</span>
      </span>
    </div>
  </div>
</template>

<script>
import { tagToUrl } from '@/util'

export default {
  name: 'LineDisplay',
  props: ['text', 'year'],
  computed: {
    url: () => tagToUrl,
    words() {
      return this.text.split(' ')
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
span {
  margin: 1px;
}

.message a.link {
  text-decoration: none;
}
</style>
