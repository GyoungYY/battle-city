<template>
    <image :data-imageKey="imageKey" :transform="transform" href="blob:http://shinima.pw/c541fbc4-e073-431a-aca7-7f65e046cd86" />
</template>
<script>
const svgns = 'http://www.w3.org/2000/svg'
// imageKey 到 object-url 的映射，一个 imageKey 对应了一张保存好的图片
const cache = new Map();
cache.set('image', "blob:http://shinima.pw/c541fbc4-e073-431a-aca7-7f65e046cd86");
export default {
    props: ['width', 'height', 'imageKey', 'transform'],
    data() {
        return {
            disabled: false,
            cache
        }
    },
    components: {
    },
    methods: {
        onClick() {
            this.$emit();
        },
    }
}
</script>
<style lang="less" scoped>

</style>

