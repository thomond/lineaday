<template>
  <div class="hero">
    <div class="hero-body">
      <h1 class="title date">{{ todaysDate }}</h1>
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
  </div>
</template>

<script>
import moment from 'moment';
import { mapActions } from 'vuex'

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
      this.addLine(this.text);
      this.text = ''
    },
  },
  computed: {
    todaysDate() {
      return moment().format('MMMM D, YYYY');
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css?family=Reenie+Beanie');

.date {
  font-family: 'Reenie Beanie', cursive;
  font-size: 5rem;
  text-align: center;
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