import {
  List,
  Map,
  Repeat,
  Record
} from 'immutable'
import {
  GameRecord
} from '../../types/game'

import PlayerRecord from '../../types/PlayerRecord'
// import {
//   inc
// } from '../utils/common'

// export type PlayersMap = Map<PlayerName, PlayerRecord>

function players(state, action) {
  action = {
    player: new PlayerRecord({
      playerName,
      lives: 3,
      side: 'human',
    }),
  }

}

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
  PlayersMap: new Map()
}

// getters
const getters = {
  players: state => state.players
}

// actions
const actions = {}

// mutations
const mutations = {
  initPlayer(state, {
    action
  }) {
    if (action.type === 'ACTIVATE_PLAYER') {
      const {
        playerName,
        tankId
      } = action
      return state.PlayersMap.update(playerName, player =>
        player.set('activeTankId', tankId).set('active', true),
      )
    } else if (action.type === 'ADD_PLAYER') {
      return state.PlayersMap.set(action.player.playerName, action.player)
    } else if (action.type === 'REMOVE_PALYER') {
      return state.PlayersMap.remove(action.playerName)
    } else if (action.type === 'START_STAGE') {
      return state.PlayersMap.filterNot(player => player.side === 'ai')
    } else if (action.type === 'SET_REVERSED_TANK') {
      const {
        playerName,
        reversedTank
      } = action
      return state.PlayersMap.update(playerName, p => p.set('reservedTank', reversedTank))
    } else if (action.type === 'DEACTIVATE_TANK') {
      return state.PlayersMap.map(p => (p.activeTankId === action.tankId ? p.set('activeTankId', 0) : p))
    } else if (action.type === 'DEACTIVATE_ALL_PLAYERS') {
      return state.PlayersMap.map(p => p.set('active', false))
    } else if (action.type === 'DECREMENT_PLAYER_LIFE') {
      const player = state.PlayersMap.get(action.playerName)
      return state.set(action.playerName, player.update('lives', x => x - 1))
    } else if (action.type === 'INCREMENT_PLAYER_LIFE') {
      // return state.update(action.playerName, p => p.update('lives', inc(1)))
    } else {
      return state
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
