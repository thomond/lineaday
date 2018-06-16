const initialState = {
  showNotificationBanner: null
}

const getters = {
  showNotificationBanner: state => state.showNotificationBanner,
}

const mutations = {
  toggleNotificationBanner(state, payload) {
    if (payload) {
      state.showNotificationBanner = payload
    } else {
      state.showNotificationBanner = !state.showNotificationBanner
    }
  }
}

export default {
  state: initialState,
  getters,
  mutations
}
