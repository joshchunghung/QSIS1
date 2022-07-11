// import axios from '../../axios-auth'
// import axios from '../../../node_modules/axios'
import axios from '../../axios-auth'
import {
    print
} from 'graphql'
import {
    useMutation, useQuery
} from '@vue/apollo-composable'
import gql from 'graphql-tag'

// mutation
const REGISTER_USER = gql`
    mutation register(
        $username: String!
        $email: String!
        $password1: String! 
        $password2: String!
        ){register(   
            username:$username,
            email:$email,
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
        axios.post('', {
            query: print(REGISTER_USER),
            variables: {
                username: formData.username,
                email: formData.email,
                password1: formData.password1,
                password2: formData.password2
            }
        })
            .then((response) => console.log(response))
            .catch((err) => { console.log(123456, err) })

        // useQuery
        // const [mutateFunction, { data, loading, error }] = useMutation(REGISTER_USER,{
        //     variables: formData});
    }


}

export default {
    state,
    getters,
    mutations,
    actions
}
