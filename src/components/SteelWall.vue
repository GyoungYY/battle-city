<template>
    <image-svg class="steelwall" image-key="steelwall" :transform="`translate(${x}, ${y})`" :width="8" :height="8" :child="child">
    </image-svg>
</template>
<script>
import { ITEM_SIZE_MAP, N_MAP } from '../utils/constants'
import SteelWall from './SteelWall.vue'
import ImageSvg from '../components/ImageSVG.vue'
export default {
    props: ['x', 'y'],
    data() {
        return {
            B,
            ITEM_SIZE_MAP,
            child: ` <rect width="8px" height="8px" fill="#ADADAD" ></rect>
        <rect x="2px" y="2px" width="4px" height="4px" fill="#FFFFFF"></rect>
        <path d="M6,2 h1,v-1,h1,v7,h-7,v-1,h1,v-1,h4,v-4" fill="#636363" />`
        }
    },
    methods: {
        getRowCol(t, N) {
            return [Math.floor(t / N), t % N]
        }
    },
    components: {
        ImageSvg
    }

}
</script>
<style lang="less" scoped>

</style>
