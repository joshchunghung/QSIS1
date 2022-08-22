<template>
    <h3>{{ targetEvent.date }} {{ targetEvent.time }}(UTC), Depth: {{ targetEvent.depth }}km, ML{{ targetEvent.ML}}</h3>
    <br />
    <div class="container">
        <LMap ref="map2" :center="[23, 121]" :zoom="7">
            <LControlLayers />
            <!--layer-type="base" for LControlLayers  -->
            <LTileLayer v-for="mapState in mapStates" layer-type="base" :minZoom="6" :key="mapState.name"
                        :url="mapState.url" :attribution="mapState.attribution" :name="mapState.name"
                        :maxZoom="mapState.maxZoom" :visible="mapState.visible"
            />
            <LMarker :lat-lng="[targetEvent.latitude ,targetEvent.longitude]">
                <LIcon :icon-url="require('../../public/Epicenter_map_sign_by_Juhele.svg')" :icon-size="[45,45]" />
            </LMarker>
            <div v-for="(site, name) in sites" :key="name">
                <LMarker :lat-lng="[site.latitude, site.longitude]" @click="changeSite(name)">
                    <LIcon :icon-url="svgUrl(site.isArray,site.MAXpga)" :icon-size="[20,20]"  />
                    <LPopup>
                        {{ name }}<br />
                        MaxPGA: {{ site.MAXpga }} gal
                    </LPopup>
                </LMarker>
            </div>
        </LMap>
        <img  id="colorBar" :src='require("../../public/colorIntensity.jpg")' alt="pgaColor" />
        <div class="mt-2 ms-2">
            <button type="button" class="btn btn-primary " @click="eventPage()">
                eventPage
            </button>
            <select style="position: relative; top:5px"  class="mt-2 ms-2" v-model="staName" @change="changeSite(staName)">
                <option value="">Station List</option>
                <option v-for="(site, key) in sites" :key="key">
                    {{ site.stations.length === 1 ? key : `${key} (Array) ` }}
                </option>
            </select>
        </div>
    </div>
</template>
<script lang="ts">
import {
    computed, defineComponent, onBeforeUnmount, onMounted, ref
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
    useRouter
} from 'vue-router'
import {
    tileProviders
} from './statics/mapUrl'
import {
    getColor
} from './statics/color.js'
export default defineComponent({
    name: 'stationMapUI',
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
        const sites = computed(() => store.getters.site)
        const targetEvent = computed(() => store.getters.targetEvent)
        const router = useRouter()
        const eventPage = () => {
            store.commit('isEventOpen', true)
            // store.commit('Orginal')
            store.commit('changeBuildingState', false)
            store.commit('changeFloorMapViewState', false)
            store.commit('changeWaveFormState', false)
            router.push({
                name: 'seis'
            })
        }

        const svgUrl = (isArray, pga) => {
            const color = getColor(pga)
            // isArray => true : triangle ; false:rectangle
            if (isArray) {
                const svgString = `<svg xmlns=\'http://www.w3.org/2000/svg\' version=\'1.1\'  width=\'100\' height=\'100\'><path d=\'M 50,5 95,97.5 5,97.5 z\'  stroke=\'${color}\' stroke-width=\'10\'  fill=\'${color}\' fill-opacity=\'0.5\' /></svg>`
                return 'data:image/svg+xml,' + svgString
            } else {
                const svgString = `<svg xmlns=\'http://www.w3.org/2000/svg\' version=\'1.1\'  width=\'100\' height=\'100\'><path d=\'m0 0h75v75h-75z\'  stroke=\'${color}\' stroke-width=\'10\'  fill=\'${color}\' fill-opacity=\'0.5\' /></svg>`
                return 'data:image/svg+xml,' + svgString
            }
        }
        const changeSite = (site: string) => {
            if (site === '') {
                store.commit('changeBuildingState', false)
                store.commit('clickEventList')
            } else {
                site = site.trim().split(' ')[0]
                store.commit('getSingleSite', site)
                store.commit('changeBuildingState', true)
            }
            store.commit('getFloor', null)
            store.commit('changeFloorMapViewState', false)
            store.commit('changeWaveFormState', false)
        }
        onMounted(() => {
            $('#colorBar').draggable()
        })

        onBeforeUnmount(() => {
            console.log('onBeforeUnmount')
            store.commit('Orginal')
        })
        return {
            mapStates,
            targetEvent,
            sites,
            eventPage,
            svgUrl,
            changeSite,
            staName: ''
        }
    }
})
</script>
<style scoped>
.container {
    width: 80%;
    height: 500px;
}

#colorBar {
    position: absolute;
    left: 507px;
    top: 621px;
    z-index: 1000;
    width: 300px;
    height: 40px;
}

</style>
