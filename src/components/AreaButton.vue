<template>
    <rect className="area-button" :x="x - spreadX" :y="y - spreadY" :width="width + 2 * spreadX" :height="height + 2 * spreadY" @click="click" stroke="transparent" :strokeWidth="strokeWidth" />
</template>
<script>
export default {
    data() {
        return {
            x: 0,
            y: 0,
            width: 0,
            height: 0,
            strokeWidth: 1,
            spreadX: 2,
            spreadY: 1,
        }
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

