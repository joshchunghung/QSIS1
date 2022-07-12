<template>
    <div class="col-6 offset-3">
        <form class="signIn">
            <div>Sign In</div>
            <div class="input-group mb-3">
                <span class="input-group-text"><i class="fa fa-user"></i></span>
                <input name="email" placeholder="Email" v-model="email"  class="form-control">
            </div>
            <div class="input-group mb-3">
                <span class="input-group-text"><i class="fa fa-lock"></i></span>
                <input
                    name="password"
                    placeholder="Password"
                    v-model="password"
                    type="password"
                    class="form-control"
                    autocomplete="off"
                >
            </div>
            <div class="">
                <button type="submit" class="btn btn-primary" @click="onSubmit">Log In</button>
    &nbsp;
            <!-- 半形的不換行空格  -->
            </div>
        </form>
        <div class="myMouse" align="start" @click="changeState">Register</div>
        <div class="myMouse" align="end" @click="">Forgot password</div>
    </div>

</template>

<script lang="ts">
import {
    defineComponent
} from 'vue'
import {
    useStore
} from 'vuex'
export default defineComponent({
    name: 'signInUI',
    setup () {
        const store = useStore()
        const onSubmit = () => { console.log('login') }
        const changeState = () => {
            store.commit('changeLogInState', false)
        }

        return {
            changeState,
            onSubmit
        }
    }
})

</script>

<style scoped>
#signIn{
    margin-top: 10 em;
}

.myMouse {
    cursor: pointer;
    color: blue;
}

</style>
