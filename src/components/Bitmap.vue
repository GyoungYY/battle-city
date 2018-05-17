
<script>
import ImageV2 from '../components/ImageV2.vue'
import Pixel from './Pixel.vue'
let nextImageKey = 1
let imageKeyMap = new Map();
export default {
    props: ['x', 'y', 'd', 'scheme', 'styleObj', 'useImage'],
    data() {
        return {
        }
    },
    render(h) {
        const { x, y, d, scheme, style = {}, useImage } = this._props
        const width = d[0].length
        const height = d.length
        const content = d.map((cs, dy) =>
            Array.from(cs).map((c, dx) => <Pixel key={dy * width + dx} x={dx} y={dy} fill={scheme[c]} />),
        )
        return (
            <image-v2
                disabled={!useImage}
                imageKey={`Bitmap/${this.resolveImageKey(d)}`}
                transform={`translate(${x},${y})`}
                width={width}
                height={height}
                style={style}
            >
                {content}
            </image-v2>
        )
    },
    components: {
        ImageV2
    },
    computed: {
        width() {
            return this.d[0].length;
        },
        height() {
            return this.d.length;
        },
        child: () => {
            debugger
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