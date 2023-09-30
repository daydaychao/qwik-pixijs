import { Assets, Sprite, Point } from 'pixi.js'
import type { IApp } from '../startPixi'

interface IRenderProps {
  app: IApp
  texture: string
  scale?: number
}
export const initSprite = async ({ app, texture, scale = 1 }: IRenderProps): Promise<Sprite> => {
  const textureLoaded = await Assets.load(texture)
  const sprite = new Sprite(textureLoaded)
  sprite.x = 0
  sprite.y = 0
  sprite.scale = new Point(scale, scale)
  sprite.anchor.x = 0.5
  sprite.anchor.y = 0.5
  app.stage.addChild(sprite)

  return sprite
}
