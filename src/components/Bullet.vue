<template>
    <g class="bullet" :transform="`translate(${x}, ${y})`">
        <rect width="3" height="3" :fill="fill" />
        <template v-html="pixel()"></template>  
    </g>
</template>
<script>
// import BulletRecord from '../types/BulletRecord'
import { Pixel } from '../utils/index.js'
export default {
    props: {
        direction: {
            type: String,
            default: 'up'
        },
        x: {
            type: Number,
            default: 0
        },
        y: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            fill: '#ADADAD'
        }
    },
    computed: {
        pixel () {
            let x;
            let y;
            if (this.direction === 'up') {
                x = 1;
                y = -1;
            } else if (this.direction === 'down') {
                x = 1;
                y = 3;
            } else if (this.direction === 'left') {
                x = -1;
                y = 1;
            } else {
                x = 3;
                y = 1;
            }
            return Pixel({x, y, fill: this.fill});
        }
    }
}
</script>
