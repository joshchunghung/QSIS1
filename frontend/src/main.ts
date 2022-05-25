import {
    createApp, provide, h
} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

// vue - apollo graphql
import {
    ApolloClient, createHttpLink, InMemoryCache
} from '@apollo/client/core'
import {
    DefaultApolloClient
} from '@vue/apollo-composable'
// HTTP connection to the API
const httpLink = createHttpLink({
    // You should use an absolute URL here
    uri: 'http://0.0.0.0:8000/graphql/'
})

// Cache implementation
const cache = new InMemoryCache()

// Create the apollo client
const apolloClient = new ApolloClient({
    link: httpLink,
    cache
})

const app = createApp({
    setup() {
        provide(DefaultApolloClient, apolloClient)
    },

    render: () => h(App)
})

app.use(store).use(router).mount('#app')
