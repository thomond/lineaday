<template>
  <div>
    <el-card>
      <h1>Sign in</h1>
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
        <el-form-item>
          <el-button round native-type="submit" :disabled="loading">Sign In</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'SignIn',
  data() {
    return {
      email: '',
      password: '',
    }
  },
  computed: {
    ...mapGetters([
      'loading'
    ]),
  },
  methods: {
    ...mapActions([
      'userEmailSignIn'
    ]),
    onSubmit(e) {
      e.preventDefault()
      if (this.email.length && this.password.length) {
        this.userEmailSignIn({ email: this.email, password: this.password })
      }
    }
  }
}
</script>
