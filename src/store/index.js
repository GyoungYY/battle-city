import Vue from 'vue'
import Vuex from 'vuex'
import gameScene from './modules/gameScene'
import players from './modules/players'
import tanks from './modules/tanks'
import bullet from './modules/bullet'
import MapRecord from '../types/MapRecord'
import {
  GameRecord
} from '../types/game'
// import createLogger from '../../../src/plugins/logger'
import {
  calculateBulletStartPosition,
  getNextId,
  getTankBulletInterval,
  getTankBulletLimit,
  getTankBulletPower,
  getTankBulletSpeed,
} from '../utils/common'
import BulletRecord from '../types/BulletRecord'


Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'
import {
  List
} from 'immutable'
import StageConfig from '../types/StageConfig'
const requireStage = require.context('../stages', false, /\.json/)
const filenames = List(requireStage.keys())

let defaultStages = filenames
  .map(requireStage).map(StageConfig.fromRawStageConfig)
  // 按照关卡数字顺序排序
  .sortBy(s => Number(s.name));
let mapObj = defaultStages.first().map;
export default new Vuex.Store({
  state: {
    cache: new Map(),
    map: mapObj,
    stages: new List(),
    game: new GameRecord(),
    time: 0,
    players: [],
    tanks: [],
    eagle: {},
    bricks: mapObj.bricks
  },
  getters: {
    time: state => state.time,
    map: state => state.map,
    cache: state => state.cache,
    stages: state => state.stages,
    game: state => state.game,
    bullets: state => state.bullet.bullets,
    bricks: state => state.bricks
  },
  mutations: {
    setCache(state, {
      key,
      url
    }) {
      state.cache.set(key, url)
    },
    updateMap(state,
      bricksIndex
    ) {
      state.bricks = state.bricks.update(bricksIndex, value => false);
      state.map = state.map.update('bricks', value => state.bricks);
    }

  },
  modules: {
    gameScene,
    players,
    tanks,
    bullet,
  },
  strict: debug,
})
