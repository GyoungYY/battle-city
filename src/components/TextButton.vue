<template>
    <g class="text-button">
      <rect class="text-area" :class="{disabled: disabled}"
        :x="x - spreadX"
        :y="y - spreadY"
        :width="content.length * 0.5 * B + 2 * spreadX"
        :height="0.5 * B + 2 * spreadY"
        @click="onClick"
        :stroke="stroke"
        strokeDasharray="2"
      />
      <text-content
        :style="`pointer-events: 'none'; opacity: ${disabled ? 0.3 : 1}`"
        :x="x"
        :y="y"
        :content="content"
        :fill="textFill"
      />
    </g>
</template>
<script>
import TextContent from './TextContent'
import { BLOCK_SIZE as B } from '../utils/constants'
export default {
    components: {
        TextContent
    },
    props: ['x', 'y', 'content', 'disabled'],
    data() {
        return {
            textFill: '#ccc',
            stroke: 'none',
            spreadX: 0.25 * B,
            spreadY: 0.125 * B,
            B: B
        }
    },
    methods: {
        onClick () {
            if (!this.disabled) {
                this.$emit('on-click');
            }
        }
    }
}
</script>
