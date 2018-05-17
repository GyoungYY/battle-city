
<script>
import _ from 'lodash'
import Bitmap from './Bitmap.vue'
import Pixel from './Pixel.vue'
const TANK_COLOR_SCHEMES = {
  yellow: {
    a: '#E7E794',
    b: '#E79C21',
    c: '#6B6B00',
  },
  green: {
    a: '#B5F7CE',
    b: '#008C31',
    c: '#005200',
  },
  silver: {
    a: '#FFFFFF',
    b: '#ADADAD',
    c: '#00424A',
  },
  red: {
    a: '#FFFFFF',
    b: '#B53121',
    c: '#5A007B',
  },
}

export default {
  props: ['transform','color','shape'],
  data() {
    return {}
  },
  render(h) {
  const scheme = TANK_COLOR_SCHEMES[this.color]
  const { a, b, c } = scheme
 return <g class="tank" transform={this.transform}>
     
 <g class="left-tire">
        <rect x={1} y={5} width={3} height={11} fill={a} />
        <rect x={2} y={5} width={2} height={11} fill={b} />
      </g>

      <g class="right-tire">
        <rect x={11} y={4} width={3} height={12} fill={c} />
       
      </g>
      <g class="tank-body">
        <path d="M4,5 h2 v3 h-1 v5 h1 v1 h-2 v-9" fill={a} />
        <rect x={6} y={4} width={1} height={2} fill={c} />
        <path d="M8,4 h1 v1 h2 v10 h-7 v-1 h5 v-1 h1 v-5 h-1 v-2 h-1 v-2" fill={c} />
        <path d="M6,6 h1 v1 h1 v-1 h1 v2 h1 v5 h-1 v1 h-3 v-1 h-1 v-5 h1 v-2" fill={b} />
        <path d="M6,8 h2 v1 h-1 v3 h-1 v-4" fill={a} />
        <path d="M8,9 h1 v4 h-2 v-1 h1 v-3" fill={c} />
      </g>
      <rect class="gun" x={7} y={0} width={1} height={7} fill={a} />
    </g>
   },
  computed: {

  },
  components: {
  }
}
</script>

