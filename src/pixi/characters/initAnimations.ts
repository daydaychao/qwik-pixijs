import { Texture, AnimatedSprite } from 'pixi.js'
import type { IApp } from '../startPixi'
import type { IDefaultCharProps } from './initCharacter'

export type IInitAnimationsProps = Pick<IDefaultCharProps, 'animationSpeed' | 'frameMaps' | 'scale'>
type IInitAnimeReturn = Record<string, AnimatedSprite>
export const initAnimations = async (
  app: IApp,
  { animationSpeed, frameMaps, scale = 1 }: IInitAnimationsProps
): Promise<IInitAnimeReturn | null> => {
  if (!frameMaps) return null

  const animations: Record<string, AnimatedSprite> = {}
  for (const key in frameMaps) {
    const anime = new AnimatedSprite(frameMaps[key].map((img) => Texture.from(img)))
    anime.position.set(0, 0)
    anime.scale.set(scale, scale)
    anime.anchor.set(0.5, 0.5)
    anime.animationSpeed = animationSpeed
    animations[key] = anime
    app.stage.addChild(animations[key])
  }

  return animations
}
