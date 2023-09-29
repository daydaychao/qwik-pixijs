import { CollisionEnum, MapLayerEnum, type ICharacter } from '~/core/types'
import type { IApp } from '../../startPixi'
import { initSprite } from '../initSprite'
import farisJpg from '~/images/charactors/white-mage/ff5_faris-0.png'
import { nanoid } from 'nanoid'
import { save } from '~/pixi/system/save'
import { addMoveControl } from '~/pixi/movement/move'

import faris0 from '~/images/charactors/white-mage/ff5_faris-0.png'
import faris1 from '~/images/charactors/white-mage/ff5_faris-1.png'
import faris2 from '~/images/charactors/white-mage/ff5_faris-2.png'

import faris3 from '~/images/charactors/white-mage/ff5_faris-3.png'
import faris4 from '~/images/charactors/white-mage/ff5_faris-4.png'
import faris5 from '~/images/charactors/white-mage/ff5_faris-5.png'

import faris6 from '~/images/charactors/white-mage/ff5_faris-6.png'
import faris7 from '~/images/charactors/white-mage/ff5_faris-7.png'
import faris8 from '~/images/charactors/white-mage/ff5_faris-8.png'

import faris9 from '~/images/charactors/white-mage/ff5_faris-9.png'
import faris10 from '~/images/charactors/white-mage/ff5_faris-10.png'

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
    up: [faris0, faris1, faris2],
    down: [faris3, faris4, faris5],
    left: [faris6, faris7, faris8],
    right: [faris9, faris10],
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
    animations: animations,
    direction: 'down', // 初始方向
  }

  addMoveControl(app, faris)

  save({ app, character: faris, sprite: sprite })
  return faris
}
