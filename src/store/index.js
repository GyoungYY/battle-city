import Vue from 'vue'
import Vuex from 'vuex'
import gameScene from './modules/gameScene'
import players from './modules/players'
import tanks from './modules/tanks'
import bullet from './modules/bullet'
import destroyBullets from './modules/destroyBullets'
import MapRecord from '../types/MapRecord'
import {
  GameRecord
} from '../types/game'
// import createLogger from '../../../src/plugins/logger'


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

export default new Vuex.Store({
  state: {
    cache: new Map(),
    map: defaultStages.first().map,
    stages: new List(),
    game: new GameRecord(),
    time: 0,
    players: [],
    tanks: [],
    bullets: [],
    eagle: {}
  },
  getters: {
    time: state => state.time,
    map: state => state.map,
    cache: state => state.cache,
    stages: state => state.stages,
    game: state => state.game,
  },
  mutations: {
    setCache(state, {
      key,
      url
    }) {
      state.cache.set(key, url)
    },
    addNewBullets(state, bullet) {
      state.bullets.push(bullet);
    }
  },
  modules: {
    gameScene,
    players,
    tanks,
    bullet,
    destroyBullets
  },
  strict: debug,
})
