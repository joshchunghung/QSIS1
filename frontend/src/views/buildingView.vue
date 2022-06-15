<template>
    <div class="building">
        <h1>This is an Register page</h1>
        <signUpUI />
    </div>
</template>

<script lang="ts">
import {
    defineComponent
} from 'vue'
import signUpUI from '@/components/signUpUI.vue'
export default defineComponent({
    name: 'BuildingView',
    components: {
        signUpUI
    }

})
</script>
