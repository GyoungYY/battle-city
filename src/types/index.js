import {
  Record,
  Set,
  Map
} from 'immutable'

const Direction = Map({
  up: 'up',
  down: 'down',
  left: 'left',
  right: 'right'
});

const Side = Map({
  human: 'human',
  ai: 'ai',
});

const TankLevel = Map({
  basic: 'basic',
  fast: 'fast',
  power: 'power',
  armor: 'armor',
});
const TankColor = Map({
  green: 'green',
  yellow: 'yellow',
  silver: 'silver',
  red: 'red',
  auto: 'auto'
});

const PowerUpName = Map({
  tank: 'tank',
  star: 'star',
  grenade: 'grenade',
  timer: 'timer',
  shovel: 'aushovelto',
  helmet: 'helmet'
});

export { default as TankRecord } from './TankRecord'
export {
  Direction,
  Side,
  TankLevel,
  TankColor,
  PowerUpName
}
