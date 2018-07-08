<template>
  <div>
    <div v-for="date in linesWithImages" :key="date[0]" class="date message">
      <div class="message-body">
        <p class="title is-6 fancy">
          {{ date[0] }}
        </p>
        <div class="columns is-multiline is-mobile">
          <div
            v-if="line.imageUrl"
            class="column is-narrow"
            v-for="line in date[1]"
            :key="line.imageUrl">
            <image-with-lightbox
              :imageUrl="line.imageUrl"
              :tags="line.tags"
              :thumbnail="true"
              :year="year(line)" />
          </div>
        </div>
      </div>
    </div>
    <b-loading :active="linesAreLoading"></b-loading>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { getYearForLine } from '@/util'
import ImageWithLightbox from './ImageWithLightbox.vue'

export default {
  name: 'PhotoList',
  props: ['tag'],
  components: {
    ImageWithLightbox,
  },
  mounted() {
    this.getLines({ tag: this.tag })
  },
  computed: {
    ...mapGetters([
      'linesWithImages',
      'linesAreLoading',
      'promptsAreLoading'
    ]),
    year: () => getYearForLine
  },
  methods: {
    ...mapActions([
      'getLines'
    ]),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.date {
  margin: 20px 0;
}
</style>
