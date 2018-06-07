<template>
  <div>
    <h1>Today is {{ todaysDate }}</h1>
    <el-form ref="form" :model="form" @submit="onSubmit">
      <el-form-item>
        <el-input placeholder="What do you have to say today?" v-model="form.text"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button round type="submit">Save</el-button>
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
    onSubmit() {
      console.log('submit!');
    },
  },
  computed: {
    todaysDate() {
      return moment().format('MMMM Do, YYYY');
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
