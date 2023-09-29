import { CollisionEnum, MapLayerEnum, type ICharacter } from '~/core/types'
import type { IApp } from '../../startPixi'
import { renderSprite } from '../renderSprite'
import farisJpg from '~/images/charactors/white-mage/faris0.jpg'
import { nanoid } from 'nanoid'
import { save } from '~/pixi/system/save'
import { addMoveControl } from '~/pixi/movement/move'
export const Faris = async (app: IApp, x = 0, y = 0): Promise<ICharacter> => {
  const sprite = await renderSprite({
    app: app,
    texture: farisJpg,
    x: x,
    y: y,
  })

  const faris: ICharacter = {
    name: 'Faris',
    hp: 100,
    mv: 6,
    charId: nanoid(),
    collision: CollisionEnum.CAN_NOT_PUSH,
    mapLayer: MapLayerEnum.CHARACTER,
    sprite: sprite,
  }

  addMoveControl(app, faris)

  save({ app, character: faris, sprite: sprite })
  return faris
}
