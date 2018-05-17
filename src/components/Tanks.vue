<template>
    <image-svg :child="child" :image-key="imageKey" :transform="calculateTankTransform(tank)" width="16" height="16">
    </image-svg>
</template>
<script>
import { BLOCK_SIZE, TANK_COLOR_SCHEMES } from '../utils/constants'
import ImageSvg from '../components/ImageSVG.vue'
import tanks from '../store/modules/tanks';
// const tireShapeTiming = new Timing([{ t: 80, v: 0 }, { t: 80, v: 1 }])

const TankHumanBasic = ({ transform, color, shape }) => {
  const scheme = TANK_COLOR_SCHEMES[color]
  const { a, b, c } = scheme
  return (
    <g className="tank" transform={transform}>
      <g className="left-tire">
        <rect x={1} y={5} width={3} height={9} fill={a} />
        <rect x={2} y={5} width={1} height={9} fill={b} />
        {shape === 0 ? (
          <g className="left-tire-shape-0">
            <Bitmap x={1} y={4} d={['abb']} scheme={scheme} />
            <Bitmap x={1} y={14} d={['abb']} scheme={scheme} />
            {_.range(5).map(i => (
              <rect key={i} x={1} width={2} y={5 + 2 * i} height={1} fill={c} />
            ))}
          </g>
        ) : (
          <g className="left-tire-shape-1">
            <Bitmap x={1} y={4} d={['acc']} scheme={scheme} />
            <Bitmap x={1} y={14} d={['bcc']} scheme={scheme} />
            {_.range(4).map(i => (
              <rect key={i} x={1} width={2} y={6 + 2 * i} height={1} fill={c} />
            ))}
          </g>
        )}
      </g>

      <g className="right-tire">
        <rect x={11} y={4} width={3} height={11} fill={c} />
        <Pixel x={11} y={4} fill={a} />

        {shape === 0 ? (
          <g className="right-tire-shape-0">
            {_.range(6).map(i => (
              <rect key={i} x={12} width={2} y={4 + 2 * i} height={1} fill={b} />
            ))}
          </g>
        ) : (
          <g className="right-tire-shape-1">
            {_.range(5).map(i => (
              <rect key={i} x={12} width={2} y={5 + 2 * i} height={1} fill={b} />
            ))}
          </g>
        )}
      </g>

      <g className="tank-body">
        <path d="M4,7 h1 v-1 h1 v2 h-1 v3 h1 v1 h1 v1 h-2 v-1 h-1 v-5" fill={a} />
        <Pixel x={4} y={12} fill={c} />
        <path d="M6,6 h1 v1 h3 v1 h1 v4 h-1 v1 h-3 v-1 h-1 v-1 h-1 v-3 h1 v-2" fill={b} />
        <Pixel x={10} y={12} fill={c} />
        <rect x={5} y={13} width={5} height={1} fill={c} />
        <rect x={8} width={2} y={6} height={1} fill={c} />
        <Pixel x={10} y={7} fill={c} />
        <path d="M6,8 h2 v1 h-1 v2 h-1 v-3" fill={a} />
        <path d="M8,9 h1 v3 h-2 v-1 h1 v-2" fill={c} />
      </g>
      <rect className="gun" x={7} y={2} width={1} height={5} fill={a} />
    </g>
  )
}


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
              component =TankHumanBasic;
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
        child() {
          return  this.resolveTankComponent(this.tank.side, this.tank.level);
        }
    },
    components: {
        ImageSvg
    }
}
</script>

