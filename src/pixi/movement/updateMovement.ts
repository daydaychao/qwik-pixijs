import { CollisionEnum, type ICharacter, type IDirection } from '~/core/types'
import type { Sprite } from 'pixi.js'
import { isNil } from 'ramda'
import { updateCharPosition } from './updateCharPosition'

// 計算移動
interface IUpdateMovement {
  self: ICharacter
  targets: ICharacter[]
  direction: IDirection
  dirX: number
  dirY: number
}

export const updateMovement = async ({ self, targets, dirX, dirY, direction }: IUpdateMovement) => {
  targets.forEach((target) => {
    // 檢查角色和其他物體之間的碰撞
    if (target.charId === self.charId) return
    if (!checkCollision(self.sprite, target.sprite)) {
      console.log('%cMOVE', 'color: lightblue')
      updateCharPosition({ forceX: dirX * self.mv, forceY: dirY * self.mv, direction, character: self })
      return
    }

    if (target.collision === CollisionEnum.CAN_NOT_PUSH) {
      console.log('%cCAN_NOT_PUSH', 'color: red')

      // 停止角色移動
      updateCharPosition({ forceX: 0, forceY: 0, direction, character: self })
      updateCharPosition({ forceX: 0, forceY: 0, direction, character: target })
      return
    }

    // 检查角色和其他物体之间的碰撞
    if (target.collision === CollisionEnum.CAN_PUSH) {
      console.log('%cCAN_PUSH', 'color: lightgreen')
      let moveData = { charMoveX: 0, charMoveY: 0, targetMoveX: 0, targetMoveY: 0 }
      const offset = 5

      if (direction === 'left') {
        moveData = { charMoveX: dirX * self.mv, charMoveY: 0, targetMoveX: dirX * self.mv * offset, targetMoveY: 0 }
      } else if (direction === 'right') {
        moveData = { charMoveX: dirX * self.mv, charMoveY: 0, targetMoveX: dirX * self.mv * offset, targetMoveY: 0 }
      } else if (direction === 'up') {
        moveData = { charMoveX: 0, charMoveY: dirY * self.mv, targetMoveX: 0, targetMoveY: dirY * self.mv * offset }
      } else if (direction === 'down') {
        moveData = { charMoveX: 0, charMoveY: dirY * self.mv, targetMoveX: 0, targetMoveY: dirY * self.mv * offset }
      }

      // 停止角色移動
      updateCharPosition({ forceX: moveData.targetMoveX, forceY: moveData.targetMoveY, direction, character: target })
      updateCharPosition({ forceX: moveData.charMoveX, forceY: moveData.charMoveY, direction, character: self })
      return
    }
  })
}
// 檢測碰撞
const checkCollision = (sprite1?: Sprite, sprite2?: Sprite): boolean => {
  if (isNil(sprite1) || isNil(sprite2)) return false
  const bounds1 = sprite1.getBounds()
  const bounds2 = sprite2.getBounds()
  return (
    bounds1.x + bounds1.width > bounds2.x &&
    bounds1.x < bounds2.x + bounds2.width &&
    bounds1.y + bounds1.height > bounds2.y &&
    bounds1.y < bounds2.y + bounds2.height
  )
}
