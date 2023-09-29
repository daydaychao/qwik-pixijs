import type { ICharacter } from '~/core/types'
import { handleCollisions } from './collisions'
import type { IApp } from '../startPixi'

export const addMoveControl = (app: IApp, character: ICharacter) => {
  const keys: Record<any, boolean> = {}
  window.addEventListener('keydown', (e) => {
    keys[e.key] = true
  })
  window.addEventListener('keyup', (e) => {
    keys[e.key] = false
  })

  const movingLoop = () => {
    let dirX = 0
    let dirY = 0

    if (keys['ArrowUp'] || keys['w']) dirY -= 1
    if (keys['ArrowDown'] || keys['s']) dirY += 1
    if (keys['ArrowLeft'] || keys['a']) dirX -= 1
    if (keys['ArrowRight'] || keys['d']) dirX += 1

    // Normalize diagonal movement
    if (dirX !== 0 && dirY !== 0) {
      const length = Math.sqrt(dirX * dirX + dirY * dirY)
      dirX /= length
      dirY /= length
    }

    character.sprite.x += dirX * character.mv
    character.sprite.y += dirY * character.mv

    return { dirX, dirY }
  }

  app.ticker.add(() => {
    // console.log(character.name, {
    //   x: character.sprite.x,
    //   y: character.sprite.y,
    // });
    const { dirX, dirY } = movingLoop()
    handleCollisions({ app, character, dirX, dirY })
  })
}
