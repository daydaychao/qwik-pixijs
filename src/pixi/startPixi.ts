import { Application, type ICanvas, type Sprite } from 'pixi.js'
import { runScene01 } from './scenes/scene01'
import type { ICharacter } from '~/core/types'

export const startPixi = async (dom: string) => {
  const root: any = document.querySelector(dom)
  if (!root) return
  const pixiApp = new Application({
    backgroundColor: 0x303030,
    resizeTo: root,
  })
  root.appendChild(pixiApp.view)

  const app = initAppStore(pixiApp)
  runScene01(app) // 開始遊戲

  return app
}

export type IApp = Application & {
  store: {
    scene: string
    allSprites: Sprite[]
    allCharacters: ICharacter[]
  }
}
export const initAppStore = (app: Application<ICanvas>): IApp => {
  // 創建並初始化新的 store
  const initStore: IApp['store'] = {
    scene: '',
    allSprites: [],
    allCharacters: [], // 初始化新屬性，根據你的需求設定初始值
  }

  // 創建新的 IApp
  const appWithStore: IApp = {
    ...app,
    store: initStore,
    render: () => {},
    view: app.view,
    screen: app.screen,
    ticker: app.ticker,
    destroy: () => {},
  }

  return appWithStore
}
export default startPixi
