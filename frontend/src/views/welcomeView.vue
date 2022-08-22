<template>

    <div id="carouselQSIS" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-indicators">
            <button v-for="(p,index) in pictures" :key="p" type="button" data-bs-target="#carouselQSIS" :data-bs-slide-to="index" :class="index === 0 ? 'active' : ''" :aria-current="index === 0 ? true : false" :aria-label="`Slide ${index}`"></button>
        </div>

        <div class="carousel-inner">
            <div v-for="(p,index) in pictures" :key="p" :class="index === 0 ? 'carousel-item active' : 'carousel-item'">
                <div>{{p}}</div>
                <img :src="require('../../public/RCEC.png')" class="d-block w-100 h-100" :alt="p">
                <div class="carousel-caption d-none d-md-block">
                    <h5>First slide label</h5>
                    <p>Some representative placeholder content for the first slide.</p>
                </div>
            </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselQSIS" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselQSIS" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
        </button>
    </div>
</template>
<script lang="ts">
import {
    defineComponent, ref
} from 'vue'
export default defineComponent({
    name: 'welcomeView',
    setup () {
        const pictures = ref(['IES600x300.png', 'NTNUSEC600x300.png', 'QSIS.png', 'RCEC600x300.png', 'RCEC.png'])

        return {
            pictures
        }
    }
})
</script>
