import { type IApp } from '../startPixi'
import { moveSystem } from '../movement/moveSystem'
import { Faris } from '../characters/entities/Faris'
import { Stone } from '../characters/entities/Stone'

export const runScene01 = async (app: IApp) => {
  app.store.scene = 'scene01'

  await Faris(app, 'Faris', 0, 0, true)
  // await Faris(app, 'Faris2', 80, 90)
  await Stone(app, 'Stone1', 100, 100)
  //await Stone(app, 'Stone2', 30, 30)

  const allCharacters = app.store.allCharacters
  console.log('allCharacters', allCharacters)
  moveSystem(app, allCharacters)
}
