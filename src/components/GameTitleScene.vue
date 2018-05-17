<template>
    <screen>
        <g class="game-title-scene">
            <defs>
            <pattern
            id="pattern-brickwall"
            :width="size * 2 / scale"
            :height="size * 2 / scale"
            patternUnits="userSpaceOnUse"
            >
                <g :transform="`scale(${1 / scale})`">
                    <BrickWall :x="0" :y="0" />
                    <BrickWall :x="0" :y="size" />
                    <BrickWall :x="size" :y="0" />
                    <BrickWall :x="size" :y="size" />
                </g>
            </pattern>
        </defs>
        <rect fill="#000000" :width="16 * B" :height="15 * B" />
        <g :transform="`scale(${scale})`">
            <text-content content="battle" :x="1.5 * B / scale" :y="3 * B / scale" fill="url(#pattern-brickwall)"/>
            <text-content content="city" :x="3.5 * B / scale + 1" :y="5.5 * B / scale" fill="url(#pattern-brickwall)"/>
        </g>
        <text-button content="1 player" :disabled="false" :x="5.5 * B" :y="8.5 * B" textFill="white" @on-click="onClick('play')"/>
        <text-button content="stage list" :x="5.5 * B" :disabled="true" :y="9.5 * B" textFill="white" @on-click="onClick()"/>
        <text-button content="gallery" :x="5.5 * B" :disabled="true" :y="10.5 * B" textFill="white" @on-click="onClick()"/>
        <!-- <Tank
          tank={
            new TankRecord({
              side: 'human',
              direction: 'right',
              color: 'yellow',
              moving: true,
              x: 4 * B,
              y: y(choice),
            })
          }
        /> -->
      </g>   
    </screen>   
</template>
<script>
import BrickWall from './BrickWall'
import TextContent from './TextContent'
import TextButton from './TextButton'
import Screen from './Screen'
import { BLOCK_SIZE as B, CONTROL_CONFIG, ITEM_SIZE_MAP } from '../utils/constants'
export default {
    components: {
        BrickWall,
        TextContent,
        TextButton,
        Screen
    },
    data() {
        return {
            scale: 4,
            size: ITEM_SIZE_MAP.BRICK,
            B: B
        }
    },
    methods: {
        onClick(type) {
            if (type === 'play') {
                this.$router.push('/game');
            }
        }
    }
}
</script>
