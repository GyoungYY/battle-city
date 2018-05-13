<template>
    <g className="remaining-enemy-count-indicator" :transform="`translate(${x}, ${y})`">
        <image-svg :key="num" v-for="num in count" image-key="EnemyTankThumbnail" :width="8" :height="8" :transform="`translate(${8 * (num % 2)},${8 * Math.floor(num / 2)})`">
            <g fill="#00000">
                <rect x={1} y={1} width={1} height={6} />
                <rect x={7} y={1} width={1} height={6} />
                <rect x={2} y={3} width={5} height={2} />
                <rect x={3} y={2} width={3} height={4} />
                <rect x={4} y={1} width={1} height={6} />
                <rect x={3} y={7} width={3} height={1} />
                <rect x={4} y={3} width={1} height={2} fill="#6B0800" />
            </g>
        </image-svg>
    </g>
</template>
<script>
import ImageSvg from '../components/ImageSVG.vue'
export default {
    props:['x','y','count'],
    data() {
        return {
        }
    },
    components:{
        ImageSvg
    },
    methods: {
        onClick() {
            this.$emit();
        },
    }
}
</script>
<style lang="less" scoped>

</style>

