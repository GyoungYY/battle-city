<template>
    <screen>
        <hud></hud>
        <g className="battle-field" :transform="`translate(${B},${B})`">
            <rect :width="13 * B" :height="13 * B" fill="#000000" />
            <steel-layer :steels="steels"></steel-layer>
            <eagle :x="eagle.x" :y="eagle.y" :broken="eagle.broken"></eagle>
        </g>
    </screen>
</template>
<script>
import Hud from "../components/HUD.vue"
import Screen from "../components/Screen.vue"
import SteelLayer from './SteelLayer.vue'
import { BLOCK_SIZE as B } from '../utils/constants'
import Eagle from './Eagle.vue'
export default {
    data() {
        return {
            B,
            x: 0,
            y: 0,
            steels: []
        }
    },
    computed: {
        eagle() {
            const map = this.$store.getters.map;
            return map.toObject().eagle.toObject();
        },
    },
    created() {

    },
    methods: {

    },
    components: {
        Screen,
        Hud,
        SteelLayer,
        Eagle
    }

}
</script>
<style lang="less" scoped>

</style>
