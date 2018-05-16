import {
  List,
  Map,
  Repeat,
  Record
} from 'immutable'
const emptyTransientKillInfo = Map({
  'player-1': Map({
    basic: -1,
    fast: -1,
    power: -1,
    armor: -1,
  }),
  'player-2': Map({
    basic: -1,
    fast: -1,
    power: -1,
    armor: -1,
  }),
})
const defaultRemainingEnemies = Repeat('basic', 20).toList();
const GameRecordBase = Record({
    /** 游戏状态 */
    status: 'idle',
    /** 游戏是否暂停 */
    paused: false,
    /** 上次进行的关卡名 */
    lastStageName: null,
    /** 当前的关卡名 */
    currentStageName: null,
    /** 即将开始的关卡的名称 */
    comingStageName: null,
    /** 当前关卡剩余的敌人的类型列表 */
    remainingEnemies: defaultRemainingEnemies,
    /** 当前关卡的击杀信息 */
    killInfo: new Map(),
    /** 当前关卡的击杀信息, 用于进行动画播放 */
    transientKillInfo: emptyTransientKillInfo,
    /** 关卡击杀信息动画, 是否显示total的数量 */
    showTotalKillCount: false,
    /** AI坦克的冻结时间. 小于等于0表示没有冻结, 大于0表示还需要一段时间解冻 */
    AIFrozenTimeout: 0,

    /** 是否显示HUD */
    showHUD: false,

    /** stage-enter-curtain相关字段 */
    stageEnterCurtainT: 0,
  },
  'GameRecord',
)

export class GameRecord extends GameRecordBase {}
