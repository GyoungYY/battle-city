<template>
    <image-svg :child="child" image-key="Eagle/broken" :width="16" :height="16" :transform="`translate(${x},${y})`">
    </image-svg>
</template>
<script>
import ImageSvg from '../components/ImageSVG.vue'
import { Pixel } from '../utils'
const points = [[8, 3], [3, 6], [4, 7], [6, 8], [9, 8], [11, 7], [12, 6]]

export default {
    props: ['x', 'y', 'broken'],
    data() {
        return {

        }
    },
    components: {
        ImageSvg
    },
    computed: {
        child: () => {
            let str = "";
            if (this.broken) {
                str = ` <path
            fill="#9C4A00"
            d="M1,8 h1 v-2 h1 v-1 h1 v-2 h1 v-1 h1 v2 h-1 v1 h-1 v2 h-1 v2 h-1 v7 h-1 v-8"
          />
          <path
            fill="#636363"
            d="M7,3 h1 v1 h1 v1 h1 v1 h3 v1 h1 v2 h1 v2 h-1 v2 h-1 v-4 h-1 v2 h-1 v-1 h-2 v1 h-1 v2 h-1 v-1 h-2 v-1 h-2 v-1 h1 v-3 h1 v-2 h1 v-1 h1 v-1"
          />`;


            } else {
                str = `  <path
            fill="#636363"
            d="M0,1 h2 v1 h1 v1 h1 v2 h2 v1 h1 v-3 h-1 v-1 h3 v1 h1 v1 h-1 v2 h1 v-1 h2 v-2 h1 v-1 h1 v-1 h2 v1 h-1 v1 h1 v1 h-1 v1 h1 v1 h-2 v1 h1 v1 h-1 v2 h-1 v1 h-3 v-1 h-1 v2 h1 v1 h2 v2 h-2 v-1 h-1 v1 h-2 v-1 h-1 v1 h-2 v-2 h2 v-1 h1 v-2 h-1 v1 h-3 v-1 h-1 v-2 h-1 v-1 h1 v-1 h-2 v-1 h1 v-1 h-1 v-1 h1 v-1 h-1 v-1"
          />`;
                points.map(([dx, dy], index) => {
                    str += Pixel({ x: dx, y: dy, fill: '#6b0800' });
                })
            }
            return str;
        }
    },
    methods: {

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