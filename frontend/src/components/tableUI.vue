<template>
    <div>
        <VueGoodTable
            id="eveTable2"
            style="text-align:center"
            :columns="columns"
            :rows="rows"
            @row-click="openSitePage"
            @row-mouseenter="onEnter"
            @row-mouseleave="onLeave"
            :row-style-class="test"
            :sort-options="{
                enabled: true,
                initialSortBy: {field: 'Event', type: 'desc'}
            }"
            :pagination-options="{
                enabled: true,
                mode: 'pages'
            }"
        />
    </div>
</template>
<script lang="ts">
import {
    computed,
    defineComponent, ref
} from 'vue'
import {
    VueGoodTable
} from 'vue-good-table-next'
import {
    useStore
} from 'vuex'
import {
    useRouter
} from 'vue-router'
export default defineComponent({
    name: 'tableUI',
    components: {
        VueGoodTable
    },
    setup () {
        const store = useStore()
        const router = useRouter()
        const rows = computed(() => {
            const [minLat, maxLat, minLng, maxLng] = store.getters.eventRange
            const data = []
            try {
                store.getters.event.forEach(event => {
                    if (event.latitude >= minLat && event.latitude <= maxLat && event.longitude >= minLng && event.longitude <= maxLng) {
                        data.push({
                            Event: `${event.date}T${event.time}`,
                            Latitude: event.latitude,
                            Longitude: event.longitude,
                            Depth: event.depth,
                            ML: event.ML,
                            id: event.id
                        })
                    }
                })
                return data
            } catch (e) {
                return data
            }
        })
        const columns = ref([
            {
                label: 'Event',
                field: 'Event'
            },
            {
                label: 'Latitude (°)',
                field: 'Latitude',
                type: 'number'
            },
            {
                label: 'Longitude (°)',
                field: 'Longitude',
                type: 'number'
            },
            {
                label: 'Depth (km)',
                field: 'Depth',
                type: 'number'
            },
            {
                label: 'ML',
                field: 'ML',
                type: 'number'
            }
        ])

        const onEnter = (params) => {
            store.commit('changeHoverID', params.row.id)
        }
        const onLeave = () => {
            store.commit('changeHoverID', 0)
        }
        const openSitePage = (params) => {
            store.dispatch('getDBStation', params.row.id)
            router.push({
                name: 'station'
            })
        }
        const test = () => { return 'test2' }
        return {
            columns,
            rows,
            openSitePage,
            onEnter,
            onLeave,
            test
        }
    }
})
</script>
<style>
#eveTable2 tbody tr:hover{
    background-color: palegoldenrod;
    cursor: pointer;
}

/* .test2{
    text-align:center;
} */
</style>
