<template>
    <g>
        <image-v2 :image-key="imageKey" :transform="calculateTankTransform(tank)" width="16" height="16">
      <tank-human></tank-human>
        </image-v2>
  
    </g>
</template>
<script>
import { BLOCK_SIZE, TANK_COLOR_SCHEMES } from '../utils/constants'
import ImageV2 from '../components/ImageV2.vue'
import TankHuman from './TankHumanBasic'
import tanks from '../store/modules/tanks';
import InnerImage from './InnerImage.vue'
// const tireShapeTiming = new Timing([{ t: 80, v: 0 }, { t: 80, v: 1 }])

export default {
    props: ['tank'],
    data() {
        let tank = this.tank;
        // const color = this.resolveTankColorConfig(tank).find(time - this.startTime);
        const color = "yellow"
        const shape = this.lastTireShape
        const imageKey = `Tank/${tank.side}/${tank.level}/${color}/${shape}`
        return {
            imageKey: "",
            lastTireShape: 0,
            startTime: this.time,
        }
    },
    methods: {
        calculateTankTransform(tank) {
            let rotate
            let dx
            let dy
            if (tank.direction === 'up') {
                dx = tank.x
                dy = tank.y
                rotate = 0
            } else if (tank.direction === 'down') {
                dx = tank.x + BLOCK_SIZE - 1
                dy = tank.y + BLOCK_SIZE
                rotate = 180
            } else if (tank.direction === 'left') {
                dx = tank.x
                dy = tank.y + BLOCK_SIZE - 1
                rotate = -90
            } else {
                // RIGHT
                dx = tank.x + BLOCK_SIZE
                dy = tank.y
                rotate = 90
            }

            return `translate(${dx}, ${dy})rotate(${rotate})`
        },
        resolveTankColorConfig(tank) {
            if (tank.color == 'green') {
                return TankColorConfig.green
            } else if (tank.color === 'yellow') {
                return TankColorConfig.yellow
            } else if (tank.color === 'silver') {
                return TankColorConfig.silver
            } else if (tank.color === 'red') {
                return TankColorConfig.red
            }
            // else tank.color === 'auto'
            if (tank.withPowerUp) {
                return TankColorConfig.withPowerUp
            }
            if (tank.level === 'basic') {
                return TankColorConfig.basic
            } else if (tank.level === 'fast') {
                return TankColorConfig.fast
            } else if (tank.level === 'power') {
                return TankColorConfig.power
            } else if (tank.hp === 1) {
                return TankColorConfig.armor1
            } else if (tank.hp === 2) {
                return TankColorConfig.armor2
            } else if (tank.hp === 3) {
                return TankColorConfig.armor3
            } else if (tank.hp === 4) {
                return TankColorConfig.armor4
            }
            throw new Error('Can not resolve tank color timing')
        },

        resolveTankComponent(side, level) {
            let component = '';
            if (side === 'human') {
                component = TankHumanBasic;
            } else {
                component = TankAIBasic
            }
            return component
        }


    },
    computed: {
        time() {
            return this.$store.getters.time;
        },
    },
    components: {
        ImageV2,
        TankHuman,
        InnerImage
    }
}
</script>

