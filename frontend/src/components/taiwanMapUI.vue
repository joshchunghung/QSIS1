<template>
    <div class="mapInfo offset-1">
        <LMap ref="map" :center="[23, 121]" :zoom="7" @update:bounds="updateBounds()">
            <LControlLayers />
            <!--layer-type="base" for LControlLayers  -->
            <LTileLayer v-for="mapState in mapStates" layer-type="base" :minZoom="6" :key="mapState.name"
                        :url="mapState.url" :attribution="mapState.attribution" :name="mapState.name"
                        :maxZoom="mapState.maxZoom" :visible="mapState.visible"
            />

            <LCircleMarker  v-for="event in events"
                            :key="event.id" :lat-lng="[event.latitude, event.longitude]"
                            :radius="event.id===hoverid ? 25 : getSize(event.ML)"
                            :color="event.id===hoverid ? '#EDE9D7' :  getDepColor(event.depth)"
                            :fill="true"
                            :fillColor="getDepColor(event.depth)"
                            :fillOpacity="event.id===hoverid ? 1 : 0.5"
                            class="test"
            >
                <LPopup>
                    {{ event.date }}<br />
                    {{ event.time }} (UTC)<br />
                    Latitude: {{ event.latitude }}°<br />
                    Longitude:{{ event.longitude }}° <br />
                    Depth:{{ event.depth }} km <br />
                    ML:{{ event.ML }} <br />
                    <div class="myMouse" @click="openSitePage(event)">Stations</div>
                </LPopup>
            </LCircleMarker>

        </LMap>

    </div>
    <!-- lengend -->
    <div id="MLscale"></div>
    <div id="depscale"></div>

</template>

<script lang="ts">
import {
    computed, defineComponent, onMounted, ref
} from 'vue'

import {
    useStore
} from 'vuex'
import {
    LMap,
    LTileLayer,
    LControlLayers,
    LCircleMarker,
    LPopup,
    LIcon,
    LMarker
} from '@vue-leaflet/vue-leaflet'
import {
    tileProviders
} from './statics/mapUrl'
import {
    mlLegend
} from './statics/lengend.js'
import {
    getColor
} from './statics/color.js'
import {
    useRouter
} from 'vue-router'
export default defineComponent({
    name: 'twMapUI',
    components: {
        LMap,
        LTileLayer,
        LControlLayers,
        LCircleMarker,
        LPopup,
        LIcon,
        LMarker
    },
    setup () {
        const mapStates = ref(tileProviders)
        const store = useStore()
        store.dispatch('getDBEvent')
        const events = computed(() => store.getters.event)
        const hoverid = computed(() => store.getters.hoverid)
        const map = ref(null)
        const router = useRouter()

        const openSitePage = (event) => {
            store.dispatch('getDBStation', event.id)
            router.push({
                name: 'station'
            })
        }
        // const eventPage = () => {
        //     store.commit('isEventOpen', true)
        //     // store.commit('Orginal')
        //     store.commit('changeBuildingState', false)
        //     store.commit('changeFloorMapViewState', false)
        //     store.commit('changeWaveFormState', false)
        // }

        const dep = [10, 35, 70, 150]
        const s100Color = [
            '#DB453F', '#F2B53A', '#97E838', '#26D2EB', '#7B3AF2'
        ]
        function getDepColor (depth) {
            for (let i = 0; i < s100Color.length - 1; i++) {
                if (depth <= dep[i]) { return s100Color[i] } else { continue }
            }
            return s100Color[s100Color.length - 1]
        }

        function getSize (ML, circleSize = 5) {
            const mlBase = 3
            if (ML > mlBase) { return (ML - mlBase) * circleSize + 0.1 } else { return 0.1 }
        }

        onMounted(() => {
            mlLegend(5, dep, s100Color)
            $('#MLscale').draggable()
            $('#depscale').draggable()
            // get the map DOM [ref="map"]
        })

        const updateBounds = () => {
            const Bounds = map.value.leafletObject.getBounds()
            const minLat = Bounds._southWest.lat
            const maxLat = Bounds._northEast.lat
            const minLng = Bounds._southWest.lng
            const maxLng = Bounds._northEast.lng
            store.commit('changeEventRange', [minLat, maxLat, minLng, maxLng])
        }

        // onBeforeUnmount(() => eventPage())
        return {
            mapStates,
            events,
            openSitePage,
            getColor,
            getDepColor,
            getSize,
            map,
            updateBounds,
            hoverid
        }
    }
})
</script>

<style scoped>
@import 'leaflet/dist/leaflet.css';
.mapInfo {
    width: 80%;
    height: 500px;
}

.myMouse {
    cursor: pointer;
    color: blue;
}

#depscale {
    position: absolute;
    left: 475px;
    top: 367.594px;
    z-index: 1000;
    padding: 0;
    width: 100px;
    border-left: 30%;
    stroke: white;
    stroke-width: 0.6;
}

#MLscale {
    position: absolute;
    left: 515px;
    top: 538.594px;
    z-index: 1000;
    padding: 0;
    width: 230px;
    stroke: white;
    stroke-width: 0.6;
}

</style>
<style>
#eveTable tbody tr:hover{
    background-color: palegoldenrod;
    cursor: pointer;
}
.leaflet-interactive:hover{
    fill:black

}

</style>
