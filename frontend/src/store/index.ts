import {
    createStore
} from 'vuex'
import {
    event
} from '../../public/data/event'

import axios from '../../node_modules/axios'

export default createStore({
    strict: true,
    state: {
        event,
        eventID: 0,
        siteID: 0
    },
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
    actions: {
        getTest (context) {
            axios.post('http://140.109.82.44:8012/graphql/', {
                query: `query {
                    building (name: "地球"){
                      id,
                      name,
                    },
                      event (isOpen : true){
                      latitude
                      longitude
                      isOpen
                    }
                  }`
            }).then((response) => {
                console.log('123 ', response.data)
            }).catch((err) => { console.log('456 ', err) })
        }

    },

    modules: {
    }
})
