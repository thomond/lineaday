import bugsnag from 'bugsnag-js'

const bugsnagClient = bugsnag(process.env.VUE_APP_BUGSNAG_ID)

export default bugsnagClient
