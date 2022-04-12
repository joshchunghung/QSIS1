<template>
    <div class="about">
        <h1>This is an project detail page</h1>
        <h2>{{building.id}}</h2>
        <h2>{{building.name}}</h2>
    </div>
</template>

<script lang="ts">
import {
    ref
} from 'vue'
import {
    getBuilding
} from '../schemas/building'
export default {
    setup () {
        const building = ref(getBuilding)
        console.log('AAA', building.value)
        return {
            building
        }
    }
}
</script>
