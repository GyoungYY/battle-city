<template>
    <div>
        <image :data-imageKey="imageKey" :transform="transform" :href="cache.get(imageKey)" />
        <slot></slot>
    </div>
</template>
<script>
const svgns = 'http://www.w3.org/2000/svg'
// imageKey 到 object-url 的映射，一个 imageKey 对应了一张保存好的图片
// cache.set('image', "blob:http://shinima.pw/c541fbc4-e073-431a-aca7-7f65e046cd86");
export default {
    props: ['width', 'height', 'imageKey', 'transform', 'child'],
    data() {

        return {
            disabled: false,
        }
    },
    created() {
        if (!this.cache.has(this.imageKey)) {
            const open = `<svg xmlns="${svgns}" width="${this.width}" height="${this.height}">`
            const string = `<g>${this.child}</g>`
            const close = '</svg>'
            const markup = open + string + close
            const blob = new Blob([markup], { type: 'image/svg+xml' })
            const url = URL.createObjectURL(blob);
            this.$store.commit('setCache',{
                key:this.imageKey,
                url:url
            })
        }
    },
    components: {
    },
    methods: {
        onClick() {
            this.$emit();
        },
    },
    computed:{
        cache(){
            return this.$store.getters.cache
        }
    }
}
</script>
<style lang="less" scoped>

</style>

