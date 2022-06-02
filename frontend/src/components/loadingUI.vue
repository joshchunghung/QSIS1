<template>
    <div id="load">
        <div class="d-flex justify-content-center site">
            <div class=" spinner-border text-primary" style="width: 5rem; height: 5rem;" role="status">
                <span class="visually-hidden"></span>
            </div>
            <br>
            <span class="align-middle text-center">Loading...</span>
        </div>
    </div>
</template>
<script lang="ts">
import {
    defineComponent
} from 'vue'
export default defineComponent({
    name: 'loadingUI'
})
</script>
<style scoped>
#load {
    z-index: 10000000;
    position: absolute;
    background: white;
    width: 70%;
    height: 800px;
}

.site {
    margin-top: auto;
    left: 15%;
}

span.align-middle {
    top: 90px;
    position: absolute;
}
</style>
