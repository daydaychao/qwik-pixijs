import { isEmpty } from 'ramda'
import { type ICharacter } from '~/core/types'

// 播放动画
export const updateAnimate = ({ character }: { character: ICharacter }) => {
  const direction = character.direction
  const animeKey = character.animeKey
  const animations = character.animations

  let playKey: string
  if (!animeKey) playKey = direction
  if (animeKey) playKey = animeKey

  if (isEmpty(animations) || !animations) return

  Object.keys(animations).forEach((anime) => {
    // 播放动画
    if (playKey == '') return
    if (anime == playKey) {
      console.log({ type: 'yes', playKey, anime })
      animations[anime].visible = true
      animations[anime].play()
    }

    // 停止/隱藏 其他动画
    if (anime !== playKey) {
      console.log({ type: 'no', playKey, anime })
      animations[anime].stop()
      animations[anime].visible = false
    }
  })
}
