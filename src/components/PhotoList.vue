<template>
  <div>
    <div v-for="date in lines" :key="date[0]">
      <div>
        {{ date[0] }}
      </div>
      <div class="columns is-multiline is-mobile">
        <div class="column is-narrow" v-for="line in date[1]" :key="line.imageUrl">
          <image-with-lightbox
            :imageUrl="line.imageUrl"
            :thumbnail="true"
            :year="year(line)" />
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
    this.getLines({ tag: this.tag, imagesOnly: true })
  },
  computed: {
    ...mapGetters([
      'lines',
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
.columns {
  margin-bottom: 60px;
}
</style>
