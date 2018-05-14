<template>
    <screen>
        <hud></hud>
        <g className="battle-field" :transform="`translate(${B},${B})`">
            <rect :width="13 * B" :height="13 * B" fill="#000000" />
        </g>
    </screen>
</template>
<script>
import Hud from "../components/HUD.vue"
import Screen from "../components/Screen.vue"
import { BLOCK_SIZE as B } from '../utils/constants'
export default {
    data() {
        return {
            B,
            x: 0,
            y: 0
        }
    },
    methods: {
        onMouseDown() {
            this.$emit();
        },
        onMouseLeave() {
            this.$emit();
        },
        onMouseMove() {
            this.$emit();
        },
        onMouseUp() {
            this.$emit();
        },
    },
    components: {
        Screen,
        Hud
    }

}
</script>
<style lang="less" scoped>

</style>
