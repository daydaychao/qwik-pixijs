import { type Resource, type TextureSource, Texture, AnimatedSprite } from 'pixi.js'

type IInitAnimeProp = { dirList: Record<string, string[]> }
type IInitAnimeReturn = Record<'up' | 'down' | 'left' | 'right', AnimatedSprite>
export const initAnimeSprite = async ({ dirList }: IInitAnimeProp): Promise<IInitAnimeReturn> => {
  const { leftFrames, rightFrames, upFrames, downFrames } = createFrames(dirList)

  const animations = {
    up: new AnimatedSprite(upFrames),
    down: new AnimatedSprite(downFrames),
    left: new AnimatedSprite(leftFrames),
    right: new AnimatedSprite(rightFrames),
  }

  return animations
}

type ICreateTextureProps = Record<any, TextureSource[]>
type ICreateTextureReturn = Record<any, Texture<Resource>[]>
const createFrames = (dirList: ICreateTextureProps): ICreateTextureReturn => {
  const leftFrames = dirList.left.map((img) => Texture.from(img))
  const rightFrames = dirList.right.map((img) => Texture.from(img))
  const upFrames = dirList.top.map((img) => Texture.from(img))
  const downFrames = dirList.down.map((img) => Texture.from(img))
  return { leftFrames, rightFrames, upFrames, downFrames }
}
