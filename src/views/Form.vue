<template>
  <div>
    <p class="date">{{ todaysDate }}</p>
    <el-form ref="form" :model="form" @submit.native="onSubmit" class="form">
      <el-form-item class="text-input">
        <el-input
          maxlength="140"
          placeholder="What do you have to say today?"
          v-model="form.text"></el-input>
      </el-form-item>
      <el-form-item class="submit-button">
        <el-button round native-type="submit">Save</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'Form',
  props: {},
  data() {
    return {
      form: {
        text: '',
      },
    };
  },
  methods: {
    onSubmit(e) {
      e.preventDefault();
      console.log('submit!', this.form.text);
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
  font-size: 48px;
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
