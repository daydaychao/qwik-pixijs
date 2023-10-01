import { type IApp } from '../startPixi'
import { moveSystem } from '../movement/moveSystem'
import { Faris } from '../characters/entities/Faris'
import { Stone } from '../characters/entities/Stone'

export const runScene01 = async (app: IApp) => {
  app.store.scene = 'scene01'

  await Faris(app, 'Faris', 20, 20, true)
  await Faris(app, 'Faris2', 80, 90)
  await Stone(app, 'Stone1', 100, 100, false)
  await Stone(app, 'Stone2', 120, 120, false)

  const allCharacters = app.store.allCharacters
  moveSystem(app, allCharacters)
}
