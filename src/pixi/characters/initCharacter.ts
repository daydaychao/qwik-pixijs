import type { CollisionEnum, ICharacter, MapLayerEnum } from '~/core/types'
import type { IApp } from '../startPixi'
import { initSprite } from './initSprite'
import { save } from '~/pixi/system/save'
import { initAnimations } from './initAnimations'
import { Container } from 'pixi.js'
import { nanoid } from 'nanoid'

export interface IDefaultCharProps {
  hp: number
  mv: number
  x: number
  y: number
  name: string
  charId: string
  collision: CollisionEnum
  mapLayer: MapLayerEnum
  spriteTexture: string
  animationSpeed: number
  frameMaps: Record<string, string[]> | null
  scale: number
  isPlayer: boolean
}

export const initCharacter = async (app: IApp, ctx: IDefaultCharProps) => {
  const sprite = await initSprite({
    app: app,
    texture: ctx.spriteTexture,
    scale: ctx.scale,
  })
  const animations = await initAnimations(app, ctx)
  const container = new Container()

  // create character
  const character: ICharacter = {
    name: ctx.name,
    hp: ctx.hp,
    mv: ctx.mv,
    x: ctx.x,
    y: ctx.y,
    charId: nanoid(),
    collision: ctx.collision,

    container: container,
    sprite: sprite,
    mapLayer: ctx.mapLayer,
    animations: animations ? { move: { ...animations } } : null,
    direction: 'right', // 初始方向
    isPlayer: ctx.isPlayer,
  }

  container.addChild(sprite)
  if (animations?.up) {
    sprite.visible = false
    container.addChild(animations.up)
    container.addChild(animations.down)
    container.addChild(animations.left)
    container.addChild(animations.right)
  }
  app.stage.addChild(container)
  console.log({ name: character.name, x: character.x, y: character.y })
  container.position.set(character.x, character.y)

  save({ app, character })
  return character
}
