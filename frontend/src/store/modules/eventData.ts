// import axios from '../../../node_modules/axios'
import axios from '../../axios-auth'
const state = {
    event: null,
    eventid: 0,
    site: null,
    buildingState: false,
    singleSite: null,
    floorMapViewState: false,
    floor: null,
    waveFormState: false,
    sensor: null,
    isArray: null,
    isLoading: false,
    eventRange: [20, 25, 119, 123],
    hoverid: 0
}
const getters = {
    event: (state) => state.event,
    targetEvent: (state) => {
        if (state.eventid === 0) {
            return '{ id: 0, latitude: 0, longitude: 0, date: "0000-00-00", time: "00:00:00", depth: 0, ML: 0 }'
        } else {
            return state.event.filter(event => event.id === state.eventid)[0]
        }
    },
    site: (state) => state.site,
    singleSiteName: (state) => state.singleSite,
    singleSite: (state) => {
        if (state.singleSite === null) {
            return '0'
        } else {
            return state.site[state.singleSite]
        }
    },
    sensor: (state) => state.sensor,
    floor: (state) => state.floor,
    buildingState: (state) => state.buildingState,
    floorMapViewState: (state) => state.floorMapViewState,
    waveFormState: (state) => state.waveFormState,
    isArray: (state) => state.isArray,
    isLoading: (state) => state.isLoading,
    stationInfo: (state) => state.site[state.singleSite].stations.filter(station => station.code === state.sensor)[0],
    eventRange: (state) => state.eventRange,
    hoverid: (state) => state.hoverid
}
const mutations = {
    getEvent (state, event) {
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
        state.buildingState = false,
        state.singleSite = null,
        state.floorMapViewState = false,
        state.floor = null,
        state.waveFormState = false,
        state.sensor = null,
        state.isArray = null,
        state.isLoading = false,
        state.hoverid = 0
    },
    clickEventList (state) {
        state.isArray = null,
        state.sensor = null,
        state.singleSite = null,
        state.floor = null
    },
    changeEventRange (state, eventRange) {
        state.eventRange = eventRange
    },
    changeHoverID (state, hoverid) {
        state.hoverid = hoverid
    }
}

const actions = {
    getDBEvent ({ commit }) {
        axios.post('', {
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
        axios.post('', {
            query: `query {
                pga(event:${eventid}){
                    station{
                        code
                        floor
                        rx
                        ry
                        InstrumentType
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
            const { code, floor, rx, ry, InstrumentType, building } = station
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
                InstrumentType,
                pga3comp
            })
            if (pga3comp > buidings[abbreviation].MAXpga) { buidings[abbreviation].MAXpga = pga3comp }
        })
        commit('getSite', buidings)
    }

}

export default {
    state,
    getters,
    mutations,
    actions
}
