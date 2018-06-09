<template>
  <div class="form-container" v-if="!hasToday">
    <h1 class="title date fancy">{{ todaysDate }}</h1>
    <form ref="form" @submit.prevent="onSubmit" class="form">
      <b-field>
        <b-input
          expanded
          size="is-large"
          maxlength="140"
          placeholder="What do you have to say today?"
          v-model="text"></b-input>
        <p class="control">
          <button class="button is-primary is-large" type="submit">
            Save
          </button>
        </p>
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
}

.date {
  font-size: 5rem;
}

.form {
  align-items: stretch;
  display: flex;
  flex-direction: column;

  .submit-button {
    align-self: flex-end;
  }
}
</style>
