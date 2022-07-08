import axios from '../node_modules/axios'
import store from './store/index'
// import {
//   useStore
// } from 'vuex'

// const store = useStore()

const instance = axios.create({
    baseURL: 'http://140.109.82.44:8001/graphql/',
    headers: {
        'Content-Type': 'application/json'
    }
})

// Reference for loader
// https://www.youtube.com/watch?v=scEfxXINTCo

// Add a request interceptor
instance.interceptors.request.use(x => {
    // Do something before request is sent
//   store.commit('LOADER', true)
    const JWT = store.getters.getJWT
    JWT && (x.headers.Authorization = 'JWT ' + JWT)
    return x
}, function (error) {
    // Do something with request error
//   store.commit('LOADER', false)
    return Promise.reject(error)
})

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
//   store.commit('LOADER', false)
    return response
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
//   store.commit('LOADER', false)
    // console.log('ERROR in response')
    return Promise.reject(error)
})

export default instance
