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
            <div class="is-6 caption">
              <span class="year">{{ year(line) }}</span>
              <tag-link
                v-for="(value, tag) in line.tags"
                :tag="tag"
                :key="tag"
                classes="has-text-white" />
            </div>
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
import TagLink from './TagLink.vue'

export default {
  name: 'PhotoList',
  props: ['tag'],
  components: {
    TagLink
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
    lineStyle: () => lines => {
      const numImages = lines.filter(line => !!line.imageUrl).length
      return {
        width: `${(1 / Math.min(numImages, 5)) * 100}%`
      }
    },
    thumbnailStyle: () => lines => {
      const numImages = lines.filter(line => !!line.imageUrl).length
      return {
        paddingBottom: numImages > 1 ? '100%' : '25%',
      }
    },
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

.caption {
  background-color: #000;
  color: #fff;
  opacity: .5;
  position: absolute;
  bottom: 0;
  padding: 0 5px;
  left: 0;
  right: 0;
  z-index: 1;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

</style>
