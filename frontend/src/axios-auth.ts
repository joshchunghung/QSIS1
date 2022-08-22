import axios from '../node_modules/axios'
import store from './store/index'

const instance = axios.create({
    baseURL: 'http://140.109.82.44:8000/graphql/',
    headers: {
        'Content-Type': 'application/json'
    }
})
// https://israynotarray.com/nodejs/20210527/2874571028/
// instance.defaults.xsrfCookieName = 'XSRF-TOKEN' // 名稱請與儲存在 cookies 相同，axios 預設是 'XSRF-TOKEN'
// instance.defaults.xsrfHeaderName = 'X-XSRF-TOKEN' // 這一個主要是請求時，會帶在 header 的名稱，建議與後端溝通，有些後端接收是接收 XSRF-TOKEN，axios 預設是 'X-XSRF-TOKEN'

// Reference for loader
// https://www.youtube.com/watch?v=scEfxXINTCo

// Add a request interceptor
instance.interceptors.request.use(x => {
    // Do something before request is sent
//   store.commit('LOADER', true)
    // const JWT = store.getters.getJWT
    // JWT && (x.headers.Authorization = 'JWT ' + JWT)
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
