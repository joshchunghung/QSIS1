<template>
    <div class="Register">
        <div v-if="isLogIn">
            <signInUI />
        </div>
        <div v-else>
            <h1>This is a Register page</h1>
            <signUpUI />
        </div>
    </div>
</template>

<script lang="ts">
import {
    defineComponent, computed, onBeforeUnmount
} from 'vue'
import {
    useStore
} from 'vuex'
import signUpUI from '@/components/signUpUI.vue'
import signInUI from '../components/signInUI.vue'
export default defineComponent({
    name: 'registerView',
    components: {
        signUpUI,
        signInUI
    },
    setup () {
        const store = useStore()
        const isLogIn = computed(() => store.getters.isLogIn)
        onBeforeUnmount(() => store.commit('changeLogInState', true))
        return {
            isLogIn
        }
    }

})
</script>
