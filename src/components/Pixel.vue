
<script>
import ImageSvg from '../components/ImageSVG.vue'
import { Pixel } from '../utils'
let nextImageKey = 1
let imageKeyMap = new Map();
export default {
    props: ['x', 'y', 'fill'],
    data() {
        return {
        }
    },
    render(h) {
        const { x, y, fill } = this._props;
        return <rect x={x} y={y} width={1} height={1} fill={fill} />
    },
    components: {

    },
    computed: {
        width() {
            return this.d[0].length;
        },
        height() {
            return this.d.length;
        },
        child: () => {
            let str = this.d.map((cs, dy) =>
                Array.from(cs).map((c, dx) => Pixel({ x: dx, y: dy, fill: scheme[c] })),
            )
            return str;
        }
    },
    methods: {
        resolveImageKey(d) {
            if (!imageKeyMap.has(d)) {
                imageKeyMap.set(d, nextImageKey++)
            }
            return imageKeyMap.get(d);
        }
    }
}
</script>
<style lang="less" scoped>
</style>
