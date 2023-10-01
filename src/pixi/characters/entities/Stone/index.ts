import { CollisionEnum, MapLayerEnum, type ICharacter } from '~/core/types'
import type { IApp } from '../../../startPixi'
import stoneImg from './stone.png'
import { initCharacter } from '../../initCharacter'
export const Stone = async (app: IApp, name = 'Stone', x = 0, y = 0, isPlayer = false): Promise<ICharacter> => {
  // status
  const hp = 100
  const mv = 0
  const charId = ''
  const collision = CollisionEnum.CAN_PUSH
  const mapLayer = MapLayerEnum.CHARACTER

  // sprites and anime sprites
  const scale = 1.5
  const spriteTexture = stoneImg
  const animationSpeed = 0.05
  const frameList = null

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
    frameList,
    isPlayer,
  }

  return initCharacter(app, defaultCharData)
}
