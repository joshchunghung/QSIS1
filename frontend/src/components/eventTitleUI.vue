<template>
    <div v-if="buildingState">
        <h3>{{ targetEvent.date }} {{ targetEvent.time }}(UTC+8), Depth: {{ targetEvent.depth }}km, ML{{ targetEvent.ML
        }}
        </h3>
    </div>
</template>
<script lang="ts">
import {
    computed, defineComponent
} from 'vue'
import {
    useStore
} from 'vuex'
export default defineComponent({
    name: 'eventTitleUI',
    setup () {
        const store = useStore()
        const buildingState = computed(() => store.getters.buildingState)
        const targetEvent = computed(() => store.getters.targetEvent)
        return {
            targetEvent,
            buildingState
        }
    }
})
</script>
