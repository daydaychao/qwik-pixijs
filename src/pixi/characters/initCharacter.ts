import type { ICharacter } from '~/core/types'
import type { IApp } from '../startPixi'
import { initSprite } from './initSprite'
import { save } from '~/pixi/system/save'
import { initAnimations } from './initAnimations'
import { nanoid } from 'nanoid'
import { isEmpty, isNil } from 'ramda'
import { type AnimatedSprite } from 'pixi.js'

export interface IDefaultCharProps {
  spriteTexture: string
  animationSpeed: number
  scale: number
  frameMaps: Record<string, AnimatedSprite[]> | null
}

export const initCharacter = async (app: IApp, ctx: ICharacter & IDefaultCharProps) => {
  const sprite = await initSprite({
    app: app,
    texture: ctx.spriteTexture,
    scale: ctx.scale,
  })
  const animations = await initAnimations(app, ctx)

  // create character
  const character: ICharacter = {
    name: ctx.name,
    hp: ctx.hp,
    mv: ctx.mv,
    x: ctx.x,
    y: ctx.y,
    charId: nanoid(),
    collision: ctx.collision,
    container: ctx.container,
    sprite: sprite,
    mapLayer: ctx.mapLayer,
    animations: animations ? animations : null,
    direction: ctx.direction || 'down',
    isPlayer: ctx.isPlayer,
    animeKey: ctx.animeKey,
  }

  const container = character.container
  container.addChild(sprite)

  sprite.visible = true
  if (!isEmpty(animations) && !isNil(animations)) {
    sprite.visible = false
    for (const key in animations) {
      container.addChild(animations[key])
    }
  }

  app.stage.addChild(container)
  container.position.set(character.x, character.y)

  save({ app, character })
  return character
}
