<template>
    <div class="Register">
        <h1>This is a Register page</h1>
        <signUpUI />
    </div>
</template>

<script lang="ts">
import {
    defineComponent
} from 'vue'
import signUpUI from '@/components/signUpUI.vue'
export default defineComponent({
    name: 'registerView',
    components: {
        signUpUI
    }

})
</script>
