<template>
    <screen>
        <hud></hud>
        <g className="battle-field" :transform="`translate(${B},${B})`">
            <rect :width="13 * B" :height="13 * B" fill="#000000" />
            <brick-layer :bricks="bricks"></brick-layer>
            <steel-layer :steels="steels"></steel-layer>
            <eagle v-if="eagle" :x="eagle.x" :y="eagle.y" :broken="eagle.broken"></eagle>
            <g className="tank-layer">
                <tank v-for="tank in activeTanks" :key="tank.tankId" :tank="tank">
                </tank>
            </g>
        </g>
    </screen>
</template>
<script>


import Hud from "../components/HUD.vue"
import Screen from "../components/Screen.vue"
import SteelLayer from './SteelLayer.vue'
import { BLOCK_SIZE as B } from '../utils/constants'
import Eagle from './Eagle.vue'
import BrickLayer from './BrickLayer'
import tanks from '../store/modules/tanks';
import Tank from './tanks.vue'
export default {
    props: {
        tank: {
            type: Object,
            default() {
                return {}
            }
        }
    },
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
        },
        bricks() {
            return this.map.toObject().bricks;
        },
        tanks() {
            return this.$store.getters.tanks;
        },
        activeTanks() {
            return this.tanks.filter(t => t.active).toObject();
        },

    },
    created() {

    },
    methods: {

    },
    mounted(){
    },
    components: {
        Screen,
        Hud,
        SteelLayer,
        Eagle,
        BrickLayer, Tank
    }

}
</script>
<style lang="less" scoped>
</style>
