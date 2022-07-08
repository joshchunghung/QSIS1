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
            <div   v-if="isEventOpen">
                <LCircleMarker ref="circle" v-for="(event,index) in events" :key="event.id" :lat-lng="[event.latitude, event.longitude]"
                               :radius="8" :color="getMLColor(event.ML)" :fill="true" :fillColor="getMLColor(event.ML)"
                               :fillOpacity="0.5"  style="fill: black;"
                >
                    <LPopup>
                        {{ event.date }}<br />
                        {{ event.time }} (UTC+8)<br />
                        Latitude: {{ event.latitude }}°<br />
                        Longitude:{{ event.longitude }}° <br />
                        Depth:{{ event.depth }} km <br />
                        ML:{{ event.ML }} <br />
                        <div class="myMouse" @click="openSitePage(event)">Stations</div>
                    </LPopup>
                </LCircleMarker>
            </div>
            <div v-else>
                <LMarker :lat-lng="[eventSelected.lat ,eventSelected.lon]">
                    <LIcon :icon-url="require('../../public/Epicenter_map_sign_by_Juhele.svg')" :icon-size="[45,45]" />
                </LMarker>
                <div v-for="(site, name, index) in sites" :key="index">
                    <LMarker :lat-lng="[site.latitude, site.longitude]" @click="changeSite(name)">
                        <LIcon :icon-url="svgUrl('triangle',site.MAXpga)" :icon-size="[20,20]"  />
                        <LPopup>
                            {{ name }}<br />
                            MaxPGA: {{ site.MAXpga }} gal
                        </LPopup>
                    </LMarker>
                </div>

            </div>
        </LMap>

    </div>
    <img  id="colorBar" :src='require("../../public/colorIntensity.jpg")' alt="pgaColor"  v-show="!isEventOpen" />

    <!-- colorbar -->
    <div class="mt-2 ms-2">
        <button type="button" class="btn btn-primary " @click="eventPage()">
            eventPage
        </button>

        <select style="position: relative; top: 5px;"  class="mt-2 ms-2" v-model="staName" @change="changeSite(staName)">
            <option value="">Station List</option>
            <option v-for="(site, name, index) in sites" :key="index">
                {{ site.stations.length === 1 ? name : `${name} (Array) ` }}
            </option>
        </select>
    </div>
    <!-- data table -->
    <div v-show="isTableOpen">
        <table id="eveTable" class="table table-striped">
            <thead>
                <tr>
                    <th style="text-align: center;">Event</th>
                    <th style="text-align: center;">Latitude (°)</th>
                    <th style="text-align: center;">Longitude (°)</th>
                    <th style="text-align: center;">Depth (km)</th>
                    <th style="text-align: center;">ML</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="event in events" :key="event.id" class="hoverStyle" @click="openSitePage(event)">
                    <td>{{event.date}}T{{event.time}}</td>
                    <td>{{event.latitude}}</td>
                    <td>{{ event.longitude}}</td>
                    <td>{{event.depth}}</td>
                    <td>{{ event.ML }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script lang="ts">
import {
    computed, defineComponent, onBeforeUnmount, onMounted, onUpdated, ref
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
        const isTableOpen = ref(true)
        const eventSelected = ref(null)

        const openSitePage = (event) => {
            isEventOpen.value = false
            eventSelected.value = {
                lat: event.latitude,
                lon: event.longitude
            }
            store.dispatch('getDBStation', event.id)
        }
        const eventPage = () => {
            isEventOpen.value = true
            isTableOpen.value = true
            store.commit('Orginal')
            store.commit('changeBuildingState', false)
            store.commit('changeFloorMapViewState', false)
            store.commit('changeWaveFormState', false)
        }
        const changeSite = (site: string) => {
            if (site === '') {
                console.log('vvvv')
                store.commit('changeBuildingState', false)
                store.commit('clickEventList')
            } else {
                site = site.trim().split(' ')[0]
                isTableOpen.value = false
                store.commit('getSingleSite', site)
                store.commit('changeBuildingState', true)
            }
            store.commit('changeFloorMapViewState', false)
            store.commit('changeWaveFormState', false)
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

        const svgUrl = (shape, pga) => {
            const color = getColor(pga)
            if (shape === 'triangle') {
                const svgString = `<svg xmlns=\'http://www.w3.org/2000/svg\' version=\'1.1\'  width=\'100\' height=\'100\'><path d=\'M 50,5 95,97.5 5,97.5 z\'  stroke=\'${color}\' stroke-width=\'10\'  fill=\'${color}\' fill-opacity=\'0.5\' /></svg>`
                return 'data:image/svg+xml,' + svgString
            }
        }

        onMounted(() => {
            // let dataTable = $('#eveTable')
            // nextTick(() => {
            // console.log(dataTable.children().get(1).childNodes.length)
            // dataTable.DataTable({ order: [0, 'desc'] })
            // })
            // 等資料載好
            setTimeout(() => {
                $('#eveTable').DataTable({
                    order: [0, 'desc']
                })
                console.log($('#eveTable').children().get(1).childNodes)
            }, 200)
        })
        onUpdated(() => {
            console.log('aaa')
            $('#colorBar').draggable()
        })

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
            getMLColor,
            svgUrl,
            isTableOpen,
            eventSelected
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

#colorBar {
    top: -92px;
    left: -20%;
    z-index: 10000;
    width: 300px;
    height: 40px;
}

.hoverStyle:hover {
    background-color: palegoldenrod;
    cursor: pointer;
}
</style>
