<template>
    <div class="container">
        <LMap ref="map" :center="[23, 121]" :zoom="7">
            <!--layer-type="base" for LControlLayers  -->
            <LTileLayer
                v-for="mapState in mapStates"
                layer-type="base"
                :minZoom="6"
                :key="mapState.name"
                :url="mapState.url"
                :attribution="mapState.attribution"
                :name="mapState.name"
                :maxZoom="mapState.maxZoom"
            />
            <LControlLayers />

            <!-- event  -->
            <div v-if="isEventOpen">
                <LCircleMarker
                    v-for="event in eventArray"
                    :key="event.id"
                    :lat-lng="[event.lat, event.lon]"
                    :radius="5"
                    color="yellow"
                >
                    <LPopup>
                        {{ event.date }}<br />
                        {{ event.time }}<br />
                        lat: {{ event.lat }}<br />
                        lon:{{ event.lon }}<br />
                        <div v-if="event.haveData" class="myMouse" @click="openSitePage(event)">
                            More Data
                        </div>
                    </LPopup>
                </LCircleMarker>
            </div>

            <!-- 選event 之後，station 才會出現-->
            <div v-else>
                <div v-for="site in stationArray" :key="site.id">
                    <LCircleMarker
                        v-if="site.isOpen"
                        :lat-lng="[site.lat, site.lon]"
                        :radius="5"
                        color="red"
                        @click="changeSiteID(site.id)"
                    >
                        <LPopup>
                            {{ site.name }}<br />
                            lat: {{ site.lat }}<br />
                            lon:{{ site.lon }}<br />
                        </LPopup>
                    </LCircleMarker>
                </div>
            </div>
        </LMap>
    </div>
    <button type="button" class="btn btn-primary" @click="eventList">eventList</button>
</template>

<script lang="ts">
import {
    defineComponent, reactive, ref, onBeforeUnmount
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
    name: 'twMap',
    components: {
        LMap,
        LTileLayer,
        LControlLayers,
        LCircleMarker,
        LPopup
    },
    setup () {
        const store = useStore()
        const event = store.getters.event
        const mapStates = ref(tileProviders)
        const isEventOpen = ref(true)
        const eventArray = reactive(event)
        const stationArray = ref({
        })

        const eventList = () => {
            isEventOpen.value = true
            store.commit('getEventID', '')
            store.commit('getSiteID', '')
            store.dispatch('getTest')
        }
        const openSitePage = (event: any) => {
            stationArray.value = event.site
            isEventOpen.value = false
            store.commit('getEventID', event.id)
        }
        const changeSiteID = (siteID: number) => {
            store.commit('getSiteID', siteID)
        }

        // 清空building array的東西
        onBeforeUnmount(() => eventList())

        return {
            mapStates,
            eventArray,
            openSitePage,
            isEventOpen,
            stationArray,
            eventList,
            changeSiteID
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
