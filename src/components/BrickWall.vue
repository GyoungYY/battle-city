<template>
    <image-svg class="brickwall" :image-key="`BrickWall/${this.shape}`" :transform="`translate(${x}, ${y})`" :width="4" :height="4" :child="child">
    </image-svg>
</template>
<script>
import { ITEM_SIZE_MAP, N_MAP } from '../utils/constants'
import ImageSvg from '../components/ImageSVG.vue'
export default {
    props: ['x', 'y'],
    data() {
        const { x, y } = { x: this.x, y: this.y };
        const row = Math.floor(y / ITEM_SIZE_MAP.BRICK)
        const col = Math.floor(x / ITEM_SIZE_MAP.BRICK)
        const shape = (row + col) % 2 === 0
        return {
            shape,
            ITEM_SIZE_MAP,
            child: `  <rect width="4" height="4" fill="#636363"></rect>
        <rect x="${shape ? 0 : 1}" y="0" width="${shape ? 4 : 3}" height="3" fill="#6B0800" ></rect>
        <rect x="${shape ? 0 : 2}" y="1" width="${shape ? 4 : 2}" height="2" fill="#9C4A00" ></rect>`
        }
    },
    mounted(){
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
