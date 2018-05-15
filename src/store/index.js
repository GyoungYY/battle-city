import Vue from 'vue'
import Vuex from 'vuex'
import gameScene from './modules/gameScene'
import MapRecord from '../types/MapRecord'
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
    map: defaultStages.first().map
  },
  getters: {
    map: state => state.map
  },
  modules: {
    gameScene,
  },
  strict: debug,
})
