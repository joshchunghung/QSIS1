import {
    createRouter, createWebHistory, RouteRecordRaw
} from 'vue-router'
import HomeView from '../views/welcomeView.vue'
import seisView from '../views/seisView.vue'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/seis',
        name: 'seis',
        component: seisView
    },
    {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('../views/aboutView.vue')
    },
    {
        path: '/network',
        name: 'network',
        component: () => import('../views/networkView.vue')
    },
    {
        path: '/dataDownload',
        name: 'dataDownload',
        component: () => import('../views/dataDownloadView.vue')
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('../views/registerView.vue')
    },
    {
        path: '/team',
        name: 'team',
        component: () => import('../views/teamView.vue')
    },
    {
        path: '/station',
        name: 'station',
        component: () => import('../views/stationView.vue')
    },
    {
        path: '/stationINFO',
        name: 'stationINFO',
        component: () => import('../views/stationInfoView.vue')
    },
    {
    // 亂打網址會被指回首頁
        path: '/:catchAll(.*)',
        name: 'redirect',
        redirect: '/'
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
