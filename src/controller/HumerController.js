// {
//     fire: string
//     up: string
//     down: string
//     left: string
//     right: string
//   }
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
  directionController(playerName, getHumanPlayerInput,tank),

  // region function-definitions
  function tryPush(direciton) {
    if (!pressed.includes(direciton)) {
      pressed.push(direciton)
    }
  }

  function onKeyDown(event) {
    const key = event.key.toLowerCase()
    console.log(this);
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
  }

  function onKeyUp(event) {
    const key = event.key.toLowerCase()
    if (key === config.fire) {
      firePressing = false
    } else if (key === config.left) {
      pull(pressed, 'left')
    } else if (key === config.right) {
      pull(pressed, 'right')
    } else if (key === config.up) {
      pull(pressed, 'up')
    } else if (key === config.down) {
      pull(pressed, 'down')
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
