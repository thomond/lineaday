<template>
  <div>
    <el-card>
      <h1>Sign up</h1>
      <el-form
        ref="form"
        @submit.native="onSubmit"
        label-position="left"
        label-width="150px">
        <el-form-item label="Email">
          <el-input v-model="email" type="email" autoComplete="email"></el-input>
        </el-form-item>
        <el-form-item label="Password">
          <el-input v-model="password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="Confirm Password">
          <el-input v-model="passwordConfirm" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button round native-type="submit" :disabled="loading">Sign up</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'SignUp',
  data() {
    return {
      email: '',
      password: '',
      passwordConfirm: ''
    }
  },
  computed: {
    ...mapGetters([
      'loading'
    ]),
    passwordConfirmed() {
      return this.password === this.passwordConfirm
    }
  },
  methods: {
    ...mapActions([
      'userEmailSignUp'
    ]),
    onSubmit(e) {
      e.preventDefault()
      if (this.email.length && this.password.length && this.passwordConfirmed) {
        this.userEmailSignUp({ email: this.email, password: this.password })
      }
    }
  }
}
</script>
