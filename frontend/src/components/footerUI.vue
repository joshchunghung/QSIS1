<template>
    <div class="color hpy container-fluid  text-white  px-sm-3 px-lg-5 " style="margin-top: 90px;">

        <p class="bottom0">Data Management Center</p>
        <p class="bottom0">Institute of Earth Sciences, Academia Sinica</p>
    </div>
    <div class="container-fluid bg-dark text-white text-center border-top py-4 px-sm-3 px-md-5" style="border-color: rgba(256, 256, 256, .05) !important;">
        <p class="m-0 text-white">&copy; 2022 <a href="https://dmc.earth.sinica.edu.tw/">IESDMC</a>. All Rights Reserved. Designed by <a href="https://htmlcodex.com">HTML Codex</a></p>
    </div>

</template>
<script lang="ts">
import {
    defineComponent
} from 'vue'
export default defineComponent({
    name: 'footerUI'
})
</script>

<style scoped>
.color {
    background-color:#22395d
}
.bottom0 {
    margin-bottom: 0px;
}
.hpy {
    padding-top: 1.5rem;
    padding-bottom: 0.5rem ;
}
</style>
