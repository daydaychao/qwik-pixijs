import type { AnimatedSprite, Container, Sprite } from 'pixi.js'

export enum CollisionEnum {
  NO_COLLISION = 0,
  CAN_NOT_PUSH = 1,
  CAN_PUSH = 2,
}

export enum MapLayerEnum {
  GROUND = 0,
  WALL = 1,
  OBJECT = 2,
  CHARACTER = 3,
  EFFECT = 4,
}

export interface ICharacter {
  charId: string
  name: string
  hp: number
  mv: number
  x: number
  y: number
  collision: CollisionEnum
  mapLayer: MapLayerEnum
  sprite?: Sprite
  animations: Record<any, AnimatedSprite> | null
  container: Container
  direction: IDirection
  isPlayer: boolean
  animeKey: string
}

export type IDirection = 'up' | 'down' | 'left' | 'right' | ''
