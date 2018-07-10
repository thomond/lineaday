<template>
  <form @submit.prevent="debouncedOnSubmit" class="form">
    <b-field>
      <b-input
        expanded
        size="is-large"
        type="textarea"
        maxlength="280"
        ref="textBox"
        :rows="rows"
        :placeholder="placeholder"
        :class="{ 'placeholder-colored': !expanded }"
        @focus="expanded = true"
        @blur="onBlur"
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
import debounce from 'lodash/debounce'
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
      text: '',
    };
  },
  mounted() {
    if (this.getEditingLine) {
      this.text = this.getEditingLine.text
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
    onBlur(e) {
      if (e.relatedTarget === this.$refs.submitButton) {
        this.debouncedOnSubmit()
      }

      if (!this.alwaysExpanded) {
        this.expanded = false
      }

      if (this.handleBlur) {
        this.handleBlur(this.text)
      }
    },
    // vue sucks
    // eslint-disable-next-line func-names
    debouncedOnSubmit: debounce(function () {
      this.onSubmit()
    }, 1000),
    onSubmit() {
      if (this.text.length) {
        this.handleSubmit({ text: this.text, tags: this.tags });
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

</style>
