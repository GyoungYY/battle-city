<template>
    <screen>
        <hud></hud>
    </screen>
</template>
<script>
import Hud from "../components/HUD.vue"
import Screen from "../components/Screen.vue"
export default {
    data() {
        return {
        }
    },
    methods: {
        onMouseDown() {
            this.$emit();
        },
        onMouseLeave() {
            this.$emit();
        },
        onMouseMove() {
            this.$emit();
        },
        onMouseUp() {
            this.$emit();
        },
    },
    components: {
        Screen,
        Hud
    }

}
</script>
<style lang="less" scoped>

</style>
