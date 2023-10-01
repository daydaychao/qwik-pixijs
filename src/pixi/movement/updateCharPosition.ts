import type { ICharacter } from '~/core/types'

// 更新角色移動
export const updateCharPosition = ({
  forceX,
  forceY,
  character,
}: {
  forceX: number
  forceY: number
  character: ICharacter
}) => {
  character.x += forceX
  character.y += forceY
  character.container.position.set(character.x, character.y)
  return character
}
