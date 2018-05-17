<template>
    <image-svg :child="child" :image-key="imageKey" :transform="calculateTankTransform(tank)" width="16" height="16">
    </image-svg>
</template>
<script>
import { BLOCK_SIZE, TANK_COLOR_SCHEMES } from '../utils/constants'
import ImageSvg from '../components/ImageSVG.vue'
// const tireShapeTiming = new Timing([{ t: 80, v: 0 }, { t: 80, v: 1 }])
export default {
    props: ['tank'],
    data() {
        let tank = this.tank;
        console.log(tank)
        // const color = this.resolveTankColorConfig(tank).find(time - this.startTime);
        const color = "yellow"
        const shape = this.lastTireShape
        const imageKey = `Tank/${tank.side}/${tank.level}/${color}/${shape}`
        return {
            imageKey: "",
            lastTireShape: 0,
            startTime: this.time,
            child:``
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
                if (level === 'basic') {
                    component = TankHumanBasic
                } else if (level === 'fast') {
                    component = TankHumanFast
                } else if (level === 'power') {
                    component = TankHumanPower
                } else {
                    component = TankHumanArmor
                }
            } else {
                if (level === 'basic') {
                    component = TankAIBasic
                } else if (level === 'fast') {
                    component = TankAIFast
                } else if (level === 'power') {
                    component = TankAIPower
                } else {
                    component = TankAIArmor
                }
            }
            return component
        }


    },
    computed: {
        time() {
            return this.$store.getters.time;
        }
    },
    components: {
        ImageSvg
    }
}
</script>

