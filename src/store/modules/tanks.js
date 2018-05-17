import {
  Map
} from 'immutable'
import TankRecord from '../../types/TankRecord'
import {
  BLOCK_SIZE,
  CONTROL_CONFIG
} from '../../utils/constants'
// import { incTankLevel } from '../utils/common'

// export type TanksMap = Map<TankId, TankRecord>

const state = {
  TanksMap: new Map()
}

// getters
const getters = {
  tanks: state => state.TanksMap
}

// actions
const actions = {}

// mutations
const mutations = {
  initTanks(state, {
    action
  }) {
    action = {
      type: 'ADD_TANK',
      tank: new TankRecord({
        tankId: 1,
        x: 4 * BLOCK_SIZE,
        y: 12 * BLOCK_SIZE,
        side: 'human',
        color: 'yellow',
        level: 'basic',
        helmetDuration: 0,
      }),
    }
    if (action.type === 'ADD_TANK') {
      state.TanksMap = state.TanksMap.set(action.tank.tankId, new TankRecord(action.tank))
    } else if (action.type === 'HURT') {
      const tankId = action.targetTank.tankId
      return state.TanksMap.update(tankId, t => t.update('hp', hp => hp - 1))
    } else if (action.type === 'START_STAGE') {
      return state.TanksMap.clear()
    } else if (action.type === 'MOVE') {
      const {
        tankId,
        x,
        y,
        direction
      } = action
      return state.TanksMap.update(tankId, t => t.merge({
        x,
        y,
        direction
      }))
    } else if (action.type === 'START_MOVE') {
      return state.TanksMap.setIn([action.tankId, 'moving'], true)
    } else if (action.type === 'STOP_MOVE') {
      return state.TanksMap.setIn([action.tankId, 'moving'], false)
    } else if (action.type === 'UPGRADE_TANK') {
      // todo 当tank.level已经是armor 该怎么办?
      // return state.TanksMap.update(action.tankId, incTankLevel)
    } else if (action.type === 'REMOVE_POWER_UP_PROPERTY') {
      return state.TanksMap.update(action.tankId, tank => tank.set('withPowerUp', false))
    } else if (action.type === 'DEACTIVATE_TANK') {
      // 不能在关卡进行过程中移除tank, 因为tank的子弹可能正在飞行
      // 防御式编程: tank设置为inactive的时候重置一些状态
      return state.TanksMap.update(action.tankId, tank =>
        tank.merge({
          active: false,
          cooldown: 0,
          frozenTimeout: 0,
          helmetDuration: 0,
          moving: false,
          withPowerUp: false,
        }),
      )
    } else if (action.type === 'SET_COOLDOWN') {
      return state.TanksMap.update(action.tankId, tank => tank.set('cooldown', action.cooldown))
    } else if (action.type === 'SET_AI_FROZEN_TIMEOUT') {
      return state.TanksMap.map(
        tank =>
        tank.side === 'ai' ?
        tank.set('moving', false).set('frozenTimeout', action.AIFrozenTimeout) :
        tank,
      )
    } else if (action.type === 'SET_FROZEN_TIMEOUT') {
      return state.TanksMap.update(action.tankId, tank =>
        tank
        .set('frozenTimeout', action.frozenTimeout)
        // 如果tank从'自由'变为'冰冻', 那么将moving设置为false, 否则保持原样
        .set('moving', tank.frozenTimeout <= 0 && action.frozenTimeout > 0 && tank.moving),
      )
    } else if (action.type === 'SET_HELMET_DURATION') {
      return state.TanksMap.update(action.tankId, tank =>
        tank.set('helmetDuration', Math.max(0, action.duration)),
      )
    } else {
      return state
    }
  },
  tankForward(state) {

  },
  updateTank(state, {
    movedTank,
    xy,
    updater,
    distance
  }) {
    state.TanksMap =  state.TanksMap.map((tank) => {
      return tank.update(xy, updater(distance));
    })
    console.log( state.TanksMap.toObject())
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
