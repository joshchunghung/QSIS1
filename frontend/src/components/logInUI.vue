<template>
    <div class="col-6 offset-3">
        <div>Sign In</div>
        <form>
            <div class="input-group mb-3">
                <span class="input-group-text"><i class="fa fa-user"></i></span>
                <input name="email" placeholder="Email" v-model="email" class="form-control" autocomplete="off">
            </div>
            <div class="input-group mb-3">
                <span class="input-group-text"><i class="fa fa-lock"></i></span>
                <input
                    name="password"
                    placeholder="Password"
                    type="password"
                    class="form-control"
                    v-model="password"
                    autocomplete="password"
                >
            </div>

        </form>
        <button type="submit" class="btn btn-primary" @click="logIN()">Log In</button>
        <div class="d-flex flex-row justify-content-between">
            <div class="col">
                <div class="myMouse" align="start" @click="changeState()">Register</div>
            </div>
            <div class="col">
                <div class="myMouse" align="end">Forgot password</div>
            </div>
        </div>
    </div>

</template>

<script lang="ts">
import {
    defineComponent, markRaw
} from 'vue'
import {
    useStore
} from 'vuex'
import {
    useForm
} from 'vee-validate'
import {
    object, string
} from 'yup'
import {
    errorHint
} from './statics/hint'
export default defineComponent({
    name: 'logInUI',
    setup () {
        const store = useStore()
        const changeState = () => {
            store.commit('changeLogInState', false)
        }

        const schema = markRaw(
            object({
                email: string().required().email(),
                password: string().required()
            })
        )

        const { errors, useFieldModel } = useForm({
            validationSchema: schema
        })
        // value 從這裏來
        const [email, password] = useFieldModel(['email', 'password'])

        const logIN = () => {
            if (errors.value.email) {
                errorHint('Please input the correct email')
                return
            }
            const formData = {
                email: email.value,
                password1: password.value
            }
        }

        return {
            changeState,
            logIN,
            errors,
            email,
            password
        }
    }
})

</script>

<style scoped>
.myMouse {
    margin-top: 20px;
    color: blue;
    cursor: pointer;
}

</style>
