import { CollisionEnum, MapLayerEnum, type ICharacter } from '~/core/types'
import type { IApp } from '../../startPixi'
import { initSprite } from '../initSprite'
import farisJpg from '~/images/charactors/white-mage/ff5_faris-0.png'
import { nanoid } from 'nanoid'
import { save } from '~/pixi/system/save'
import { addMoveControl } from '~/pixi/movement/move'

import farisLeft0 from '~/images/charactors/white-mage/left/0.png'
import farisLeft1 from '~/images/charactors/white-mage/left/1.png'
import farisRight0 from '~/images/charactors/white-mage/right/0.png'
import farisRight1 from '~/images/charactors/white-mage/right/1.png'

import faris3 from '~/images/charactors/white-mage/ff5_faris-3.png'
import faris4 from '~/images/charactors/white-mage/ff5_faris-4.png'
import faris5 from '~/images/charactors/white-mage/ff5_faris-5.png'

import { initAnimations as initAnimations } from '../initAnimations'

export const Faris = async (app: IApp, x = 0, y = 0): Promise<ICharacter> => {
  const scale = 1.5
  const animationSpeed = 0.05

  const sprite = await initSprite({
    app: app,
    texture: farisJpg,
    x: x,
    y: y,
    scale: scale,
  })
  //他有動畫所以先設隱藏
  sprite.visible = false

  const dirList = {
    up: [faris3, faris3, faris3],
    down: [faris3, faris4, faris5],
    left: [farisLeft0, farisLeft1],
    right: [farisRight0, farisRight1],
  }
  const animations = await initAnimations({ app, dirList, scale, x, y, animationSpeed })

  const faris: ICharacter = {
    name: 'Faris',
    hp: 100,
    mv: 6,
    charId: nanoid(),
    collision: CollisionEnum.CAN_NOT_PUSH,
    mapLayer: MapLayerEnum.CHARACTER,
    sprite: sprite,
    animations: {
      move: {
        ...animations,
      },
    },
    direction: 'down', // 初始方向
  }

  addMoveControl(app, faris)

  save({ app, character: faris })
  return faris
}
