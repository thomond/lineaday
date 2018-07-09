<template>
  <div>
    <div v-for="date in linesWithImages" :key="date[0]" class="date">
      <p class="title is-6 fancy">
        {{ date[0] }}
      </p>
      <div class="lines">
        <div
          v-if="line.imageUrl"
          :style="lineStyle(date[1])"
          v-for="line in date[1]"
          :key="line.imageUrl">
          <div :style="thumbnailStyle(date[1])" class="thumbnail">
            <img :src="line.imageUrl" @click="lightboxImageUrl = line.imageUrl" />
          </div>
        </div>
      </div>
    </div>
    <b-modal :active="!!lightboxImageUrl" @close="handleLightboxClose" class="lightbox">
      <img :src="lightboxImageUrl" />
    </b-modal>
    <b-loading :active="linesAreLoading"></b-loading>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { getYearForLine } from '@/util'
import Entry from './Entry.vue'
import ImageWithLightbox from './ImageWithLightbox.vue'

export default {
  name: 'PhotoList',
  props: ['tag'],
  components: {
    Entry,
    ImageWithLightbox,
  },
  data() {
    return {
      lightboxImageUrl: null,
    }
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
    lineStyle: () => lines => ({
      width: `${(1 / Math.min(lines.length, 5)) * 100}%`
    }),
    thumbnailStyle: () => lines => ({
      paddingBottom: lines.length > 1 ? '100%' : '25%',
    }),
    year: () => getYearForLine
  },
  methods: {
    ...mapActions([
      'getLines'
    ]),
    handleLightboxClose() {
      this.lightboxImageUrl = null
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.lines {
  display: flex;
  flex-wrap: wrap;
}

.line {
  flex: .25;
}

img {
  &:hover {
    cursor: pointer;
  }
}

.thumbnail {
  overflow: hidden;
  padding-bottom: 100%;
  position: relative;
  width: 100%;
}

.thumbnail img {
  height: 100%;
  object-fit: cover;
  position: absolute;
  width: 100%;
}

.title {
  margin: 20px 0 5px;
}

</style>
