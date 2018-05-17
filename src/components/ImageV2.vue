
<script>
import Vue from 'vue';
let renderToString = require('vue-server-renderer/basic.js')

const svgns = 'http://www.w3.org/2000/svg';
import InnerImage from './InnerImage.vue'

// imageKey 到 object-url 的映射，一个 imageKey 对应了一张保存好的图片
// cache.set('image', "blob:http://shinima.pw/c541fbc4-e073-431a-aca7-7f65e046cd86");
export default {
    props: ['width', 'height', 'imageKey', 'transform', 'child'],
    data() {

        return {
            disabled: false,
        }
    },
    render(h) {
        return <image transform={this.transform} href={this.cache.get(this.imageKey)} />
    },
    created() {
        let that = this;
        let inner = Vue.extend({
            render(h) {
                return <h1>{that.$slots.default}</h1>
            },
        })
        let a = new Vue({
            template: '<inner></inner>',
            components: {
                inner
            }
        })
        renderToString(a, (e, r) => {
            if (!that.cache.has(that.imageKey)) {
                const open = `<svg xmlns="${svgns}" width="${that.width}" height="${that.height}">`
                const string = `<g>${that.child}</g>`
                const close = '</svg>'
                const markup = open + string + close
                const blob = new Blob([markup], { type: 'image/svg+xml' })
                const url = URL.createObjectURL(blob);
                that.$store.commit('setCache', {
                    key: that.imageKey,
                    url: url
                })
            }
        })

    },
    components: {
        InnerImage
    },
    methods: {
        onClick() {
            this.$emit();
        },
    },
    computed: {
        cache() {
            return this.$store.getters.cache
        }
    }
}
</script>
<style lang="less" scoped>
</style>

