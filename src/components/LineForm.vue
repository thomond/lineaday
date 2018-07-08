<template>
  <form @submit.prevent="onSubmit" class="form" v-click-outside="onBlur">
    <div class="has-text-right" v-if="expanded">
      <b-upload
        @input="handleFileUpload"
        accept="image/*"
        v-model="imageFile"
        v-if="!imageFile && !imageSrc">
        <b-tooltip
          label="Add a photo or gif"
          position="is-bottom"
          type="is-dark">
          <a class="button has-text-primary is-text">
            <b-icon icon="image" pack="far"></b-icon>
          </a>
        </b-tooltip>
      </b-upload>
    </div>
    <b-field>
      <b-input
        expanded
        size="is-large"
        type="textarea"
        maxlength="140"
        ref="textBox"
        :rows="rows"
        :placeholder="placeholder"
        :class="{ 'placeholder-colored': !expanded }"
        @focus="expanded = true"
        v-model="text"></b-input>
        <p class="help" v-if="expanded">
          <span v-if="tags.length">
            <span class="has-text-primary hashtag"
              v-for="tag in tags"
              :key="tag">#{{ tag }}</span>
          </span>
          <span v-else>
            Hint: type <b-tag rounded>#tag</b-tag> to
            add <span class="has-text-primary">#tag</span> to your post.
          </span>
        </p>
    </b-field>
    <div class="file" v-if="expanded">
      <b-notification
        class="image-preview"
        v-if="imageFile || imageSrc"
        :active="true"
        @close="clearImageFile">
        <img :src="imageSrc" v-if="imageSrc" />
        <b-loading :is-full-page="false" :active="true" v-else></b-loading>
      </b-notification>
    </div>
    <b-field grouped position="is-right" v-if="expanded">
      <div class="control">
        <button
          ref="submitButton"
          class="button is-primary is-large is-rounded"
          type="submit">
          Save
        </button>
      </div>
    </b-field>
  </form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { getTagsFromLine } from '@/util'

export default {
  name: 'LineForm',
  props: [
    'alwaysExpanded',
    'handleBlur',
    'handleSubmit',
    'hidePlaceholder',
    'tall'
  ],
  data() {
    return {
      expanded: this.alwaysExpanded,
      imageSrc: null,
      imageFile: null,
      text: '',
    };
  },
  mounted() {
    if (this.getEditingLine) {
      this.text = this.getEditingLine.text
      this.imageSrc = this.getEditingLine.imageUrl
      this.expanded = true
      this.$refs.textBox.focus()
    } else if (!this.hidePlaceholder) {
      this.getPrompts()
    }

    if (this.alwaysExpanded) {
      this.$refs.textBox.focus()
    }
  },
  methods: {
    ...mapActions([
      'getPrompts'
    ]),
    clearImageFile() {
      this.imageFile = null
      this.imageSrc = null
    },
    handleFileUpload() {
      if (this.imageFile) {
        if (!this.imageFile[0].type.match('image/')) {
          this.$toast.open({
            message: 'File must be an image.',
            position: 'is-bottom',
            type: 'is-danger'
          })

          this.clearImageFile()
        } else {
          this.generatePreviewImage()
        }
      }
    },
    generatePreviewImage() {
      const reader = new FileReader()
      reader.onload = (e) => {
        this.imageSrc = e.target.result
      }
      reader.readAsDataURL(this.imageFile[0])
    },
    onBlur() {
      if (!this.alwaysExpanded) {
        this.expanded = false
      }

      if (this.handleBlur) {
        this.handleBlur(this.text)
      }
    },
    onSubmit() {
      if (this.text.length || this.imageFile) {
        this.handleSubmit({
          image: this.imageFile,
          imageUrl: this.imageSrc,
          text: this.text,
          tags: this.tags
        });
      } else {
        this.$refs.textBox.focus()
        this.$toast.open({
          message: "You've got to say something!",
          position: 'is-bottom',
          type: 'is-primary'
        })
      }
    },
  },
  computed: {
    ...mapGetters([
      'getEditingLine',
      'prompt',
      'promptsAreLoading'
    ]),
    imageUploadText() {
      if (this.$md.isMobile) {
        return 'Tap to upload image'
      }
      return 'Drop your image here or click to upload'
    },
    placeholder() {
      if (this.promptsAreLoading || this.hidePlaceholder) {
        return ''
      }

      return this.prompt
    },
    tags() {
      return getTagsFromLine(this.text)
    },
    rows() {
      let rows = this.tall ? 3 : 2
      if (this.$mq.above(this.$mv.mobile)) {
        rows -= 1
      }
      return this.expanded ? rows + 1 : rows
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.placeholder-colored {
  ::placeholder {
    color: #7957d5;
    opacity: 1;
  }
}

.field.has-addons {
  display: block;

  .is-clearfix::after {
    clear: none;
  }
}

p.help {
  margin-top: .35rem;
}

.hashtag {
  margin-right: 3px;
}

.file {
  justify-content: stretch;
  padding: 10px 0;
}

.image-preview {
  p,
  img {
    max-width: 150px;
  }
}

a.button.is-text {
  text-decoration: none;
}
</style>
