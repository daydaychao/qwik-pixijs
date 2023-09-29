import { Assets, Sprite } from 'pixi.js'
import type { IApp } from '../startPixi'

interface IRenderProps {
  app: IApp
  texture: string
  x: number
  y: number
}
export const renderSprite = async ({ app, texture, x, y }: IRenderProps): Promise<Sprite> => {
  const textureLoaded = await Assets.load(texture)
  const sprite = new Sprite(textureLoaded)
  sprite.x = x ? app.renderer.width / 2 : x
  sprite.y = y ? app.renderer.height / 2 : y

  sprite.anchor.x = 0.5
  sprite.anchor.y = 0.5
  app.stage.addChild(sprite)

  return sprite
}
