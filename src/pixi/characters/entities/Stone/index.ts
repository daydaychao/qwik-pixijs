import { Container } from 'pixi.js'
import { CollisionEnum, MapLayerEnum, type ICharacter, type IDirection } from '~/core/types'
import type { IApp } from '../../../startPixi'
import { initCharacter } from '../../initCharacter'

import stoneImg from './stone.png'

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
  const frameMaps = null

  const defaultCharData = {
    animations: null,
    animationSpeed,
    animeKey: 'down',
    app,
    charId,
    collision,
    container: new Container(),
    direction: 'down' as IDirection,
    frameMaps,
    hp,
    isPlayer,
    mapLayer,
    mv,
    name,
    scale,
    spriteTexture,
    x,
    y,
  }

  return initCharacter(app, defaultCharData)
}
