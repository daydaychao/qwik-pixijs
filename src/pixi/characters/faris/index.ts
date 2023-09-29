import { CollisionEnum, MapLayerEnum, type ICharacter } from '~/core/types'
import type { IApp } from '../../startPixi'
import { initSprite } from '../initSprite'
import farisJpg from '~/images/charactors/white-mage/faris0.png'
import { nanoid } from 'nanoid'
import { save } from '~/pixi/system/save'
import { addMoveControl } from '~/pixi/movement/move'

import faris0 from '~/images/charactors/white-mage/faris0.png'
import faris1 from '~/images/charactors/white-mage/faris1.png'
import faris2 from '~/images/charactors/white-mage/faris2.png'

import faris3 from '~/images/charactors/white-mage/faris3.png'
import faris4 from '~/images/charactors/white-mage/faris4.png'
import faris5 from '~/images/charactors/white-mage/faris5.png'

import faris6 from '~/images/charactors/white-mage/faris6.png'
import faris7 from '~/images/charactors/white-mage/faris7.png'
import faris8 from '~/images/charactors/white-mage/faris8.png'

import faris9 from '~/images/charactors/white-mage/faris9.png'
import faris10 from '~/images/charactors/white-mage/faris10.png'
import faris11 from '~/images/charactors/white-mage/faris11.png'

import { initAnimeSprite } from '../initAnimeSprite'

export const Faris = async (app: IApp, x = 0, y = 0): Promise<ICharacter> => {
  const sprite = await initSprite({
    app: app,
    texture: farisJpg,
    x: x,
    y: y,
  })

  const dirList = {
    top: [faris0, faris1, faris2],
    down: [faris3, faris4, faris5],
    left: [faris6, faris7, faris8],
    right: [faris9, faris10, faris11],
  }
  const animations = await initAnimeSprite({ dirList })

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
