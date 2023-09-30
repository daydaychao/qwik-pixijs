import { type AnimatedSprite } from 'pixi.js'
import type { IDirection } from '~/core/types'
// 播放动画
export const updateMoveAnime = ({
  direction,
  animation,
}: {
  direction: IDirection
  animation: Record<IDirection, AnimatedSprite> | null
}) => {
  if (!['down', 'left', 'right', 'up'].includes(direction)) return
  if (!animation) return

  // 播放动画
  animation[direction].visible = true
  animation[direction].play()

  // 停止/隱藏 其他动画
  Object.keys(animation).forEach((key) => {
    if (key !== direction) {
      animation[key as keyof typeof animation].stop()
      animation[key as keyof typeof animation].visible = false
    }
  })
}
