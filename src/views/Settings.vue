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
          <b-message v-if="blockedInBrowser && sendNotifications">
            You have blocked notifications in your current browser.
            You will still receive notifications on other devices.
            Use the form to turn off all notifications on all devices.
          </b-message>
          <b-field grouped>
            <b-switch v-model="sendNotifications">
              {{ reminderText }}
            </b-switch>
            <b-select
              :class="{ time: true, invisible: !sendNotifications }"
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
                :class="buttonClasses"
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
import { mapGetters, mapActions } from 'vuex'
import { mapWaitingGetters } from 'vue-wait'
import range from 'lodash/range'
import moment from 'moment'

export default {
  name: 'Settings',
  data() {
    return {
      sendNotifications: true,
      reminderTime: 20,
      times: range(0, 24)
    }
  },
  mounted() {
    this.getUserSettings().then(({ reminderTime, sendNotifications }) => {
      this.sendNotifications = sendNotifications
      this.reminderTime = reminderTime
    })
  },
  computed: {
    ...mapGetters([
      'blockedInBrowser',
      'userEmail',
    ]),
    ...mapWaitingGetters({
      loading: 'user update',
    }),
    buttonClasses() {
      return {
        button: true,
        'is-loading': this.loading,
        'is-primary': true,
        'is-rounded': true
      }
    },
    reminderText() {
      if (this.sendNotifications) {
        return 'Send me daily reminders at'
      }

      return 'Do not send me any notifications'
    }
  },
  methods: {
    ...mapActions([
      'getUserSettings',
      'updateUserSettings'
    ]),
    formatTime(hour) {
      return moment()
        .utc()
        .startOf('day')
        .hour(hour)
        .local()
        .format('hh:mm a')
    },
    onSubmit() {
      this.updateUserSettings({
        sendNotifications: this.sendNotifications,
        reminderTime: this.reminderTime
      })
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

