<template>
  <div class="form-container" v-if="!hasToday">
    <h1 class="title date fancy has-text-center-mobile">{{ todaysDate }}</h1>
    <form @submit.prevent="onSubmit" class="form">
      <b-field>
        <b-input
          expanded
          size="is-large"
          type="textarea"
          maxlength="140"
          :rows="rows"
          :placeholder="placeholder"
          :class="{ 'placeholder-colored': !expanded }"
          @focus="expanded = true"
          @blur="expanded = false"
          v-model="text"></b-input>
      </b-field>
      <b-field grouped position="is-right" v-if="expanded">
        <div class="control">
          <button class="button is-primary is-large" type="submit">
            Save
          </button>
        </div>
      </b-field>
    </form>
  </div>
</template>

<script>
import moment from 'moment';
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'LineForm',
  props: {},
  data() {
    return {
      expanded: false,
      placeholder: 'What do you want to say today?',
      text: '',
    };
  },
  methods: {
    ...mapActions([
      'addLine'
    ]),
    onSubmit(e) {
      e.preventDefault();
      if (this.text.length) {
        this.addLine(this.text);
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
      'hasToday'
    ]),
    rows() {
      return this.expanded ? 2 : 1
    },
    todaysDate() {
      return moment().format('MMMM D, YYYY');
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.form-container {
  min-height: 40vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  margin-bottom: 40px;
}

.date {
  font-size: 5rem;
}

.placeholder-colored {
  ::placeholder {
    color: #7957d5;
    opacity: 1;
  }
}

</style>
