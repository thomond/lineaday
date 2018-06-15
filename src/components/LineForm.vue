<template>
  <form @submit.prevent="onSubmit" class="form">
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
import { mapGetters } from 'vuex'
import { getTagsFromLine } from '@/util'

export default {
  name: 'LineForm',
  props: ['handleBlur', 'handleSubmit'],
  data() {
    return {
      expanded: false,
      placeholder: 'What do you want to say today?',
      text: '',
    };
  },
  mounted() {
    if (this.getEditingLine) {
      this.text = this.getEditingLine.text
      this.expanded = true
      this.$refs.textBox.focus()
    }
  },
  methods: {
    onBlur(e) {
      if (e.relatedTarget === this.$refs.submitButton) {
        this.onSubmit()
      }
      this.expanded = false

      if (this.handleBlur) {
        this.handleBlur(this.text)
      }
    },
    onSubmit() {
      if (this.text.length) {
        this.handleSubmit({ text: this.text, tags: this.tags });
        this.text = ''
      } else {
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
      'getEditingLine'
    ]),
    tags() {
      return getTagsFromLine(this.text)
    },
    rows() {
      let rows = 2
      if (this.$mq.above(this.$mv.mobile)) {
        rows = 1
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
