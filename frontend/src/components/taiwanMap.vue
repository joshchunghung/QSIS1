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
      <LCircleMarker
        v-for="sta in pAlert"
        :key="sta.name"
        :lat-lng="[sta.lat, sta.lon]"
        :radius="3"
        color="red"
      >
        <LPopup>
          {{ sta.name }}<br />
          lat: {{ sta.lat }}<br />
          lon:{{ sta.lon }}
        </LPopup>
      </LCircleMarker>

      <LCircleMarker
        v-for="sta in buildArray"
        :key="sta.name"
        :lat-lng="[sta.lat, sta.lon]"
        :radius="5"
        color="yellow"
      >
        <LPopup>
          {{ sta.name }}<br />
          lat: {{ sta.lat }}<br />
          lon:{{ sta.lon }}
        </LPopup>
      </LCircleMarker>
    </LMap>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import 'leaflet/dist/leaflet.css'
import {
  LMap,
  LTileLayer,
  LControlLayers,
  LCircleMarker,
  LPopup
} from '@vue-leaflet/vue-leaflet'
import { tileProviders } from '../../public/data/mapUrl'
import { buildingArray } from '../../public/data/building'

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
    // axios.get('/data/palert.json').then((res) => {
    //   pAlert.value = res.data;
    // });

    const buildArray = ref(buildingArray)

    // const svg = d3
    //   .create('svg')
    //   .attr('width', 20)
    //   .attr('height', 10)
    //   .attr('viewBox', [0, 0, 20, 10])
    //   .attr('style', 'max-width: 100%; height: auto; height: intrinsic;');

    return {
      mapStates,
      pAlert,
      buildArray
    }
  }
})
</script>

<style scoped>
.container {
  height: 500px;
}
</style>
