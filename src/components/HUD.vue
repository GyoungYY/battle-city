<template>
    <g className="HUD" :display="show ? 'inline' : 'none'" :transform="`translate(${x}, ${y})`">
        <enemy-count-indicator :count="remainingEnemyCount" :x="x" :y="y"></enemy-count-indicator>
        <g :transform="`translate(0, ${6 * B})`">
        </g>
    </g>
</template>
<script>
import EnemyCountIndicator from './EnemyCountIndicator'
import { BLOCK_SIZE as B, FIELD_SIZE } from '../utils/constants'
export default {
    data() {
        return {
            remainingEnemyCount: 6,
            show: true,
            x: FIELD_SIZE + 1.5 * B,
            y: 1.5 * B,
            B,
            FIELD_SIZE
        }
    },
    components: {
        EnemyCountIndicator
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

