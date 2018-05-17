<template>
    <g className="steel-layer">
        <steel-wall v-for="(item,index) in steelsList" :key="index" :x="item[1] * ITEM_SIZE_MAP.STEEL" :y="item[0] * ITEM_SIZE_MAP.STEEL"></steel-wall>
    </g>
</template>
<script>
import { ITEM_SIZE_MAP, N_MAP } from '../utils/constants'
import SteelWall from './SteelWall.vue'
export default {
    props: ['steels'],
    data() {
        return {
            x: 0,
            y: 0,
            ITEM_SIZE_MAP,
            N_MAP
        }
    },
    methods: {
        getRowCol(t, N) {
            return [Math.floor(t / N), t % N]
        }
    },
    mounted() {
    },
    computed: {
        steelsList() {
            let array = [];
            this.steels.forEach((set,t) => {
                if (set) {
                    const [row, col] = this.getRowCol(t, N_MAP.STEEL)
                    array.push([row, col]);
                } else {
                }
            });
            return array;
        }
    },
    components: {
        SteelWall
    }

}
</script>
<style lang="less" scoped>

</style>
