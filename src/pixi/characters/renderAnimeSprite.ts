import { type Resource, type TextureSource, Texture, AnimatedSprite } from 'pixi.js'

export const renderAnimeSprite = async ({ dirList }: { dirList: Record<string, string[]> }) => {
  const { leftFrames, rightFrames, topFrames, downFrames } = createFrames(dirList)

  const animationFrames = {
    top: new AnimatedSprite(topFrames),
    down: new AnimatedSprite(downFrames),
    left: new AnimatedSprite(leftFrames),
    right: new AnimatedSprite(rightFrames),
  }

  console.log(animationFrames)
}
//
type ITextureResGroup = Record<any, Texture<Resource>[]>
type ITextureSourceGroup = Record<any, TextureSource[]>
const createFrames = (dirList: ITextureSourceGroup): ITextureResGroup => {
  const leftFrames = dirList.left.map((img) => Texture.from(img))
  const rightFrames = dirList.right.map((img) => Texture.from(img))
  const upFrames = dirList.top.map((img) => Texture.from(img))
  const downFrames = dirList.down.map((img) => Texture.from(img))

  return { leftFrames, rightFrames, upFrames, downFrames }
}
