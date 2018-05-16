<template>
    <div>
        <image-svg :class="brickwall" :imageKey="`BrickWall/${shape}`" :transform="`translate(${x}, ${y})`" width="4" height="4">
            <rect width="4" height="4" fill="#636363"/>
            <rect :x="shape ? 0 : 1" :y="0" :width="shape ? 4 : 3" :height="3" fill="#6B0800"/>
            <rect :x="shape ? 0 : 2" :y="1" :width="shape ? 4 : 2" :height="2" fill="#9C4A00"/>
        </image-svg>
    </div>
</template>
<script>
import ImageSvg from "./ImageSVG";
import { ITEM_SIZE_MAP } from "../utils/constants";

export default {
    props: ['x', 'y'],
    components: {
        ImageSvg,
    },
  mounted() {
    const row = Math.floor(this.y / ITEM_SIZE_MAP.BRICK);
    const col = Math.floor(this.x / ITEM_SIZE_MAP.BRICK);
    const shape = (row + col) % 2 === 0;
  }
}
</script>



