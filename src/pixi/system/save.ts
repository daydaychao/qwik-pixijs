import type { ICharacter } from "~/core/types";
import type { IApp } from "../startPixi";
import type { Sprite } from "pixi.js";

export const save = async ({
  app,
  character,
  sprite,
}: {
  app: IApp;
  character?: ICharacter;
  sprite?: Sprite;
}) => {
  if (character) app.store.allCharacters.push(character);
  if (sprite) app.store.allCharacters.push();
};
