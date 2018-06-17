<template>
  <form @submit.prevent="onSubmit">
    <h2 class="subtitle is-5">Notifications</h2>
    <b-message v-if="blockedInBrowser && sendNotifications">
      You have blocked notifications in your current browser.
      You will still receive notifications on other devices.
      Use the form to turn off all notifications on all devices.
    </b-message>
    <div class="columns">
      <div class="column is-narrow">
        <b-field>
          <b-switch v-model="sendNotifications">
            {{ reminderText }}
          </b-switch>
        </b-field>
      </div>
      <div class="column">
        <b-field>
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
      </div>
    </div>
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
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { mapWaitingGetters } from 'vue-wait'
import range from 'lodash/range'
import moment from 'moment'

export default {
  name: 'NotificationSettings',
  data() {
    return {
      times: range(0, 24)
    }
  },
  computed: {
    ...mapGetters([
      'blockedInBrowser',
    ]),
    ...mapWaitingGetters({
      loading: 'user update',
    }),
    sendNotifications: {
      get() {
        return this.$store.state.auth.settings.sendNotifications
      },
      set(value) {
        this.$store.commit('modifyUserSettings', { sendNotifications: value })
      }
    },
    reminderTime: {
      get() {
        return this.$store.state.auth.settings.reminderTime
      },
      set(value) {
        this.$store.commit('modifyUserSettings', { reminderTime: value })
      }
    },
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

