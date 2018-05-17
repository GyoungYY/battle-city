<script>
import Vue from 'vue'
export default {
    render(h) {
        let slots = this.$slots.default;
        return <g> { this.$slots.default }</g>
    },
    data() {
        return {}
    },
    components: {
    },
    methods: {

    },
    computed: {
    }
};
</script>
<style lang="less" scoped>
</style>

