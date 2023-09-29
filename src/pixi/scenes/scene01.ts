import { type IApp } from '../startPixi'
import { Faris } from '../characters/faris'
import { Stone } from '../characters/stone'

export const runScene01 = async (app: IApp) => {
  app.store.scene = 'scene01'

  await Faris(app)
  await Stone(app, 10, 20)

  console.log(app.store)
}
