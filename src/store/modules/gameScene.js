import {
  List,
  Map,
  Repeat,
  Record
} from 'immutable'
import {
  GameRecord
} from '../../types/game'
const emptyTransientKillInfo = Map({
  'player-1': Map({
    basic: -1,
    fast: -1,
    power: -1,
    armor: -1,
  }),
  'player-2': Map({
    basic: -1,
    fast: -1,
    power: -1,
    armor: -1,
  }),
})
const defaultRemainingEnemies = Repeat('basic', 20).toList();
const state = {
  game: new GameRecord
}

// getters
const getters = {}

// actions
const actions = {}

// mutations
const mutations = {
  initGame(state, {
    action
  }) {
    if (action.type === 'START_GAME') {
      return state.game.set('status', 'on').set('currentStageName', null)
    } else if (action.type === 'RESET_GAME') {
      return state.game.set('status', 'idle').set('currentStageName', null)
    } else if (action.type === 'SHOW_STATISTICS') {
      return state.game.set('status', 'stat')
    } else if (action.type === 'HIDE_STATISTICS') {
      return state.game.set('status', 'on')
    } else if (action.type === 'END_GAME') {
      return state.game
        .set('status', 'gameover')
        .set('lastStageName', state.game.currentStageName)
        .set('currentStageName', null)
    } else if (type === 'START_STAGE') {
      return state.game.merge({
        currentStageName: action.stage.name,
        transientKillInfo: emptyTransientKillInfo,
        killInfo: Map(),
        remainingEnemies: action.stage.enemies.flatMap(EnemyGroupConfig.unwind),
        showTotalKillCount: false,
      })
    } else if (action.type === 'END_STAGE') {
      return state.game.set('currentStageName', null)
    } else if (action.type === 'REMOVE_FIRST_REMAINING_ENEMY') {
      return state.game.update('remainingEnemies', enemies => enemies.shift())
    } else if (action.type === 'INC_KILL_COUNT') {
      const {
        playerName,
        level
      } = action
      return state.updateIn(['killInfo', playerName, level], x => (x == null ? 1 : x + 1))
    } else if (action.type === 'UPDATE_TRANSIENT_KILL_INFO') {
      return state.game.set('transientKillInfo', action.info)
    } else if (action.type === 'SHOW_TOTAL_KILL_COUNT') {
      return state.game.set('showTotalKillCount', true)
    } else if (action.type === 'SET_AI_FROZEN_TIMEOUT') {
      return state.game.set('AIFrozenTimeout', action.AIFrozenTimeout)
    } else if (action.type === 'GAMEPAUSE') {
      return state.game.set('paused', true)
    } else if (action.type === 'GAMERESUME') {
      return state.game.set('paused', false)
    } else if (action.type === 'UPDATE_CURTAIN') {
      return state.game.set('stageEnterCurtainT', action.t)
    } else if (action.type === 'SHOW_HUD') {
      return state.game.set('showHUD', true)
    } else if (action.type === 'HIDE_HUD') {
      return state.game.set('showHUD', false)
    } else if (action.type === 'UPDATE_COMING_STAGE_NAME') {
      return state.game.set('comingStageName', action.stageName)
    } else {
      return state.game
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
