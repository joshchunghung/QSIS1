<template>
    <div class="col-6 offset-3">
        <form>
            <div class="input-group mb-3">
                <span class="input-group-text"><i class="fa fa-user"></i></span>
                <input name="name" placeholder="Name" v-model="name" class="form-control">
            </div>
            <div>{{ errors.name }} </div>

            <div class="input-group mb-3">
                <span class="input-group-text"><i class="fa-solid fa-envelope"></i></span>
                <input name="email" placeholder="Email" v-model="email"  class="form-control">
            </div>
            <div>{{ errors.email }} </div>

            <div class="input-group mb-3">
                <span class="input-group-text"><i class="fa fa-lock"></i></span>
                <input
                    name="password"
                    placeholder="Password"
                    v-model="password"
                    class="form-control"
                    autocomplete="new-password"
                    :type="showPassword ? 'text' : 'password'"
                >
            </div>
            <div>{{ errors.password }}</div>

            <div class="input-group mb-3">
                <span class="input-group-text"><i class="fa fa-lock"></i></span>
                <input
                    name="passwordConfirmation"
                    placeholder="PasswordConfirmation"
                    v-model="passwordConfirmation"
                    class="form-control"
                    autocomplete="new-password"
                    :type="showPassword ? 'text' : 'password'"
                >
                <i  class="eye"  :class=" showPassword ?  'fa-solid fa-eye':'fa-solid fa-eye-slash'" @click="showPassword =!showPassword"></i>
            </div>
            <div>{{ errors.passwordConfirmation }}</div>
        </form>

        <button type="submit" class="btn btn-primary" @click="onSubmit()">Submit</button>
        &nbsp;<!-- 半形的不換行空格  -->
        <button type="reset" class="btn btn-danger" @click="resetForm()">Reset</button>
        <div class="myMouse" align="start" @click="changeState()">Go back to sign in</div>
    </div>

</template>

<script lang="ts">
import {
    defineComponent, markRaw, ref
} from 'vue'
import {
    useStore
} from 'vuex'
import {
    useField, useForm
} from 'vee-validate'
import {
    object, string, ref as yupRef
} from 'yup'
import {
    errorHint
} from './statics/hint'

export default defineComponent({
    name: 'signUpUI',
    setup () {
        const store = useStore()
        const showPassword = ref(false)
        const changeState = () => {
            store.commit('changeLogInState', true)
        }
        // yup 不需要是響應式的，所以使用markRaw
        const schema = markRaw(
            object({
                email: string().required().email(),
                name: string().required(),
                password: string().required().min(8),
                passwordConfirmation: string().oneOf(
                    [yupRef('password'), null],
                    'Passwords do not match'
                )
            })
        )
        const { errors, resetForm } = useForm({
            validationSchema: schema
        })
        const { value: name } = useField('name')
        const { value: email } = useField('email')
        const { value: password } = useField('password')
        const { value: passwordConfirmation } = useField('passwordConfirmation')

        const successHint = () => {
            Swal.fire({
                title: 'Welcome you to join us!',
                width: 600,
                padding: '3em',
                color: '#716add',
                background: '#fff',
                timer: 3000,
                backdrop: `
                    rgba(0,0,123,0.4)
                    left top
                    no-repeat
                `
            })
            setTimeout(() => {
                changeState()
            }, 3000)
        }

        const onSubmit = () => {
            // console.log('onSubmit', JSON.stringify(values, null, 2))
            const formData = {
                username: name.value,
                email: email.value,
                password1: password.value,
                password2: passwordConfirmation.value
            }
            
            store.dispatch('createUser', formData).then((response) => {
                if (response === 'success') {
                    successHint()
                } else {
                    errorHint(response)
                }
            }).catch(() => { errorHint('Something went wrong! Please try again later!') })
        }

        return {
            onSubmit,
            resetForm,
            email,
            password,
            passwordConfirmation,
            errors,
            name,
            changeState,
            showPassword
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

.eye {
    position: absolute;
    right: 12px;
    margin-top: 13px;
    z-index:3
}
</style>
