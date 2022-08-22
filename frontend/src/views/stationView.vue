<template>
    <div class="station">
        <stationMapUI></stationMapUI>
        <br />
        <br />
        <br />
        <div class="row">
            <!-- 新資料 -->
            <div v-if="buildingState && isArray" class="col-3">
                <button type="button" class="btn btn-outline-primary" @click="changeBuildingOpen">
                    buildingArray
                </button>
            </div>
            <span class="col-1"></span>

            <!-- mapviwe 新資料 -->
            <div v-if="floorMapViewState" class="col-3">
                <button type="button" class="btn btn-outline-secondary" @click="changeMapViewOpen">
                    MapView
                </button>
            </div>
            <span class="col-1"></span>

            <!-- waveform 新資料 -->
            <div v-if="waveFormState" class="col-3">
                <button type="button" class="btn btn-outline-success" @click="changeWaveOpen">
                    WaveForm
                </button>
            </div>
        </div>

        <div v-if="isBuildingOpen && singleSite">
            <br />
            <buildingArrayUI />
        </div>
        <div v-if="isMapViewOpen && floor">
            <floorMapViewUI />
        </div>
        <div v-if="(waveFormState && isWaveFormOpen) || (isArray !== null && !isArray)">
            <div v-if="isLoading">
                <br />
                <br />
                <loadingUI />
            </div>
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
import stationMapUI from '@/components/stationMapUI.vue'
import buildingArrayUI from '@/components/buildingArrayUI.vue'
import floorMapViewUI from '@/components/floorMapViewUI.vue'
import sacPlotUI from '@/components/sacPlotUI.vue'
import loadingUI from '@/components/loadingUI.vue'
import {
    useStore
} from 'vuex'
export default defineComponent({
    name: 'stationVue',
    components: {
        stationMapUI,
        buildingArrayUI,
        floorMapViewUI,
        sacPlotUI,
        loadingUI
    },
    setup () {
        const store = useStore()
        const sensor = computed(() => store.getters.sensor)
        const floor = computed(() => store.getters.floor)
        const singleSite = computed(() => store.getters.singleSite)
        const isArray = computed(() => store.getters.isArray)
        const isLoading = computed(() => store.getters.isLoading)
        const isEventOpen = computed(() => store.getters.isEventOpen)
        const buildingState = computed(() => store.getters.buildingState)
        const floorMapViewState = computed(() => store.getters.floorMapViewState)
        const waveFormState = computed(() => store.getters.waveFormState)

        const isBuildingOpen = ref(false)
        const isMapViewOpen = ref(false)
        const isWaveFormOpen = ref(false)

        const isBuildingNew = ref(true)
        const isMapViewNew = ref(true)
        const isWaveFormNew = ref(true)

        const changeBuildingOpen = () => {
            isBuildingOpen.value = true
            isMapViewOpen.value = false
            isWaveFormOpen.value = false
            isBuildingNew.value = false
        }
        const changeMapViewOpen = () => {
            isBuildingOpen.value = false
            isMapViewOpen.value = true
            isWaveFormOpen.value = false
            isMapViewNew.value = false
        }
        const changeWaveOpen = () => {
            isBuildingOpen.value = false
            isMapViewOpen.value = false
            isWaveFormOpen.value = true
            isWaveFormNew.value = false
        }

        return {
            buildingState,
            floorMapViewState,
            waveFormState,
            sensor,
            floor,
            singleSite,
            isArray,
            changeBuildingOpen,
            isBuildingOpen,
            changeMapViewOpen,
            isMapViewOpen,
            changeWaveOpen,
            isWaveFormOpen,
            isLoading,
            isBuildingNew,
            isMapViewNew,
            isWaveFormNew,
            isEventOpen
        }
    }
})
</script>
