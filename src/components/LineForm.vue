<template>
  <form @submit.prevent="onSubmit" class="form" v-click-outside="onBlur">
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
    <b-field class="file" v-if="expanded">
      <transition name="fade" mode="out-in">
        <b-notification
          class="image-preview"
          v-if="imageSrc"
          :active="true"
          @close="deleteImageFile">
          <img :src="imageSrc" v-if="imageSrc" />
        </b-notification>
        <b-upload
          accept="image/*"
          v-model="imageFile"
          drag-drop
          @input="generatePreviewImage"
          v-else>
          <div class="content has-text-centered">
            <p>Drop your image here or click to upload</p>
          </div>
        </b-upload>
      </transition>
    </b-field>
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
    deleteImageFile() {
      this.imageFile = null
      this.imageSrc = null
    },
    generatePreviewImage() {
      if (this.imageFile && this.imageFile[0].type === 'image/png') {
        const reader = new FileReader();
        reader.onload = (e) => { this.imageSrc = e.target.result };
        reader.readAsDataURL(this.imageFile[0]);
      }
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

  label {
    width: 100%;

  }

  .content {
    padding: 10px;
  }
}

.image-preview {
  p,
  img {
    max-width: 150px;
  }
}
</style>
