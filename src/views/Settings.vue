<template>
  <div class="container">
    <div class="columns">
      <div class="column is-three-fifths is-offset-one-fifth">
        <h1 class="title is-2 fancy is-spaced">Settings</h1>
        <h2 class="subtitle is-5">Account</h2>
        <b-field label="Email">
          <b-input :value="userEmail" disabled></b-input>
        </b-field>
        <hr />
        <v-wait for='get user settings'>
          <notification-settings />
        </v-wait>
        <hr />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import NotificationSettings from '@/components/NotificationSettings.vue'

export default {
  name: 'Settings',
  components: {
    NotificationSettings
  },
  computed: {
    ...mapGetters([
      'userEmail',
    ]),
  },
};
</script>

<style scoped lang="scss">
.container {
  padding: 0 20px;
}
</style>

