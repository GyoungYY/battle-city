import Vue from 'vue'
import Vuex from 'vuex'
import gameScene from './modules/gameScene'
import MapRecord from '../types/MapRecord'
// import createLogger from '../../../src/plugins/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state: {
    map: new MapRecord()
  },
  getters: {
    map: state => state.map
  },
  modules: {
    gameScene,
  },
  strict: debug,
})
