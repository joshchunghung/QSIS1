<template>
    <div class="home">
        <twMapUI />
        <div v-if="buildingState">
            <buildingArrayUI />
        </div>
        <div v-if="floorMapViewState">
            <floorMapViewUI />
        </div>
        <div v-if="waveFormState">
            <sacPlotUI />
        </div>
    </div>
</template>

<script lang="ts">
import {
    computed,
    defineComponent
} from 'vue'
import twMapUI from '@/components/taiwanMapUI.vue' // @ is an alias to /src
import buildingArrayUI from '@/components/buildingArrayUI.vue'
import floorMapViewUI from '@/components/floorMapViewUI.vue'
import sacPlotUI from '@/components/sacPlotUI.vue'
import {
    useStore
} from 'vuex'
export default defineComponent({
    name: 'HomeView',
    components: {
        twMapUI,
        buildingArrayUI,
        floorMapViewUI,
        sacPlotUI
    },
    setup () {
        const store = useStore()
        const buildingState = computed(() => store.getters.buildingState)
        const floorMapViewState = computed(() => store.getters.floorMapViewState)
        const waveFormState = computed(() => store.getters.waveFormState)
        return {
            buildingState,
            floorMapViewState,
            waveFormState
        }
    }
})
</script>
