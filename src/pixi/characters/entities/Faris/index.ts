import { CollisionEnum, MapLayerEnum, type ICharacter } from '~/core/types'
import type { IApp } from '../../../startPixi'

import farisLeft0 from './images/left/0.png'
import farisLeft1 from './images/left/1.png'
import farisRight0 from './images/right/0.png'
import farisRight1 from './images/right/1.png'
import faris3 from './images/ff5_faris-3.png'
import faris4 from './images/ff5_faris-4.png'
import faris5 from './images/ff5_faris-5.png'
import { initCharacter } from '../../initCharacter'

export const Faris = async (app: IApp, name = 'Faris', x = 0, y = 0, isPlayer = false): Promise<ICharacter> => {
  // status
  const hp = 100
  const mv = 5
  const charId = ''
  const collision = CollisionEnum.CAN_NOT_PUSH
  const mapLayer = MapLayerEnum.CHARACTER

  // sprites and anime sprites
  const scale = 1.5
  const spriteTexture = farisLeft0
  const animationSpeed = 0.05
  const frameMaps = {
    up: [faris3, faris3, faris3],
    down: [faris3, faris3, faris3],
    left: [farisLeft0, farisLeft1],
    right: [farisRight0, farisRight1],
    attack: [faris3, faris4, faris5],
  }

  const defaultCharData = {
    name,
    hp,
    mv,
    x,
    y,
    charId,
    collision,
    mapLayer,
    scale,
    app,
    spriteTexture,
    animationSpeed,
    frameMaps,
    isPlayer,
  }

  return initCharacter(app, defaultCharData)
}
