import Vue from 'vue'
import Router from 'vue-router'
import GameScene from '@/components/GameScene'
import GameTitleScene from '@/components/GameTitleScene'
Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'GameTitleScene',
      component: GameTitleScene
    },
    {
      path: '/game',
      name: 'GameScene',
      component: GameScene
    }
  ]
})
