import {BulletRecord, BulletsMap, ExplosionRecord} from '../../types'
import {frame as f, getNextId} from '../../utils/common'

const mutations = {
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
/** 移除单个子弹, 调用explosionFromBullet来生成子弹爆炸(并在之后移除子弹爆炸效果) */

/** 调用destroyBullet并使用ALL effects, 来同时移除若干个子弹 */
// export default function* destroyBullets(bullets, useExplosion) {   if
// (!bullets.isEmpty()) {     yield all(       bullets         .toIndexedSeq()
//       .toArray()         .map(bullet => destroyBullet(bullet, useExplosion)),
//     )   } }
export default {
    mutations,
    actions
}
