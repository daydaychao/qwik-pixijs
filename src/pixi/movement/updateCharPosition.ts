import type { ICharacter, IDirection } from '~/core/types'

// 更新角色移動
export const updateCharPosition = ({
  forceX,
  forceY,
  character,
  direction,
}: {
  forceX: number
  forceY: number
  character: ICharacter
  direction: IDirection
}) => {
  character.direction = direction
  character.x += forceX
  character.y += forceY
  character.container.x = character.x
  character.container.y = character.y

  return { charX: character.x, charY: character.y, direction }
}
