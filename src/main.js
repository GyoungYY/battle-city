// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import store from './store'
import 'normalize.css'
import './battle-city.css'

Vue.use(Vuex)

Vue.config.productionTip = false
let renderToString = require('vue-server-renderer/basic.js');

console.log(renderToString)

/* eslint-disable no-new */
let a = new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})

