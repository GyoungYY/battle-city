<template>
    <div>
        <battle-field-scene v-if="game.status==='stat'"></battle-field-scene>
        <statistics-scene v-else></statistics-scene>
    </div>
</template>
<script>

import BattleFieldScene from './BattleFieldScene'
import StatisticsScene from './StatisticsScene'
import PlayerRecord from '../types/PlayerRecord'
import { mapGetters, mapActions } from 'vuex'
import { List } from 'immutable'
// const GameStatus = 'idle' | 'on' | 'stat' | 'gameover'
export default {
    data() {
        return {
            game: {
                status: "stat"
            }
        }
    },
    created() {
  
    },
    mounted() {
        this.didMountOrUpdate();
    },
    components: {
        BattleFieldScene,
        StatisticsScene
    },
    beforeDestroy() { },
    beforeMount() { },
    updated() {
    },
    methods: {
        
        didMountOrUpdate() {
            const { game, stages } = this.$store.getters;
            if (game.status === 'idle' || game.status === 'gameover') {
                const stageName = 1;
                const stageIndex = stages.findIndex(s => s.name === stageName);
                this.$store.commit('initGame', {
                    action: {
                        type: 'START_GAME'
                    }
                })
                this.$store.commit('initPlayer', {
                    action: {
                        type: 'ADD_PLAYER',
                        player: new PlayerRecord({
                            playerName: 'player-1',
                            lives: 3,
                            side: 'human',
                        }),                    }
                })
                this.$store.commit('initTanks', {
                    action: {
                        type: 'ADD_TANK',
                    }
                })
            }
        }
    }
}
</script>
<style lang="less" scoped>
</style>
