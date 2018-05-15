<template>
    <screen>
        <hud></hud>
        <g className="battle-field" :transform="`translate(${B},${B})`">
            <rect :width="13 * B" :height="13 * B" fill="#000000" />
            <steel-layer :steels="steels"></steel-layer>
            <eagle v-if="eagle" :x="eagle.x" :y="eagle.y" :broken="eagle.broken"></eagle>
        </g>
    </screen>
</template>
<script>
import { List } from 'immutable'
import StageConfig from '../types/StageConfig'
const requireStage = require.context('../stages', false, /\.json/)
const filenames = List(requireStage.keys())

let defaultStages = filenames
  .map(requireStage).map(StageConfig.fromRawStageConfig)
  // 按照关卡数字顺序排序
  .sortBy(s => Number(s.name));
  
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
        }
    },
    computed: {
        map() {
            return this.$store.getters.map;
        },
        eagle() {
            return this.map.toObject().eagle.toObject();
        },
        steels() {
            return this.map.toObject().steels;
        }
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
