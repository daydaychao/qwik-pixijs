import type { ICharacter, IDirection } from '~/core/types'
import type { IApp } from '../startPixi'
import { updateMovement } from './updateMovement'
import { updateMoveAnime } from './updateMoveAnimate'

export function moveSystem(app: IApp, moveCharacters: ICharacter[]) {
  // player input
  window.addEventListener('keydown', (e) => (app.store.keys[e.key] = true))
  window.addEventListener('keyup', (e) => (app.store.keys[e.key] = false))
  const getInputKeyDirection = (): { dirX: number; dirY: number; direction: IDirection } => {
    let dirX = 0
    let dirY = 0
    let direction: IDirection = ''

    if (app.store.keys['ArrowUp'] || app.store.keys['w']) {
      dirY -= 1
      direction = 'up'
    }
    if (app.store.keys['ArrowDown'] || app.store.keys['s']) {
      dirY += 1
      direction = 'down'
    }
    if (app.store.keys['ArrowLeft'] || app.store.keys['a']) {
      dirX -= 1
      direction = 'left'
    }
    if (app.store.keys['ArrowRight'] || app.store.keys['d']) {
      dirX += 1
      direction = 'right'
    }
    return { dirX, dirY, direction }
  }

  app.ticker.add((delta) => {
    //player moving
    const character = moveCharacters.find((character) => character.isPlayer)
    if (!character) return
    const { dirY, dirX, direction } = getInputKeyDirection()
    const targets = app.store.allCharacters.filter((target: ICharacter) => target.charId !== character.charId)
    updateMoveAnime({ animation: character.animations?.move, direction })
    updateMovement({ dirX: dirX * delta, dirY: dirY * delta, direction, self: character, targets })
  })
}
