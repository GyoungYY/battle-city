import {Set as ISet} from 'immutable'
import {BulletRecord, BulletsMap, State} from '../types'
import {BulletCollisionInfo, getCollisionInfoBetweenBullets, getMBR, lastPos, spreadBullet} from '../utils/bullet-utils'
import {asRect, DefaultMap, getDirectionInfo, testCollide} from '../utils/common'
import {BULLET_SIZE, FIELD_SIZE, STEEL_POWER} from '../utils/constants'
import IndexHelper from '../utils/IndexHelper'
import destroyBullets from './destroyBullets'

// interface Stat {     /** 坦克被击中的统计 */     readonly tankHitMap:
// DefaultMap<TankId, BulletRecord[]>     readonly bulletCollisionInfo:
// BulletCollisionInfo }

const state = {
    bullets: []
}

const mutations = {
    updatedBullet (updatedBullets) {

    },
    destroyEagle ({state, rootSate}) {
        rootSate.eagle.broken = true;
    }
}

const actions = {
    handleTick({state, commit, rootSate}) {
        while (true) {
            //   const { delta }: Action.TickAction = yield take('TICK')   const { bullets
            // }: State = yield select()
            if (state.bullets.isEmpty()) {
                continue;
            }
            const updatedBullets = state.bullets.map(bullet => {
                const {direction, speed} = bullet;
                const distance = speed * delta;
                const {xy, updater} = getDirectionInfo(direction)
                return bullet.update(xy, updater(distance)).set('lastX', bullet.x).set('lastY', bullet.y); // 设置子弹上一次的位置, 用于进行碰撞检测
            });
            commit('updatedBullet', updatedBullets);
        }
    },
    destroyEagleIfNeeded({state, commit, rootSate}, expBullets) {
        const eagle = rootSate.eagle;
        const eagleBox = asRect(eagle);
        for (const bullet of expBullets.values()) {
            const spreaded = spreadBullet(bullet)
            if (testCollide(eagleBox, spreaded)) {
                commit('destroyEagle');
                return;
            }
        }
    },
    handleBulletsCollidedWithTanks({state, commit, rootSate}, stat) {
        let bullets = state.bullets;
        let tanks = state.tanks;
        const activeTanks = tanks.filter(t => t.active);
    
        // 子弹与坦克碰撞的规则
        // 1. player的子弹打到player-tank: player-tank将会停滞一段时间
        // 2. player的子弹打到AI-tank: AI-tank扣血
        // 3. AI的子弹打到player-tank: player-tank扣血/死亡
        // 4. AI的子弹达到AI-tank: 不发生任何事件
        for (const bullet of bullets.values()) {
            for (const tank of activeTanks.values()) {
                if (tank.tankId === bullet.tankId) {
                    // 如果是自己发射的子弹, 则不需要进行处理
                    continue;
                }
                const subject = asRect(tank);
                const mbr = getMBR(asRect(lastPos(bullet)), asRect(bullet))
                if (testCollide(subject, mbr, -0.02)) {
                    const bulletSide = allTanks.find(t => t.tankId === bullet.tankId).side;
                    const tankSide = tank.side;
                    const infoRow = stat.bulletCollisionInfo.get(bullet.bulletId)
    
                    if (bulletSide === 'human') {
                        // tankSide 是 human 还是 ai 都是相同的处理
                        stat.tankHitMap.get(tank.tankId).push(bullet)
                        infoRow.push({type: 'tank', tank, shouldExplode: true})
                    } else if (bulletSide === 'ai' && tankSide === 'human') {
                        if (tank.helmetDuration > 0) {
                            infoRow.push({type: 'tank', tank, shouldExplode: false})
                        } else {
                            stat.tankHitMap.get(tank.tankId).push(bullet)
                            infoRow.push({type: 'tank', tank, shouldExplode: true})
                        }
                    } else if (bulletSide === 'ai' && tankSide === 'ai') {
                        // 子弹穿过坦克
                    } else {
                        throw new Error('Error side status')
                    }
                }
            }
        }
    },
    handleBulletsCollidedWithBullets(stat, state, delta) {
        const {bullets} = state
        for (const bullet of bullets.values()) {
            for (const other of bullets.values()) {
                if (bullet.bulletId <= other.bulletId) {
                    continue
                }
                const collisionInfo = getCollisionInfoBetweenBullets(bullet, other, delta)
                if (collisionInfo) {
                    const [info1, info2] = collisionInfo
                    stat.bulletCollisionInfo.get(bullet.bulletId).push(info1);
                    stat.bulletCollisionInfo.get(other.bulletId).push(info2);
                }
            }
        }
    },
    handleBulletsCollidedWithEagle({ bulletCollisionInfo }, state) {
        const {bullets, map: {
                eagle
            }} = state
        if (eagle == null || eagle.broken) {
            // 如果Eagle尚未加载, 或是已经被破坏, 那么直接返回
            return
        }
        const eagleBox = asRect(eagle)
        for (const bullet of bullets.values()) {
            const mbr = getMBR(asRect(bullet), asRect(lastPos(bullet)))
            if (testCollide(eagleBox, mbr)) {
                bulletCollisionInfo.get(bullet.bulletId).push({type: 'eagle', eagle})
            }
        }
    },
    spawnHitActions({ tanks, players }, stat) {
        for (const [targetTankId, hitBullets] of stat.tankHitMap) {
            // 这里假设一帧内最多只有一发子弹同时击中一架坦克
            const bullet = hitBullets[0]
            const sourceTankId = bullet.tankId
            const sourcePlayerName = bullet.playerName
            // yield put < Action.Hit > ({
            //     type: 'HIT',
            //     bullet,
            //     sourcePlayer: players.get(sourcePlayerName),
            //     sourceTank: tanks.get(sourceTankId),
            //     targetPlayer: players.find(p => p.activeTankId === targetTankId),
            //     targetTank: tanks.get(targetTankId)
            // })
        }
    },
    handleAfterTick() {
        while (true) {
            const {delta} = yield take('AFTER_TICK')
            const state = yield select()
    
            // 新建一个统计对象(stat), 用来存放这一个tick中的统计信息 注意这里的Set是ES2015的原生Set
            const stat = {
                tankHitMap: new DefaultMap(() => []),
                bulletCollisionInfo: new BulletCollisionInfo(state.bullets)
            }
    
            handleBulletsCollidedWithEagle(stat, state)
            handleBulletsCollidedWithTanks(stat, state)
            handleBulletsCollidedWithBullets(stat, state, delta)
            handleBulletsCollidedWithBricks(stat, state)
            handleBulletsCollidedWithSteels(stat, state)
            handleBulletsCollidedWithBorder(stat, state)
    
            const {expBullets, noExpBullets} = stat
                .bulletCollisionInfo
                .getExplosionInfo()
    
            // 产生爆炸效果, 并移除子弹
            yield fork(destroyBullets, expBullets, true)
            // 不产生爆炸, 直接消失的子弹
            yield fork(destroyBullets, noExpBullets, false)
    
            if (!expBullets.isEmpty()) {
                // 只有产生爆炸效果的子弹才会破坏附近的brickWall/steelWall/eagle
                yield destroyEagleIfNeeded(expBullets)
                yield destroyBricks(expBullets)
                yield destroySteels(expBullets)
            }
    
            yield spawnHitActions(state, stat)
        }
    },
    clearBullets() {
        // yield put < Action > ({type: 'CLEAR_BULLETS'})
    }
}


// export default function * bulletsSaga() {
//     try {
//         yield takeEvery('END_STAGE', clearBullets)
//         yield all([handleTick(), handleAfterTick()])
//     } finally {
//         yield clearBullets()
//     }
// }

export default {
    state,
    mutations,
    actions,
    getters
}