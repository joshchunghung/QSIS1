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
    createUser({ },formData) {
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
                    const msg = errors[Object.keys(errors)[0]][0].message
                    if (msg !== undefined) {
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
