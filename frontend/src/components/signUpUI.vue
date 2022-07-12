<template>
    <form id="signUp" class="mb-3">

        <input name="name" placeholder="Name" v-model="name" class="form-control" />
        <span v-if="errors.name">
            {{ errors.name }}
        </span>

        <input name="email" placeholder="Email" v-model="email"  class="form-control" />
        <span v-if="errors.email">
            {{ errors.email }}
        </span>

        <input
            name="password"
            placeholder="Password"
            v-model="password"
            type="password"
            class="form-control"
            autocomplete="off"
        />
        <span>{{ errors.password }}</span>

        <input
            name="passwordConfirmation"
            placeholder="PasswordConfirmation"
            v-model="passwordConfirmation"
            type="password"
            class="form-control"
            autocomplete="off"
        />
        <span>{{ errors.passwordConfirmation }}</span>

    </form>
    <button type="submit" class="btn btn-primary" @click="onSubmit">Submit</button>
    &nbsp;
    <!-- 半形的不換行空格  -->
    <button type="reset" class="btn btn-danger" @click="onReset">Reset</button>
</template>

<script lang="ts">
import {
    defineComponent, markRaw
} from 'vue'
import {
    useStore
} from 'vuex'
import {
    useField, useForm
} from 'vee-validate'
import {
    object, string, ref
} from 'yup'

export default defineComponent({
    name: 'signUpUI',
    setup () {
        const store = useStore()
        // yup 不需要是響應式的，所以使用markRaw
        const schema = markRaw(
            object({
                email: string().required().email(),
                name: string().required(),
                password: string().required().min(8),
                passwordConfirmation: string().oneOf(
                    [ref('password'), null],
                    'Passwords do not match'
                )
            })
        )
        const { errors } = useForm({
            validationSchema: schema
        })
        const { value: name } = useField('name')
        const { value: email } = useField('email')
        const { value: password } = useField('password')
        const { value: passwordConfirmation } = useField('passwordConfirmation')

        const Toast = Swal.mixin({
            toast: true,
            position: 'center-center',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true
        })
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
                store.commit('changeLogInState', true)
            }, 3000)
        }

        const errorHint = (text) => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: text
            })
        }

        const onSubmit = (values) => {
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
            }).catch(() => {errorHint("Something went wrong! Please try again later!") })
        }
        const onReset = (values) => {
            console.log('onReset')
        }

        return {
            onSubmit,
            onReset,
            email,
            password,
            passwordConfirmation,
            errors,
            name
        }
    }
})
</script>
<style scoped>
#signUp {
    text-align: left;
}

input {
    margin-bottom: 10px;
}

input + span {
    display: block;
    margin-bottom: 0;
}
</style>
