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
  let firePressing = false // 用来记录当前玩家是否按下了fire键
  let firePressed = false // 用来记录上一个tick内 玩家是否按下过fire键
  const pressed = [] // 用来记录上一个tick内, 玩家按下过的方向键
  document.addEventListener('keydown', () => {
    onKeyDown.call(this, event)
  })
  document.addEventListener('keyup', () => {
    onKeyUp.call(this, event)
  })


  // region function-definitions
  function tryPush(direciton) {
    if (!pressed.includes(direciton)) {
      pressed.push(direciton)
    }
    console.log(pressed);
  }

  function onKeyDown(event) {
    const key = event.key.toLowerCase()
    if (key === config.fire) {
      firePressing = true
      firePressed = true
    } else if (key == config.left) {
      tryPush('left')
    } else if (key === config.right) {
      tryPush('right')
    } else if (key === config.up) {
      tryPush('up')
    } else if (key === config.down) {
      tryPush('down')
    }
    directionController.call(this, playerName, getHumanPlayerInput, tank);
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

  function* resetFirePressedEveryTick() {
    // 每次tick时, 都将firePressed重置
    while (true) {
      yield take('TICK')
      firePressed = false
    }
  }
  // endregion
}


export const inc = amount => x => x + amount
export const dec = amount => x => x - amount
export const or = amount => x => x | amount
export const add = (x, y) => x + y

function direction(tank, getDirectionInfo) {

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

function getDirectionInfo(direction, flipxy = false) {
  let result = {};
  if (direction === 'up') {
    result = {
      xy: 'y',
      updater: dec
    }
  } else if (direction === 'down') {
    result = {
      xy: 'y',
      updater: inc
    }
  } else if (direction === 'left') {
    result = {
      xy: 'x',
      updater: dec
    }
  } else if (direction === 'right') {
    result = {
      xy: 'x',
      updater: inc
    }
  } else {
    throw new Error('Invalid direction')
  }
  if (flipxy) {
    result.xy = result.xy === 'x' ? 'y' : 'x'
  }
  return result
}
