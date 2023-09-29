import { type Resource, type TextureSource, Texture, AnimatedSprite } from 'pixi.js'
import type { IApp } from '../startPixi'

type IInitAnimeProp = {
  app: IApp
  dirList: Record<string, string[]>
  scale: number
  x: number
  y: number
  animationSpeed: number
}
type IInitAnimeReturn = Record<'up' | 'down' | 'left' | 'right', AnimatedSprite>
export const initAnimations = async ({
  app,
  animationSpeed,
  dirList,
  scale = 1,
  x = 0,
  y = 0,
}: IInitAnimeProp): Promise<IInitAnimeReturn> => {
  const { leftFrames, rightFrames, upFrames, downFrames } = createFrames(dirList)

  const animations = {
    up: new AnimatedSprite(upFrames),
    down: new AnimatedSprite(downFrames),
    left: new AnimatedSprite(leftFrames),
    right: new AnimatedSprite(rightFrames),
  }

  // set scale
  Object.values(animations).forEach((anime) => anime.position.set(x, y))

  // set scale
  Object.values(animations).forEach((anime) => anime.scale.set(scale, scale))

  // set anchor
  Object.values(animations).forEach((anime) => anime.anchor.set(0.5, 0.5))

  // set time
  Object.values(animations).forEach((anime) => (anime.animationSpeed = animationSpeed))

  // add to stage
  app.stage.addChild(animations.up)
  app.stage.addChild(animations.down)
  app.stage.addChild(animations.left)
  app.stage.addChild(animations.right)

  return animations
}

type ICreateTextureProps = Record<any, TextureSource[]>
type ICreateTextureReturn = Record<any, Texture<Resource>[]>
const createFrames = (dirList: ICreateTextureProps): ICreateTextureReturn => {
  const leftFrames = dirList.left.map((img) => Texture.from(img))
  const rightFrames = dirList.right.map((img) => Texture.from(img))
  const upFrames = dirList.up.map((img) => Texture.from(img))
  const downFrames = dirList.down.map((img) => Texture.from(img))
  return { leftFrames, rightFrames, upFrames, downFrames }
}
