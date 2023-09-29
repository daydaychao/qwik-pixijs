import type { ICharacter } from '~/core/types'
import type { IApp } from '../startPixi'

export const save = async ({ app, character, scene }: { app: IApp; character?: ICharacter; scene?: string }) => {
  if (character) app.store.allCharacters.push(character)
  if (scene) app.store.scene = scene
}
