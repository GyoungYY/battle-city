<template>
    <image-svg :disabled="!useImage" :child="child" :image-key="`Bitmap/${resolveImageKey(d)}`" :width="width" :height="height" :transform="`translate(${x},${y})`">
    </image-svg>
</template>
<script>
import ImageSvg from '../components/ImageSVG.vue'
import { Pixel } from '../utils'
let nextImageKey = 1
let imageKeyMap = new Map();
export default {
    props: ['x', 'y', 'd', 'scheme', 'style', 'useImage'],
    data() {
        return {
            child: ""
        }
    },
    components: {
        ImageSvg,
        Pixel
    },
    computed: {
        width() {
            return this.d[0].length;
        },
        height() {
            return this.d.length;
        },
        child: () => {
            let str = this.d.map((cs, dy) =>
                Array.from(cs).map((c, dx) => Pixel({ x: dx, y: dy, fill: scheme[c] })),
            )
            return str;
        }
    },
    methods: {
        resolveImageKey(d) {
            if (!imageKeyMap.has(d)) {
                imageKeyMap.set(d, nextImageKey++)
            }
            return imageKeyMap.get(d);
        }
    }
}
</script>
<style lang="less" scoped>
</style>

import { Pixel } from './elements'


interface EagleProps {
  x: number
  y: number
  broken: boolean
}