<template>
    <div class="Network">
        <h1>This is Instrument and network page</h1>
        <sacPlotUI />
    </div>
</template>

<script lang="ts">
import {
    defineComponent
} from 'vue'
import sacPlotUI from '@/components/sacPlotUI.vue'
export default defineComponent({
    name: 'NetworkView',
    components: {
        sacPlotUI
    }
})
</script>
