import {
    createStore
} from 'vuex'
import axios from '../../node_modules/axios'

export default createStore({
    strict: true,
    state: {
        event: null
    },
    getters: {
        event: (state) => state.event
    },
    mutations: {
        getEvent (state, event) {
            state.event = event.event
        }
    },
    actions: {
        getDBEvent ({ commit }) {
            axios.post('http://140.109.82.44:8012/graphql/', {
                query: `query {
                    event (isOpen : true){
                        id
                        latitude
                        longitude
                        date
                        time
                        depth
                        ML
                    }
                }`
            }).then((response) => {
                commit('getEvent', response.data.data)
            }).catch((err) => { console.log('456 ', err) })
        }

    },

    modules: {
    }
})
