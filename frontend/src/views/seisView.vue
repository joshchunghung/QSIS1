<template>
    <div class="seis">
        <twMapUI />
        <br />
        <tableUI />
    </div>

</template>

<script lang="ts">
import {
    defineComponent
} from 'vue'
import twMapUI from '@/components/taiwanMapUI.vue' // @ is an alias to /src
import tableUI from '@/components/tableUI.vue'
export default defineComponent({
    name: 'seisView',
    components: {
        twMapUI,
        tableUI
    }
})
</script>
