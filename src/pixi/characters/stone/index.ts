import { CollisionEnum, MapLayerEnum, type ICharacter } from '~/core/types'
import type { IApp } from '../../startPixi'
import { renderSprite } from '../renderSprite'
import stoneImg from '~/images/objects/stone.png'
import { nanoid } from 'nanoid'
import { save } from '~/pixi/system/save'
export const Stone = async (app: IApp, x = 0, y = 0): Promise<ICharacter> => {
  const sprite = await renderSprite({
    app: app,
    texture: stoneImg,
    x: x,
    y: y,
  })

  const stone: ICharacter = {
    name: 'Stone',
    hp: 100,
    mv: 0,
    charId: nanoid(),
    collision: CollisionEnum.CAN_PUSH,
    mapLayer: MapLayerEnum.CHARACTER,
    sprite: sprite,
  }

  save({ app, character: stone, sprite: sprite })
  return stone
}
