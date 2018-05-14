<template>
    <g className="steel-layer">
        <steel-wall v-for="(ste,t) in steels" :key="t" :x="getRowCol(t, N_MAP.STEEL)[0] * ITEM_SIZE_MAP.STEEL" :y="getRowCol(t, N_MAP.STEEL)[1] * ITEM_SIZE_MAP.STEEL"></steel-wall>
    </g>
</template>
<script>
import { ITEM_SIZE_MAP, N_MAP } from '../utils/constants'
import SteelWall from './SteelWall.vue'
export default {
    props: ['steels'],
    data() {
        return {
            B,
            x: 0,
            y: 0,
            ITEM_SIZE_MAP,

        }
    },
    methods: {
        getRowCol(t, N) {
            return [Math.floor(t / N), t % N]
        }
    },
    components: {
        SteelWall
    }

}
</script>
<style lang="less" scoped>

</style>
