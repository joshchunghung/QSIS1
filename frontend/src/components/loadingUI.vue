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
    position: absolute;
    z-index: 10000000;
    width: 70%;
    height: 800px;
    background: white;
}

.site {
    left: 15%;
    margin-top: auto;
}

span.align-middle {
    position: absolute;
    top: 90px;
}
</style>
