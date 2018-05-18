import {Set as ISet} from 'immutable'
import {BulletCollisionInfo, getCollisionInfoBetweenBullets, getMBR, lastPos, spreadBullet} from './../../utils/bullet-utils'
import {asRect, DefaultMap, getDirectionInfo, testCollide} from './../../utils/common'
import {BULLET_SIZE, FIELD_SIZE, STEEL_POWER} from './../../utils/constants'
import IndexHelper from './../../utils/IndexHelper'
import {BulletRecord, BulletsMap, ExplosionRecord} from '../../types'
import {
    calculateBulletStartPosition,
    getNextId,
    getTankBulletInterval,
    getTankBulletLimit,
    getTankBulletPower,
    getTankBulletSpeed,
  } from './../../utils/common'

// interface Stat {     /** 坦克被击中的统计 */     readonly tankHitMap:
// DefaultMap<TankId, BulletRecord[]>     readonly bulletCollisionInfo:
// BulletCollisionInfo }

// 
const state = {
    bullets: [],
    tick: null
}
const speed = 0.9;
const mutations = {
    setTick(state, tickName) {
        state.tick = tickName;
    },
    clearTick(state) {
        
    },
    addNewBullets(state, { x, y, direction, tankId }) {
        state.bullets.push(new BulletRecord({
          bulletId: getNextId('bullet'),
          direction,
          x,
          y,
          lastX: x,
          lastY: y,
          tankId,
        }));
      },
    destroyEagle ({state, rootSate}) {
        rootSate.eagle.broken = true;
    },
    updateBullet (state) {
        state.bullets = state.bullets.map(bullet => {
            if (bullet.direction === 'up') {
                bullet = bullet.set('y', bullet.get('y') - speed );
            } else if (bullet.direction === 'down') {
                bullet = bullet.set('y', bullet.get('y') + speed );
            } else if (bullet.direction === 'left') {
                bullet = bullet.set('x', bullet.get('x') - speed );
            } else {
                bullet = bullet.set('x', bullet.get('x') + speed );
            }
            return bullet;
        });
    },
    destroyBullets (state, clearBulletslist) {
        clearBulletslist.forEach(bullet => {
            state.bullets.splice(state.bullets.indexOf(bullet), 1); 
        });
        if (!state.bullets.length) {
            window.clearInterval(state.tick);
        }
    },
    removeExplosionAction (state, explosionId) {
        
    },
    addOrUpdateExplosion (state, explosion) {

    },
    beforeRemoveBulletAction (state, bulletId) {

    },
    removeBulletAction (state, bulletId) {

    }
}

const actions = {
    handleTick({ commit, dispatch, getters, state}) {
        commit('updateBullet');
        const stat = {
            tankHitMap: new DefaultMap(() => []),
            bulletCollisionInfo: new BulletCollisionInfo(state.bullets),
            borderHint: [],
            brickHint: []
        }
        dispatch('handleBulletsCollidedWithBricks', stat);
        // dispatch('handleBulletsCollidedWithSteels', stat);
        dispatch('handleBulletsCollidedWithBorder', stat);
        // const { expBullets, noExpBullets } = stat.bulletCollisionInfo.getExplosionInfo()
        let list = stat.borderHint.concat(stat.brickHint);
        if (list.length) {
            commit('destroyBullets', list);
        }
    },
    // destroyEagleIfNeeded({state, commit, rootSate}, expBullets) {
    //     const eagle = rootSate.eagle;
    //     const eagleBox = asRect(eagle);
    //     for (const bullet of expBullets.values()) {
    //         const spreaded = spreadBullet(bullet)
    //         if (testCollide(eagleBox, spreaded)) {
    //             commit('destroyEagle');
    //             return;
    //         }
    //     }
    // },
    handleBulletsCollidedWithBricks({ commit, dispatch, getters, state, rootGetters}, {brickHint}) {
        const bullets = state.bullets;
        const bricks = rootGetters.map.bricks;
        bullets.forEach(b => {
            const mbr = getMBR(asRect(b), asRect(lastPos(b)))
            for (const t of IndexHelper.iter('brick', mbr)) {
                if (bricks.get(t)) {
                    commit('updateMap', t);
                    brickHint.push(b);
                }
            }
        })
    },
    handleBulletsCollidedWithSteels({ state, rootGetters }, context) {
        const bullets = state.bullets;
        const steels = rootGetters.map.steels;
        bullets.forEach(b => {
            const mbr = getMBR(asRect(b), asRect(lastPos(b)))
            for (const t of IndexHelper.iter('steel', mbr)) {
                if (steels.get(t)) {
                    bulletCollisionInfo.get(b.bulletId).push({ type: 'steel', t })
                }
            }
        })
    },
    handleBulletsCollidedWithBorder({ state, rootGetters }, {borderHint}) {
        const bullets = state.bullets;
        bullets.forEach(bullet => {
            if (bullet.x <= 0) {
                borderHint.push(bullet)
            }
            if (bullet.x + BULLET_SIZE >= FIELD_SIZE) {
                borderHint.push(bullet)
            }
            if (bullet.y <= 0) {
                borderHint.push(bullet)
            }
            if (bullet.y + BULLET_SIZE >= FIELD_SIZE) {
                borderHint.push(bullet)
            }
        })
    },
    // handleBulletsCollidedWithTanks({state, commit, rootSate}, stat) {
    //     let bullets = state.bullets;
    //     let tanks = state.tanks;
    //     const activeTanks = tanks.filter(t => t.active);
    
    //     // 子弹与坦克碰撞的规则
    //     // 1. player的子弹打到player-tank: player-tank将会停滞一段时间
    //     // 2. player的子弹打到AI-tank: AI-tank扣血
    //     // 3. AI的子弹打到player-tank: player-tank扣血/死亡
    //     // 4. AI的子弹达到AI-tank: 不发生任何事件
    //     for (const bullet of bullets.values()) {
    //         for (const tank of activeTanks.values()) {
    //             if (tank.tankId === bullet.tankId) {
    //                 // 如果是自己发射的子弹, 则不需要进行处理
    //                 continue;
    //             }
    //             const subject = asRect(tank);
    //             const mbr = getMBR(asRect(lastPos(bullet)), asRect(bullet))
    //             if (testCollide(subject, mbr, -0.02)) {
    //                 const bulletSide = allTanks.find(t => t.tankId === bullet.tankId).side;
    //                 const tankSide = tank.side;
    //                 const infoRow = stat.bulletCollisionInfo.get(bullet.bulletId)
    
    //                 if (bulletSide === 'human') {
    //                     // tankSide 是 human 还是 ai 都是相同的处理
    //                     stat.tankHitMap.get(tank.tankId).push(bullet)
    //                     infoRow.push({type: 'tank', tank, shouldExplode: true})
    //                 } else if (bulletSide === 'ai' && tankSide === 'human') {
    //                     if (tank.helmetDuration > 0) {
    //                         infoRow.push({type: 'tank', tank, shouldExplode: false})
    //                     } else {
    //                         stat.tankHitMap.get(tank.tankId).push(bullet)
    //                         infoRow.push({type: 'tank', tank, shouldExplode: true})
    //                     }
    //                 } else if (bulletSide === 'ai' && tankSide === 'ai') {
    //                     // 子弹穿过坦克
    //                 } else {
    //                     throw new Error('Error side status')
    //                 }
    //             }
    //         }
    //     }
    // },
    // handleBulletsCollidedWithBullets(stat, state, delta) {
    //     const {bullets} = state
    //     for (const bullet of bullets.values()) {
    //         for (const other of bullets.values()) {
    //             if (bullet.bulletId <= other.bulletId) {
    //                 continue
    //             }
    //             const collisionInfo = getCollisionInfoBetweenBullets(bullet, other, delta)
    //             if (collisionInfo) {
    //                 const [info1, info2] = collisionInfo
    //                 stat.bulletCollisionInfo.get(bullet.bulletId).push(info1);
    //                 stat.bulletCollisionInfo.get(other.bulletId).push(info2);
    //             }
    //         }
    //     }
    // },
    // handleBulletsCollidedWithEagle({ bulletCollisionInfo }, state) {
    //     const {bullets, map: {
    //             eagle
    //         }} = state
    //     if (eagle == null || eagle.broken) {
    //         // 如果Eagle尚未加载, 或是已经被破坏, 那么直接返回
    //         return
    //     }
    //     const eagleBox = asRect(eagle)
    //     for (const bullet of bullets.values()) {
    //         const mbr = getMBR(asRect(bullet), asRect(lastPos(bullet)))
    //         if (testCollide(eagleBox, mbr)) {
    //             bulletCollisionInfo.get(bullet.bulletId).push({type: 'eagle', eagle})
    //         }
    //     }
    // },
    spawnHitActions({ tanks, players }, stat) {
        for (const [targetTankId, hitBullets] of stat.tankHitMap) {
            // 这里假设一帧内最多只有一发子弹同时击中一架坦克
            const bullet = hitBullets[0]
            const sourceTankId = bullet.tankId
            const sourcePlayerName = bullet.playerName
            commit('hit', {
                bullet,
                sourcePlayer: players.get(sourcePlayerName),
                sourceTank: tanks.get(sourceTankId),
                targetPlayer: players.find(p => p.activeTankId === targetTankId),
                targetTank: tanks.get(targetTankId)
            })
        }
    },
    handleAfterTick({ commit, getters, dispatch }) {
        if (getters.bullets.length) {
            const stat = {
                tankHitMap: new DefaultMap(() => []),
                bulletCollisionInfo: new BulletCollisionInfo(getters.bullets)
            }
            dispatch('handleBulletsCollidedWithBricks', stat, )
            handleBulletsCollidedWithBricks(stat, state)
            // handleBulletsCollidedWithSteels(stat, state)
            handleBulletsCollidedWithBorder(stat, state)
    
            const {expBullets, noExpBullets} = stat.bulletCollisionInfo.getExplosionInfo()
            commit('noExpBullets', noExpBullets);
        }
        // while (true) {
            // const {delta} = yield take('AFTER_TICK')
            // const state = yield select()
    
            // 新建一个统计对象(stat), 用来存放这一个tick中的统计信息 注意这里的Set是ES2015的原生Set
            // const stat = {
            //     tankHitMap: new DefaultMap(() => []),
            //     bulletCollisionInfo: new BulletCollisionInfo(getters.bullets)
            // }
    
            // handleBulletsCollidedWithEagle(stat, state)
            // handleBulletsCollidedWithTanks(stat, state)
            // handleBulletsCollidedWithBullets(stat, state, delta)
            // handleBulletsCollidedWithBricks(stat, state)
            // handleBulletsCollidedWithSteels(stat, state)
            // handleBulletsCollidedWithBorder(stat, state)
    
            // const {expBullets, noExpBullets} = stat.bulletCollisionInfo.getExplosionInfo()
    
            // commit('expBullets', expBullets);
            // commit('noExpBullets', noExpBullets);
            // 产生爆炸效果, 并移除子弹
            // yield fork(destroyBullets, expBullets, true)
            // 不产生爆炸, 直接消失的子弹
            // yield fork(destroyBullets, noExpBullets, false)
    
            // if (!expBullets.isEmpty()) {
            //     this.destroyEagleIfNeeded(expBullets);
            //     // 只有产生爆炸效果的子弹才会破坏附近的brickWall/steelWall/eagle
            // }
            // this.spawnHitActions(state, stat);
        // }
    },
    clearBullets() {
        commit('clearBullets');
    },
    explosionFromBullet({ state, commit, rootState }, bullet) {
        const bulletExplosionShapeTiming = [
            ['s0', f(4)],
            ['s1', f(3)],
            ['s2', f(2)]
        ]
        const explosionId = getNextId('explosion')
        for (const [shape, time] of bulletExplosionShapeTiming) {
            commit('addOrUpdateExplosion', {
                cx: bullet.x + 2,
                cy: bullet.y + 2,
                shape,
                explosionId
            });
            // yield Timing.delay(time)
        }
        commit('removeBulletAction', explosionId)
    },
    destroyBullet({ state, commit, rootState }, bullet, useExplosion) {
        commit('beforeRemoveBulletAction', bullet.bulletId);
        commit('removeBulletAction', bullet.bulletId);
        if (useExplosion) {
            this.explosionFromBullet(bullet)
        }
    }
}

export default {
    mutations,
    actions,
    state
}