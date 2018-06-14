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
        <form @submit.prevent="onSubmit">
          <h2 class="subtitle is-5">Notifications</h2>
          <b-field grouped>
            <b-switch v-model="sendReminders">
              {{ reminderText }}
            </b-switch>
            <b-select
              :class="{ time: true, invisible: !sendReminders }"
              v-model="reminderTime"
              icon="clock"
              icon-pack="fas">
              <option :value="time" :key="time" v-for="time in times">
                {{ formatTime(time) }}
              </option>
            </b-select>
          </b-field>
          <b-field grouped position="is-right">
            <div class="control">
              <button
                class="button is-primary is-rounded"
                type="submit">
                Save
              </button>
            </div>
          </b-field>
        </form>
        <hr />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import range from 'lodash/range'
import moment from 'moment'

export default {
  name: 'Settings',
  data() {
    return {
      sendReminders: true,
      reminderTime: 20,
      times: range(0, 23)
    }
  },
  computed: {
    ...mapGetters([
      'userEmail'
    ]),
    reminderText() {
      if (this.sendReminders) {
        return 'Send me daily reminders at'
      }

      return 'Do not send me any notifications'
    }
  },
  methods: {
    formatTime(hour) {
      return moment().startOf('day').hour(hour).format('hh:mm a')
    },
    onSubmit() {
      console.log('submitted!')
    }
  }
};
</script>

<style scoped lang="scss">
.invisible {
  visibility: hidden;
}

.time {
  margin-left: 10px;
}
</style>

