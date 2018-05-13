<template>
    <g class="remaining-enemy-count-indicator" :transform="`translate(0,0)`">
        <image-svg :child="child" :key="num" v-for="num in count" image-key="EnemyTankThumbnail" :width="8" :height="8" :transform="`translate(${8 * (num % 2)},${8 * Math.floor(num / 2)})`">
        </image-svg>
    </g>
</template>
<script>
import ImageSvg from '../components/ImageSVG.vue'
export default {
    props: ['x', 'y', 'count'],
    data() {
        return {
            child: `<g fill="#00000" data-reactid="2"><rect x="1" y="1" width="1" height="6" data-reactid="3"></rect><rect x="7" y="1" width="1" height="6" data-reactid="4"></rect><rect x="2" y="3" width="5" height="2" data-reactid="5"></rect><rect x="3" y="2" width="3" height="4" data-reactid="6"></rect><rect x="4" y="1" width="1" height="6" data-reactid="7"></rect><rect x="3" y="7" width="3" height="1" data-reactid="8"></rect><rect x="4" y="3" width="1" height="2" fill="#6B0800" data-reactid="9"></rect></g>`
        }
    },
    components: {
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

