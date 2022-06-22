<template>
    <div class="home">
        <twMapUI />
        <br />
        <br />
        <eventListUI />
        <eventTitleUI />

        <!-- building Array -->
        <br />
        <div class="row">
            <!-- 新資料 -->
            <div v-if="isBuildingNew" class="col-3">
                <a
                    v-if="buildingState && isArray"
                    class="btn-flip"
                    data-back="BuildingArray"
                    data-front="NewData"
                    @click="changeBuildingOpen"
                ></a>
            </div>
            <div v-else class="col-3">
                <button
                    v-if="buildingState && isArray"
                    type="button"
                    class="btn btn-outline-primary"
                    @click="changeBuildingOpen"
                >
                    buildingArray
                </button>
            </div>
            <span class="col-1"></span>

            <!-- mapviwe 新資料 -->
            <div v-if="isMapViewNew" class="col-3">
                <a
                    v-if="floorMapViewState"
                    class="btn-flip"
                    data-back="MapView"
                    data-front="NewData"
                    @click="changeMapViewOpen"
                ></a>
            </div>
            <div v-else class="col-3">
                <button
                    v-if="floorMapViewState"
                    type="button"
                    class="btn btn-outline-secondary"
                    @click="changeMapViewOpen"
                >
                    MapView
                </button>
            </div>
            <span class="col-1"></span>

            <!-- waveform 新資料 -->
            <div v-if="isWaveFormNew" class="col-3">
                <a
                    v-if="waveFormState"
                    class="btn-flip"
                    data-back="WaveForm"
                    data-front="NewData"
                    @click="changeWaveOpen"
                ></a>
            </div>
            <div v-else class="col-3">
                <button
                    v-if="waveFormState"
                    type="button"
                    class="btn btn-outline-success"
                    @click="changeWaveOpen"
                >
                    WaveForm
                </button>
            </div>
        </div>

        <!-- UI -->
        <div v-if="isBuildingOpen && singleSite">
            <br />
            <buildingArrayUI />
        </div>
        <div v-if="isMapViewOpen && floor">
            <floorMapViewUI />
        </div>
        <div v-if="(isWaveFormOpen && sensor) || (isArray !== null && !isArray)">
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
    computed, defineComponent, onMounted, ref, watch
} from 'vue'
import twMapUI from '@/components/taiwanMapUI.vue' // @ is an alias to /src
import buildingArrayUI from '@/components/buildingArrayUI.vue'
import floorMapViewUI from '@/components/floorMapViewUI.vue'
import sacPlotUI from '@/components/sacPlotUI.vue'
import loadingUI from '@/components/loadingUI.vue'
import eventTitleUI from '@/components/eventTitleUI.vue'
import eventListUI from '../components/eventListUI.vue'
import {
    useStore
} from 'vuex'
export default defineComponent({
    name: 'homeView',
    components: {
        twMapUI,
        buildingArrayUI,
        floorMapViewUI,
        sacPlotUI,
        loadingUI,
        eventTitleUI,
        eventListUI
    },
    setup () {
        const store = useStore()
        const buildingState = computed(() => store.getters.buildingState)
        const floorMapViewState = computed(() => store.getters.floorMapViewState)
        const waveFormState = computed(() => store.getters.waveFormState)
        const sensor = computed(() => store.getters.sensor)
        const floor = computed(() => store.getters.floor)
        const singleSite = computed(() => store.getters.singleSite)
        const isArray = computed(() => store.getters.isArray)
        const isLoading = computed(() => store.getters.isLoading)
        // const targetEvent = computed(() => store.getters.targetEvent)

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
        // watch(singleSite, (nV, oV) => {
        //     console.log(nV, oV)
        // }, { immediate: true })
        watch(
            floor,
            () => {
                isMapViewNew.value = true
            },
            {
                immediate: true
            }
        )
        watch(
            sensor,
            () => {
                isWaveFormNew.value = true
            },
            {
                immediate: true
            }
        )

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
            isWaveFormNew

        }
    }
})
</script>
<style  scoped>
#colorBar {
    position: absolute;
    z-index: 100000;
    width: 50px;
    height: 20px;
}
</style>>

<style lang="scss" scoped>
$speed: 0.5s;

.btn-flip {
    position: relative;
    display: inline-block;
    font-family: "Open Sans";
    text-align: center;
    text-decoration: none;
    color: #fff;
    opacity: 1;
    outline: 0;
    line-height: 40px;
    letter-spacing: 1px;
    text-transform: uppercase;

    &:hover {
        &::after {
            opacity: 1;
            transform: translateY(0) rotateX(0);
        }

        &::before {
            opacity: 0;
            transform: translateY(50%) rotateX(90deg);
        }
    }

    &::after {
        position: absolute;
        top: 0;
        left: 0;
        display: block;
        width: 100%;
        color: black;
        background: #7882f0;
        opacity: 0;
        transition: $speed;
        content: attr(data-back);
        transform: translateY(-50%) rotateX(90deg);
    }

    &::before {
        position: relative;
        top: 0;
        left: 0;
        display: block;
        padding: 0 30px;
        color: black;
        background: #92f060;
        opacity: 1;
        transition: $speed;
        line-height: 40px;
        content: attr(data-front);
        transform: translateY(0) rotateX(0);
    }
}
</style>
