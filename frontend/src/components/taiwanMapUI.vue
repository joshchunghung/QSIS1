<template>
    <div class="container">
        <LMap ref="map" :center="[23, 121]" :zoom="7">
            <!--layer-type="base" for LControlLayers  -->
            <LTileLayer v-for="mapState in mapStates" layer-type="base" :minZoom="6" :key="mapState.name"
                :url="mapState.url" :attribution="mapState.attribution" :name="mapState.name"
                :maxZoom="mapState.maxZoom" />
            <LControlLayers />
            <!-- event  -->
            <div v-if="isEventOpen">
                <LCircleMarker v-for="event in events" :key="event.id" :lat-lng="[event.latitude, event.longitude]"
                    :radius="6" color="yellow">
                    <LPopup>
                        {{ event.date }}<br />
                        {{ event.time }} (UTC+8)<br />
                        lat: {{ event.latitude }}<br />
                        lon:{{ event.longitude }} <br />
                        dep:{{ event.depth }} km <br />
                        ML:{{ event.ML }} <br />
                        <div class="myMouse" @click="openSitePage(event.id)">
                            Stations
                        </div>
                    </LPopup>
                </LCircleMarker>
            </div>
            <div v-else>
                <div v-for="(site, name, index ) in sites" :key="index">
                    <LCircleMarker :lat-lng="[site.latitude, site.longitude]" :radius="5" color="red"
                        @click="changeSite(name)">
                        <LPopup>
                            {{ name }}<br />
                            MaxPGA: {{ site.MAXpga }} gal
                        </LPopup>
                    </LCircleMarker>
                </div>
            </div>
        </LMap>
    </div>
    <button type="button" class="btn btn-primary" @click="eventList">eventList</button>
    <div v-if="isEventOpen">Please choose a event!</div>
</template>

<script lang="ts">
import {
    computed,
    defineComponent, onBeforeUnmount, onUpdated, ref
} from 'vue'
import 'leaflet/dist/leaflet.css'
import {
    useStore
} from 'vuex'
import {
    LMap,
    LTileLayer,
    LControlLayers,
    LCircleMarker,
    LPopup
} from '@vue-leaflet/vue-leaflet'
import {
    tileProviders
} from '../../public/data/mapUrl'

export default defineComponent({
    name: 'twMapUI',
    components: {
        LMap,
        LTileLayer,
        LControlLayers,
        LCircleMarker,
        LPopup
    },
    setup() {
        const mapStates = ref(tileProviders)
        const store = useStore()
        store.dispatch('getDBEvent')
        const events = computed(() => store.getters.event)
        const sites = computed(() => store.getters.site)
        const isEventOpen = ref(true)


        const openSitePage = (event) => {
            isEventOpen.value = false
            store.dispatch('getDBStation', event)
        }
        const eventList = () => {
            isEventOpen.value = true
            store.commit('changeBuildingState', false)
            store.commit('changeFloorMapViewState', false)
            store.commit('changeWaveFormState', false)
        }
        const changeSite = (site: string) => {
            store.commit('getSingleSite', site)
            store.commit('changeBuildingState', true)
            store.commit('changeFloorMapViewState', false)
            store.commit('changeWaveFormState', false)
        }
        onBeforeUnmount(() => eventList())
        return {
            mapStates,
            events,
            isEventOpen,
            openSitePage,
            sites,
            eventList,
            changeSite,
        }
    }
})

</script>

<style scoped>
.container {
    width: 80%;
    height: 500px;
}

.myMouse {
    cursor: pointer;
    color: blue;
}
</style>
