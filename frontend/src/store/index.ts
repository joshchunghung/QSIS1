import {
    event
} from './../../public/data/event'
/* eslint-disable no-unused-expressions */
import {
    createStore
} from 'vuex'
import axios from '../../node_modules/axios'

export default createStore({
    strict: true,
    state: {
        event: null,
        eventid: 0,
        site: null,
        buildingState: null,
        singleSite: null,
        floorMapViewState: null,
        floor: null,
        waveFormState: null,
        sensor: null,
        isArray: null,
        isLoading: false,
        sortType: 'Event',
        isReverse: false
    },
    getters: {
        event: (state) => state.event,
        targetEvent: (state) => state.event.filter(event => event.id === state.eventid)[0],
        site: (state) => state.site,
        buildingState: (state) => state.buildingState,
        singleSiteName: (state) => state.singleSite,
        singleSite: (state) => state.site[state.singleSite],
        floorMapViewState: (state) => state.floorMapViewState,
        floor: (state) => state.floor,
        waveFormState: (state) => state.waveFormState,
        sensor: (state) => state.sensor,
        isArray: (state) => state.isArray,
        isLoading: (state) => state.isLoading,
        stationInfo: (state) => state.site[state.singleSite].stations.filter(station => station.code === state.sensor)[0]
    },
    mutations: {
        getEvent (state, event) {
            // 按照時間排列
            event.sort((a, b) => {
                const timeA = `${a.date.replaceAll('-', '/')} ${a.time}`
                const timeB = `${b.date.replaceAll('-', '/')} ${b.time}`
                return new Date(timeB).getTime() - new Date(timeA).getTime()
            })
            state.event = event
        },
        getEventID (state, eventID) {
            state.eventid = eventID
        },
        getSite (state, site) {
            state.site = site
        },
        getSingleSite (state, name) {
            state.isArray = state.site[name].isArray
            if (state.isArray) {
                state.singleSite = name
                state.sensor = null
            } else {
                state.singleSite = name
                state.floor = null
                state.sensor = name
            }
        },
        getSensor (state, name) {
            state.sensor = name
        },
        changeBuildingState (state, isOpen) {
            state.buildingState = isOpen
        },
        changeFloorMapViewState (state, isOpen) {
            state.floorMapViewState = isOpen
        },
        getFloor (state, floor) {
            state.floor = floor
        },
        changeWaveFormState (state, isOpen) {
            state.waveFormState = isOpen
        },
        changeLoading (state, isLoading) {
            state.isLoading = isLoading
        },
        Orginal (state) {
            state.eventid = 0,
            state.site = null,
            state.buildingState = null,
            state.singleSite = null,
            state.floorMapViewState = null,
            state.floor = null,
            state.waveFormState = null,
            state.sensor = null,
            state.isArray = null,
            state.isLoading = false
        },
        sortEventByType (state, { type, order }) {
            if (type !== 'Event') {
                state.event.sort((a, b) => {
                    return (b[type] - a[type]) * order
                })
            } else {
                state.event.sort((a, b) => {
                    const timeA = `${a.date.replaceAll('-', '/')} ${a.time}`
                    const timeB = `${b.date.replaceAll('-', '/')} ${b.time}`
                    return (new Date(timeB).getTime() - new Date(timeA).getTime()) * order
                })
            }
        }

    },
    actions: {
        getDBEvent ({ commit }) {
            axios.post('http://140.109.82.44:8000/graphql/', {
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
                commit('getEvent', response.data.data.event)
            }).catch((err) => { console.log(err) })
        },
        getDBStation ({ dispatch, commit }, eventid) {
            commit('getEventID', eventid)
            axios.post('http://140.109.82.44:8000/graphql/', {
                query: `query {
                    pga(event:${eventid}){
                        station{
                            code
                            floor
                            rx
                            ry
                            building{
                            abbreviation
                            latitude
                            longitude
                            basement
                            floor
                            isArray
                            }
                        }
                        pga3comp
                        }
                    }
                    `
            }).then((response) => {
                dispatch('filterPGA', response.data.data.pga)
            }).catch((err) => { console.log(err) })
        },
        filterPGA ({ commit }, pga) {
            const buidings = {
            }
            pga.forEach(({ station, pga3comp }) => {
                const MAXpga = -1
                const { code, floor, rx, ry, building } = station
                const { abbreviation, latitude, longitude, basement, floor: height, isArray } = building
                if (!buidings[abbreviation]) {
                    buidings[abbreviation] = {
                        latitude,
                        longitude,
                        MAXpga,
                        height,
                        basement,
                        isArray,
                        stations: []
                    }
                }
                buidings[abbreviation].stations.push({
                    code,
                    floor,
                    rx,
                    ry,
                    pga3comp
                })
                if (pga3comp > buidings[abbreviation].MAXpga) { buidings[abbreviation].MAXpga = pga3comp }
            })
            commit('getSite', buidings)
        }

    },

    modules: {
    }
})
