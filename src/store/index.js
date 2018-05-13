import Vue from 'vue'
import Vuex from 'vuex'
import gameScene from './modules/gameScene'
// import createLogger from '../../../src/plugins/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    gameScene,
  },
  strict: debug,
})