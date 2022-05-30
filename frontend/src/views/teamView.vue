<template>
    <div class="team">
        <twMapUI />
        <br />
        <br />
        <!-- <h4 v-if="targetEvent">{{ targetEvent.date }} {{ targetEvent.time }}(UTC+8), depth: {{ targetEvent.depth }}km,
            ML{{ targetEvent.ML
            }}</h4> -->

        <!-- building Array -->
        <button v-if="buildingState && isArray" type="button" class="btn btn-outline-primary"
            @click="changeBuildingOpen">buildingArray</button>
        <button v-if="floorMapViewState" type="button" class="btn btn-outline-secondary"
            @click="changeMapViewOpen">MapView</button>
        <button v-if="waveFormState" type="button" class="btn btn-outline-success"
            @click="changeWaveOpen">WaveForm</button>

        <div v-if="isBuildingOpen && singleSite">
            <br />
            <buildingArrayUI />
        </div>
        <div v-if="isMapViewOpen && floor">
            <floorMapViewUI />
        </div>
        <div v-if="isWaveFormOpen && sensor || (isArray !== null && !isArray)">
            <sacPlotUI />
        </div>
    </div>
</template>

<script lang="ts">
import {
    computed,
    defineComponent,
    ref
} from 'vue'
import twMapUI from '@/components/taiwanMapUI.vue' // @ is an alias to /src
import buildingArrayUI from '@/components/buildingArrayUI.vue'
import floorMapViewUI from '@/components/floorMapViewUI.vue'
import sacPlotUI from '@/components/sacPlotUI.vue'
import {
    useStore
} from 'vuex'
export default defineComponent({
    name: 'teamView',
    components: {
        twMapUI,
        buildingArrayUI,
        floorMapViewUI,
        sacPlotUI
    },
    setup() {
        const store = useStore()
        const buildingState = computed(() => store.getters.buildingState)
        const floorMapViewState = computed(() => store.getters.floorMapViewState)
        const waveFormState = computed(() => store.getters.waveFormState)
        const sensor = computed(() => store.getters.sensor)
        const floor = computed(() => store.getters.floor)
        const singleSite = computed(() => store.getters.singleSite)
        const isArray = computed(() => store.getters.isArray)
        // const targetEvent = computed(() => store.getters.targetEvent)

        let isBuildingOpen = ref(false)
        let isMapViewOpen = ref(false)
        let isWaveFormOpen = ref(false)
        const changeBuildingOpen = () => {
            isBuildingOpen.value = true
            isMapViewOpen.value = false
            isWaveFormOpen.value = false
        }
        const changeMapViewOpen = () => {
            isBuildingOpen.value = false
            isMapViewOpen.value = true
            isWaveFormOpen.value = false
        }
        const changeWaveOpen = () => {
            isBuildingOpen.value = false
            isMapViewOpen.value = false
            isWaveFormOpen.value = true
        }
        return {
            buildingState,
            floorMapViewState,
            waveFormState,
            sensor,
            floor,
            singleSite,
            isArray,
            // targetEvent,
            changeBuildingOpen,
            isBuildingOpen,
            changeMapViewOpen,
            isMapViewOpen,
            changeWaveOpen,
            isWaveFormOpen


        }
    }
})
</script>
