<template>
   <b-notification type="is-primary" :closable="false" :active="showNotificationBanner">
    <div class="container">
      <div class="columns">
        <div class="column">
          <p class="title is-5">Would you like to receive reminders to write down your thoughts?</p>
          <p class="subtitle is-6">Notification preferences can always be changed later
          in your <router-link to="/settings">User Settings</router-link>.</p>
        </div>
        <div class="column is-narrow">
          <button @click="yes" class="button is-primary is-inverted is-outlined">
            Yes, please!
          </button>
          <button @click="no" class="button is-primary is-inverted is-outlined right">
            No, thank you
          </button>
        </div>
      </div>
    </div>
  </b-notification>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'


export default {
  name: 'NotificationBanner',
  computed: {
    ...mapGetters([
      'showNotificationBanner',
    ]),
  },
  methods: {
    ...mapActions([
      'requestMessagingPermission',
      'updateUserSettings'
    ]),
    ...mapMutations([
      'toggleNotificationBanner',
    ]),
    no() {
      this.toggleNotificationBanner()
      this.updateUserSettings({ sendNotifications: false })
    },
    yes() {
      this.toggleNotificationBanner()
      this.requestMessagingPermission({ notify: true })
    }
  }
};
</script>

<style scoped lang="scss">
.right {
  margin-left: 20px;
}

</style>

