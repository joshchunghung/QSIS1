import axios from '../../axios-auth'
import {
    print
} from 'graphql'
// mutation
import {
    REGISTER_USER, LOGIN_USER
} from '../../schemas/mutations'

// vuex store
const state = {
    isLogIn: true
}
const getters = {
    isLogIn: (state) => state.isLogIn
}
const mutations = {
    changeLogInState (state, isLogIn) {
        state.isLogIn = isLogIn
    }
}
const actions = {
    createUser ({ commit }, formData) {
        return new Promise(function (resolve, reject) {
            axios.post('', {
                query: print(REGISTER_USER),
                variables: {
                    username: formData.username,
                    email: formData.email,
                    password1: formData.password1,
                    password2: formData.password2
                }
            })
                .then((response) => {
                    const payload = response.data.data.register
                    if (payload.success === true) {
                        resolve('success')
                    }
                    const errors = payload.errors
                    const code = errors[Object.keys(errors)[0]][0].code
                    const msg = errors[Object.keys(errors)[0]][0].message
                    if (code === 'unique') {
                        // 'A user with that username already exists.'
                        resolve('The email has been registered.')
                    } else if (msg !== undefined) {
                        // 'This password is too short. It must contain at least 8 characters.'
                        // 'This password is too common.'
                        // 'This password is entirely numeric.'
                        resolve(msg)
                    } else {
                        resolve('Sorry, something went wrong!')
                    }
                })
                .catch((err) => { reject(err) })
        }
        )
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}
