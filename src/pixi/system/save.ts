import type { ICharacter } from "~/core/types";
import type { IApp } from "../startPixi";
import type { Sprite } from "pixi.js";

export const save = async ({
  app,
  character,
  sprite,
  scene,
}: {
  app: IApp;
  character?: ICharacter;
  sprite?: Sprite;
  scene?: string;
}) => {
  if (character) app.store.allCharacters.push(character);
  if (sprite) app.store.allSprites.push();
  if (scene) app.store.scene = scene;
};
