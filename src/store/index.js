import Vue from 'vue'
import Vuex from 'vuex'
import gameScene from './modules/gameScene'
// import createLogger from '../../../src/plugins/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state: {
    game: {
      aaa: 1
    }
  },
  modules: {
    gameScene,
  },
  strict: debug,
})
