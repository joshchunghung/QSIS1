<template>
    <h3 v-if="isEventOpen">Please select an event!</h3>
    <h3 v-else>Please choose a site</h3>
    <div class="container">
        <LMap ref="map" :center="[23, 121]" :zoom="7">
            <LControlLayers />
            <!--layer-type="base" for LControlLayers  -->
            <LTileLayer v-for="mapState in mapStates" layer-type="base" :minZoom="6" :key="mapState.name"
                        :url="mapState.url" :attribution="mapState.attribution" :name="mapState.name"
                        :maxZoom="mapState.maxZoom" :visible="mapState.visible"
            />

            <!-- event  :color="getMLColor(event.ML)"-->
            <div v-if="isEventOpen">
                <LCircleMarker v-for="event in events" :key="event.id" :lat-lng="[event.latitude, event.longitude]"
                               :radius="8" :color="getMLColor(event.ML)" :fill="true" :fillColor="getMLColor(event.ML)"
                               :fillOpacity="0.5"
                >
                    <LPopup>
                        {{ event.date }}<br />
                        {{ event.time }} (UTC+8)<br />
                        Latitude: {{ event.latitude }}°<br />
                        Longitude:{{ event.longitude }}° <br />
                        Depth:{{ event.depth }} km <br />
                        ML:{{ event.ML }} <br />
                        <div class="myMouse" @click="openSitePage(event.id)">Stations</div>
                    </LPopup>
                </LCircleMarker>
            </div>
            <div v-else>
                <div v-for="(site, name, index) in sites" :key="index">
                    <LPolygon :lat-lngs="StationIconShape(site.stations.length, site.latitude, site.longitude, 0.06)"
                              :color="getColor(site.MAXpga)" :fill="true" :fillOpacity="0.5"
                              :fillColor="getColor(site.MAXpga)" @click="changeSite(name)"
                    >
                        <LPopup>
                            {{ name }}<br />
                            MaxPGA: {{ site.MAXpga }} gal
                        </LPopup>
                    </LPolygon>
                </div>
                <LMarker :lat-lng="[23 ,121]">
                    <LIcon :icon-url="require('./device-electronic-machine-24-svgrepo-com.svg')" :icon-size="[45,90]" />
                </LMarker>
            </div>
        </LMap>
    </div>

    <!-- colorbar -->
    <button class="btn btn-success mt-2 me-2" @click="openPGAColorBar">pgaColor</button>
    <button type="button" class="btn btn-primary mt-2 me-2" @click="eventPage">
        eventPage
    </button>
    <!-- <select id="eventSelect" style="position: relative; top: 5px;" class="me-2" v-model="id" @change="openSitePage(id)">
        <option value="">Event List</option>
        <option v-for="event in events" :key="event.id" :value="event.id">
            {{ event.date }}T{{ event.time }}, ML{{ event.ML }}
        </option>
    </select> -->

    <!-- <select style="position: relative; top: 5px;" v-model="staName" @change="changeSite(staName)">
        <option value="">Station List</option>
        <option v-for="(site, name, index) in sites" :key="index">
            {{ site.stations.length === 1 ? name : `${name} (Array) ` }}
        </option>
    </select> -->
</template>

<script lang="ts">
import {
    computed, defineComponent, onBeforeUnmount, ref
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
    LPopup,
    LPolygon,
    LIcon,
    LMarker
} from '@vue-leaflet/vue-leaflet'
import {
    tileProviders
} from './statics/mapUrl'
import {
    getColor
} from './statics/color.js'

export default defineComponent({
    name: 'twMapUI',
    components: {
        LMap,
        LTileLayer,
        LControlLayers,
        LCircleMarker,
        LPopup,
        LPolygon,
        LIcon,
        LMarker
    },
    setup () {
        const mapStates = ref(tileProviders)
        const store = useStore()
        store.dispatch('getDBEvent')
        const events = computed(() => store.getters.event)
        const sites = computed(() => store.getters.site)
        const isEventOpen = ref(true)

        const openSitePage = (event) => {
            if (event === '') {
                eventPage()
                return
            }
            isEventOpen.value = false
            store.dispatch('getDBStation', event)
        }
        const eventPage = () => {
            isEventOpen.value = true
            store.commit('Orginal')
            store.commit('changeBuildingState', false)
            store.commit('changeFloorMapViewState', false)
            store.commit('changeWaveFormState', false)
        }
        const changeSite = (site: string) => {
            site = site.trim().split(' ')[0]
            store.commit('getSingleSite', site)
            store.commit('changeBuildingState', true)
            store.commit('changeFloorMapViewState', false)
            store.commit('changeWaveFormState', false)
        }
        const openPGAColorBar = () => {
            window.open(
                require('../../public/colorBar.jpg'),
                'PGA colorBar222',
                'location=1,status=1,scrollbars=1, width=1472,height=640'
            )
        }
        const getMLColor = (mag) => {
            if (mag <= 4) {
                return 'green'
            } else if (mag <= 5) {
                return 'orange'
            } else {
                return 'red'
            }
        }
        function StationIconShape (sationNum, lat, lon, radius) {
            const R = parseFloat(radius)
            if (sationNum === 1) {
                //  'triangle'
                const X = R / 2.0
                const Y = R / Math.sqrt(3)
                const pointA = [parseFloat(lat) + Y, parseFloat(lon)]
                const pointB = [parseFloat(lat) + Y / (-2), parseFloat(lon) + X]
                const pointC = [parseFloat(lat) + Y / (-2), parseFloat(lon) - X]
                return [pointA, pointB, pointC]
            } else {
                // rectangle
                const X = R / (2 * Math.sqrt(2))
                const pointA = [parseFloat(lat) + X, parseFloat(lon) + X]
                const pointB = [parseFloat(lat) + X, parseFloat(lon) - X]
                const pointC = [parseFloat(lat) - X, parseFloat(lon) - X]
                const pointD = [parseFloat(lat) - X, parseFloat(lon) + X]
                return [pointA, pointB, pointC, pointD]
            }
        }
        onBeforeUnmount(() => eventPage())
        return {
            mapStates,
            events,
            isEventOpen,
            openSitePage,
            sites,
            eventPage,
            changeSite,
            getColor,
            id: '',
            staName: '',
            openPGAColorBar,
            getMLColor,
            StationIconShape
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

path.leaflet-interactive:first-child {
    /* color:rgb(182, 32, 182); */
    fill-opacity: 1;
}

</style>
