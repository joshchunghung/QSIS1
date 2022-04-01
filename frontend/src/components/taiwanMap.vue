<template>
  <div class="container">
    <LMap ref="map" :center="[23, 121]" :zoom="7">
      <!--layer-type="base" for LControlLayers  -->
      <LTileLayer
        v-for="mapState in mapStates"
        layer-type="base"
        minZoom="6"
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
            <div v-if="event.haveData" @click="openSitePage(event)">More Data</div>
          </LPopup>
        </LCircleMarker>
      </div>

      <!-- <div v-if="!isEventOpen"> -->
      <div v-else>
        <div v-for="sta in stationArray" :key="sta.id">
          <LCircleMarker
            v-if="sta.isOpen"
            :lat-lng="[sta.lat, sta.lon]"
            :radius="5"
            color="red"
          >
            <LPopup>
              {{ sta.name }}<br />
              lat: {{ sta.lat }}<br />
              lon:{{ sta.lon }}<br />
              <!-- <div v-if="event.haveData" @click="openSitePage()">More Data</div> -->
            </LPopup>
          </LCircleMarker>
        </div>
      </div>
    </LMap>
  </div>
  <button type="button" class="btn btn-primary" @click="isEventOpen = true">
    eventList
  </button>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import 'leaflet/dist/leaflet.css'
import {
  LMap,
  LTileLayer,
  LControlLayers,
  LCircleMarker,
  LPopup
} from '@vue-leaflet/vue-leaflet'
import { tileProviders } from '../../public/data/mapUrl'
// import { buildingArray } from '../../public/data/building'
import { event } from '../../public/data/event'
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
    const mapStates = ref(tileProviders)
    const pAlert = ref({})
    const isEventOpen = ref(true)
    const eventArray = reactive(event)
    const stationArray = ref({})
    // const showArray = reactive(JSON.parse(JSON.stringify(eventArray)))

    const openSitePage = (event: any) => {
      stationArray.value = event.site
      console.log(stationArray)
      isEventOpen.value = false
    }

    return {
      mapStates,
      pAlert,
      eventArray,
      openSitePage,
      isEventOpen,
      stationArray
    }
  }
})
</script>

<style scoped>
.container {
  height: 500px;
}
</style>
