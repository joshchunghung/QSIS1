/* eslint-disable no-unused-expressions */
import {
    createStore
} from 'vuex'
import eventData from './modules/eventData'
import register from './modules/register'

export default createStore({
    strict: true,
    state: {
    },
    getters: {
    },
    mutations: {
    },
    actions: {
    },

    modules: {
        eventData,
        register
    }
})
