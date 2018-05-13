<template>
    <div>
        hahahh
        <battle-field-scene v-if="game.status==='stat'"></battle-field-scene>
        <statistics-scene v-else></statistics-scene>
    </div>
</template>
<script>
import BattleFieldScene from './BattleFieldScene'
import StatisticsScene from './StatisticsScene'
import { mapGetters, mapActions } from 'vuex'
import { List } from 'immutable'
// const GameStatus = 'idle' | 'on' | 'stat' | 'gameover'
export default {
    data() {
        return {
            game:{
                status:"stat"
            }
        }
    },
    created() {

    },
    mounted() {
        console.log(this.$store);
    },
    components:{
        BattleFieldScene,
        StatisticsScene
    },
    beforeDestroy() { },
    beforeMount() { },
    updated() {

    },
}
</script>
<style lang="less" scoped>

</style>
