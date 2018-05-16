<template>
    <svg className="screen" style="background:#757575" width="512" height="480" viewBox="0 0 256 240" @mousedown="onMouseDown" @mouseup="onMouseUp" @mousemove="onMouseMove" @mouseout="onMouseLeave">
        <slot></slot>
    </svg>
</template>
<script>
export default {
    data() {
        return {
            background: '#757575',

        }
    },
    methods: {
        onMouseDown() {
            // this.$emit("");
        },
        onMouseLeave() {
            // this.$emit();
        },
        onMouseMove() {
            // this.$emit();
        },
        onMouseUp() {
            // this.$emit();
        },
    }
}
</script>
<style lang="less" scoped>

</style>
