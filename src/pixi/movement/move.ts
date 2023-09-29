import type { ICharacter, IDirection } from '~/core/types'
import { handleCollisions } from './collisions'
import type { IApp } from '../startPixi'
import { directionMap } from '~/core/constants'

export const addMoveControl = (app: IApp, character: ICharacter) => {
  const keys: Record<any, boolean> = {}
  window.addEventListener('keydown', (e) => (keys[e.key] = true))
  window.addEventListener('keyup', (e) => (keys[e.key] = false))

  const movingLoop = () => {
    let dirX = 0
    let dirY = 0

    if (keys['ArrowUp'] || keys['w']) {
      dirY -= 1
      character.direction = 'up' as IDirection
    }
    if (keys['ArrowDown'] || keys['s']) {
      dirY += 1
      character.direction = 'down' as IDirection
    }
    if (keys['ArrowLeft'] || keys['a']) {
      dirX -= 1
      character.direction = 'left' as IDirection
    }
    if (keys['ArrowRight'] || keys['d']) {
      dirX += 1
      character.direction = 'right' as IDirection
    }

    // Anime
    const { direction: charDir, animations: charAnime } = character
    if (charDir && charAnime) {
      const dir = directionMap[charDir]
      if (!['down', 'left', 'right', 'up'].includes(dir)) return

      // 播放动画
      charAnime[dir as keyof typeof charAnime].visible = true
      charAnime[dir as keyof typeof charAnime].play()

      // 停止/隱藏 其他动画
      Object.keys(charAnime).forEach((key) => {
        if (key !== dir) {
          charAnime[key as keyof typeof charAnime].stop()
          charAnime[key as keyof typeof charAnime].visible = false
        }
      })
    }

    // Normalize diagonal movement
    if (dirX !== 0 && dirY !== 0) {
      const length = Math.sqrt(dirX * dirX + dirY * dirY)
      dirX /= length
      dirY /= length
    }

    character.sprite.x += dirX * character.mv
    character.sprite.y += dirY * character.mv

    if (charAnime) {
      Object.keys(charAnime).forEach((key: string) => {
        charAnime[key as keyof typeof charAnime].x = character.sprite.x
        charAnime[key as keyof typeof charAnime].y = character.sprite.y
      })
    }
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
