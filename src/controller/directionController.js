import canTankMove from '../utils/canTankMover'
export const inc = amount => x => x + amount
export const dec = amount => x => x - amount
export const or = amount => x => x | amount
export const add = (x, y) => x + y

function move(tank) {
  return {
    type: 'MOVE',
    tankId: tank.tankId,
    x: tank.x,
    y: tank.y,
    direction: tank.direction
  }
}

function getTankMoveSpeed(tank) {
  // todo 需要校准数值
  if (tank.side === 'human') {
    return 0.1
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

export default function directionController(
  playerName,
  getPlayerInput,
  tank
) {
  //   const { delta }: Action.TickAction = yield take('TICK')
  if (tank == null || tank.frozenTimeout > 0) {
    return;
  }
  let delta = 20;
  const input = getPlayerInput(tank)
  let nextFrozenTimeout = tank.frozenTimeout <= 0 ? 0 : tank.frozenTimeout - delta

  if (input == null) {
    if (tank.moving) {
      //   yield put({ type: 'STOP_MOVE', tankId: tank.tankId })
    }
  } else if (input.type === 'turn') {
    const {
      direction
    } = input
    // 坦克进行转向时, 需要对坐标进行处理
    // 如果转向UP/DOWN, 则将x坐标转换到最近的8的倍数
    // 如果转向为LEFT/RIGHT, 则将y坐标设置为最近的8的倍数
    // 这样做是为了使坦克转向之后更容易的向前行驶, 因为障碍物(brick/steel/river)的坐标也总是4或8的倍数
    // 但是有的时候简单的使用Math.round来转换坐标, 可能使得坦克卡在障碍物中
    // 所以这里转向的时候, 需要同时尝试Math.floor和Math.ceil来转换坐标
    const turned = tank.set('direction', direction) // 转向之后的tank对象
    // 要进行校准的坐标字段
    const {
      xy,
      updater
    } = getDirectionInfo(direction, true)
    const n = tank.get(xy, undefined) / 8
    const useFloor = turned.set(xy, Math.floor(n) * 8)
    const useCeil = turned.set(xy, Math.ceil(n) * 8)
    const canMoveWhenUseFloor = canTankMove(this.$store.state, useFloor);
    const canMoveWhenUseCeil = canTankMove(this.$store.state, useCeil);
    let movedTank
    if (!canMoveWhenUseFloor) {
      movedTank = useCeil
    } else if (!canMoveWhenUseCeil) {
      movedTank = useFloor
    } else {
      // use-round
      movedTank = turned.set(xy, Math.round(n) * 8)
    }
    this.$store.commit('changeTankDirection', {
      movedTank: movedTank,
    })
    // yield put(move(movedTank))
  } else if (input.type === 'forward') {
    const speed = getTankMoveSpeed(tank)
    const distance = Math.min(delta * speed, input.maxDistance || Infinity)

    const {
      xy,
      updater
    } = getDirectionInfo(tank.direction)
    const movedTank = tank.update(xy, updater(distance))
    if (canTankMove(this.$store.state, movedTank)) {
      this.$store.commit('updateTank', {
        movedTank: movedTank,
        xy,
        updater,
        distance
      })
    }
  } else {
    throw new Error(`Invalid input: ${input}`)
  }

}
