import { Record } from 'immutable'
import TankRecord from './TankRecord'

const PlayerRecordBase = Record({
  playerName: null ,
  side: 'human' ,
  activeTankId: -1,
  lives: 0,
  score: 0,
  active: false,
  reservedTank: null ,
})

export default class PlayerRecord extends PlayerRecordBase {
  static fromJS(object) {
    return new PlayerRecord(object).update('reservedTank', TankRecord.fromJS)
  }
}
