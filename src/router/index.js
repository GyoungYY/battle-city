import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import GameScene from '@/components/GameScene'
Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/game',
      name: 'GameScene',
      component: GameScene
    }, {
      path: '/editor',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/gallery',
      name: 'HelloWorld',
      component: HelloWorld
    }, {
      path: '/gameover',
      name: 'HelloWorld',
      component: HelloWorld
    }, {
      path: '/choose',
      name: 'HelloWorld',
      component: HelloWorld
    }, {
      path: '/stage',
      name: 'HelloWorld',
      component: HelloWorld
    }
  ]
})
