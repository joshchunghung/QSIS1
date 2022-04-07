import { createStore } from 'vuex'
import { event } from '../../public/data/event'
export default createStore({
  // strict: true,
  state: { event, eventID: '', siteID: '' },
  getters: {
    event: (state) => state.event,
    targetEvent: (state) => state.eventID,
    siteID: (state) => state.siteID,
    site: (state) => state.event[state.eventID - 1].site[state.siteID - 1]
  },
  mutations: {
    getEventID (state, eventID) {
      state.eventID = eventID
    },
    getSiteID (state, siteID) {
      state.siteID = siteID
    }
  },
  actions: {},
  modules: {}
})
