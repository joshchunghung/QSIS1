// import axios from '../../axios-auth'
import axios from '../../../node_modules/axios'
import {
    print
} from 'graphql'
import gql from 'graphql-tag'

// mutation
const REGISTER_USER = gql`
    mutation register(
        $username: String!
        $email: String!
        $password1: String! 
        $password2: String!
        ){register(   
            email:$email,
            username:$username,
            password1:$password1,
            password2:$password2
        ){
        success,
        errors
        }
}`

// vuex store
const state = {
}
const getters = {
}
const mutations = {
}
const actions = {
    createUser ({ commit }, formData) {
        // console.log( print(REGISTER_USER))
        axios.post('http://140.109.82.44:8001/graphql/', {
            query: print(REGISTER_USER),
            variables: {
                email: formData.email,
                username: formData.username,
                password1: formData.password1,
                password2: formData.password2
            }
        })
            .then((response) => console.log(response))
            .catch((err) => { console.log(123456, err) })
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}
