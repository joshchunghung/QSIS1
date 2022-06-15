<template>
    <Form id="signUp">
        <div
            v-for="{ as, name, label, ...attrs } in schema.fields"
            :key="name"
        >
            <!-- <label :for="name">{{ label }}</label> -->
            <Field :as="as" :id="name" :name="name"  :placeholder="label"  v-bind="attrs" class="mb-3" />
            <ErrorMessage :name="name" />
        </div>
        <button type="submit" class="btn btn-primary" @click="onSubmit">Submit</button>
        &nbsp;  <!-- 半形的不換行空格  -->
        <button type="reset" class="btn btn-danger" @click="onReset">Reset</button>
    </Form>

</template>

<script lang="ts">
import {
    defineComponent
} from 'vue'
import {
    useField, Form, Field, ErrorMessage
} from 'vee-validate'
import * as Yup from 'yup'

export default defineComponent({
    name: 'signUpUI',
    components: {
        Form,
        Field,
        ErrorMessage
    },
    setup () {
        const onSubmit = (values) => {
            console.log('onSubmit', JSON.stringify(values, null, 2))
        }

        const validateEmail = (value) => {
            // if the field is empty
            if (!value) {
                console.log('This field is required')
                return 'This field is required'
            }
            // if the field is not a valid email
            const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
            if (!regex.test(value)) {
                return 'This field must be a valid email'
            }
            // All is good
            return true
        }

        const onReset = (values) => {
            console.log('onReset')
        }

        const schema = {
            fields: [
                {
                    label: 'Your Name',
                    name: 'name',
                    as: 'input',
                    rules: Yup.string().required()
                },
                {
                    label: 'Your Email',
                    name: 'email',
                    as: 'input',
                    rules: Yup.string().email().required()
                },
                {
                    label: 'Your Password',
                    name: 'password',
                    as: 'input',
                    type: 'password',
                    rules: Yup.string().min(6).required()
                },
                {
                    label: 'Comfirmed Password',
                    name: 'Comfirmed password',
                    as: 'input',
                    type: 'password',
                    rules: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match')
                }
            ]
        }

        return {
            onSubmit,
            onReset,
            validateEmail,
            schema
        }
    }
})
</script>
<style scoped>
#signUp{
    text-align: left;
}
</style>
