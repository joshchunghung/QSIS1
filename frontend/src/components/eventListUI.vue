<template>
    <table class="table">
        <thead>
            <tr>
                <th class="click"  @click="changeType('Event')">Event
                    <span class="icon" :class="{'inverse': (order===1 ? true:false)}" v-if="sortType==='Event'">
                        <i class="fas fa-angle-up text-success"></i>
                    </span>

                </th>
                <th>Latitude</th>
                <th>Longitude</th>
                <th class="click" @click="changeType('depth')">Depth
                    <span class="icon" :class=" {'inverse': (order===1 ? true:false)}" v-if="sortType==='depth'">
                        <i class="fas fa-angle-up text-success"></i>
                    </span>
                </th>
                <th class="click" @click="changeType('ML')">ML
                    <span class="icon"  :class=" {'inverse': (order===1 ? true:false)}" v-if="sortType==='ML'">
                        <i class="fas fa-angle-up text-success"></i>
                    </span>
                </th>
            </tr>
            <tr v-for="event in events" :key="event.id" class="hoverStyle" @click="openSitePage(event.id)">
                <th>{{event.date}}T{{event.time}}</th>
                <th>{{event.latitude}}</th>
                <th>{{ event.longitude}}</th>
                <th>{{event.depth}}</th>
                <th>{{ event.ML }}</th>
            </tr>
        </thead>
    </table>

</template>

<script lang="ts">
import {
    computed,
    defineComponent,
    ref,

} from 'vue'
import {
    useStore
} from 'vuex'
export default defineComponent({
    name: 'eventListUI',
    setup() {
        const store = useStore()
        const events = computed(() => store.getters.event)
        let order = 1
        const sortType = ref('Event')

        function changeType (type) {
            if (sortType.value === type) {
                order = order * -1
                sortType.value = type
                store.commit('sortEventByType', {type,order})
            } else {
                order = 1
                sortType.value = type
            }
        }

        const openSitePage = (id) => { console.log(id)}

        return {
            events,
            changeType,
            sortType,
            order,
            openSitePage
        }
    }
})
</script>

<style scoped>
.table th.click {
    cursor: pointer;
}

.icon {
    display: inline-block;
}

.icon.inverse {
    transform: rotate(180deg);
}
.hoverStyle:hover{
    background-color:palegoldenrod;
    cursor: pointer;
}
</style>
