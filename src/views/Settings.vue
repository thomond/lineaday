<template>
  <div class="container">
    <div class="columns">
      <div class="column is-three-fifths is-offset-one-fifth">
        <h1 class="title is-2 fancy is-spaced">Settings</h1>
        <h2 class="subtitle is-5">Account</h2>
        <div class="account-option">
          <h3 class="title is-6">Email</h3>
          <div class="subtitle is-6">{{ userEmail }}</div>
        </div>
        <div class="account-option">
          <subscription-settings
            :loading="subscriptionIsLoading"
            :subscription="userSettings.subscription" />
        </div>
        <hr />
        <notification-settings />
        <hr />
        <div v-if="lines.length">
          <h2 class="subtitle is-5">Backup</h2>
          <button class="button is-primary is-rounded" @click="generateCsv">Download CSV</button>
          <a class="download-link" ref="downloadLink" :download="filename" :href="csvUrl"></a>
          <hr />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import moment from 'moment'
import Papa from 'papaparse'
import NotificationSettings from '@/components/NotificationSettings.vue'
import SubscriptionSettings from '@/components/SubscriptionSettings.vue'

export default {
  name: 'Settings',
  components: {
    NotificationSettings,
    SubscriptionSettings
  },
  data() {
    return {
      csvUrl: '',
    }
  },
  mounted() {
    if (!this.lines.length) {
      this.getLines()
    }
  },
  computed: {
    ...mapGetters([
      'lines',
      'subscriptionIsLoading',
      'userEmail',
      'userSettings'
    ]),
    filename() {
      return `tinythoughts_backup_${moment().format()}`
    }
  },
  methods: {
    ...mapActions(['getLines']),
    generateCsv() {
      const lines = this.lines.reduce((acc, [date, entries]) => {
        const newLines = entries.map(line =>
          ({ date: `${date}, ${line.years}`, text: line.text }))
        return [...acc, ...newLines]
      }, [])
      const csvContent = Papa.unparse(lines)
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
      this.csvUrl = URL.createObjectURL(blob)
      if (navigator.msSaveBlob) { // 💩
        navigator.msSaveBlob(blob, this.filename)
      } else {
        this.$nextTick(() => {
          this.$refs.downloadLink.click()
        })
      }
    }
  }
};
</script>

<style scoped lang="scss">
.container {
  padding: 0 20px;
}

.download-link {
  visibility: hidden;
}

.account-option {
  margin: 20px 0;
}
</style>

