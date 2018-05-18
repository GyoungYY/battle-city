// {
//     fire: string
//     up: string
//     down: string
//     left: string
//     right: string
//   }


import last from 'lodash/last'
import pull from 'lodash/pull'
import directionController from './directionController'
export default function humanController(playerName, config, tank) {
  let canUpdate=true;
  let firePressing = false // 用来记录当前玩家是否按下了fire键
  let firePressed = false // 用来记录上一个tick内 玩家是否按下过fire键
  const pressed = [] // 用来记录上一个tick内, 玩家按下过的方向键
  document.addEventListener('keydown', onKeyDown.bind(this))
  document.addEventListener('keyup', onKeyUp.bind(this))


  // region function-definitions
  function tryPush(direciton) {
    if (!pressed.includes(direciton)) {
      pressed.push(direciton)
    }
  }

  function onKeyDown(event) {
    const key = event.key.toLowerCase()
    let currentTank = this.$store.getters.tanks.filter(item => {
      return item.tankId == tank.tankId;
    })
    if (currentTank.size > 0) {
      tank = currentTank.get(1);
    } else {
      document.addEventListener('keydown',onKeyDown.bind(this))
      document.addEventListener('keyup',onKeyUp.bind(this))
      return false;
    }
    if (key === config.fire) {
      firePressing = true
      firePressed = true
      let bullet = {
        x: tank.direction === "up" || tank.direction === "down" ? (tank.x + 6) : (tank.direction === "left" ? tank.x : tank.x + 16),
        y: tank.direction === "left" || tank.direction === "right" ? (tank.y + 6) : (tank.direction === "up" ? tank.y : tank.y + 16),
        direction: tank.direction,
        tankId: tank.tankId
      }
      if (!this.$store.getters.bullets.length) {
        let tick = setInterval(this.$store.dispatch, 10, 'handleTick');
        this.$store.commit('setTick', tick);
      }
      this.$store.commit('addNewBullets', bullet);
    } else if (key == config.left) {
      tryPush('left')
    } else if (key === config.right) {
      tryPush('right')
    } else if (key === config.up) {
      tryPush('up')
    } else if (key === config.down) {
      tryPush('down')
    }
    if(!canUpdate){
      return false
    }
    this.$nextTick(()=>{
      canUpdate = true;
      setTimeout(() => {
        directionController.call(this, playerName, getHumanPlayerInput, tank);
      }, 10);
    })
  }

  function onKeyUp(event) {
    const key = event.key.toLowerCase()

    if (key === config.fire) {
      firePressing = false
    } else if (key === config.left) {
      pull(pressed, 'left');
    } else if (key === config.right) {
      pull(pressed, 'right');
    } else if (key === config.up) {
      pull(pressed, 'up');
    } else if (key === config.down) {
      pull(pressed, 'down');
    }
  }

  // 调用该函数来获取当前用户的移动操作(坦克级别)
  function getHumanPlayerInput(tank) {
    const direction = pressed.length > 0 ? last(pressed) : null
    if (direction != null) {
      if (direction !== tank.direction) {
        return {
          type: 'turn',
          direction
        }
      } else {
        return {
          type: 'forward'
        }
      }
    }
  }
  // endregion
}

function getTankMoveSpeed(tank) {
  // todo 需要校准数值
  if (tank.side === 'human') {
    return 0.045
  } else {
    if (tank.level === 'power') {
      return 0.045
    } else if (tank.level === 'fast') {
      return 0.06
    } else {
      // baisc or armor
      return 0.03
    }
  }
}

