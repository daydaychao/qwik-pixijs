import { CollisionEnum, MapLayerEnum, type ICharacter } from "~/core/types";
import type { IApp } from "../../startPixi";
import { renderSprite } from "../renderSprite";
import farisJpg from "~/images/charactors/white-mage/faris0.jpg";
import { nanoid } from "nanoid";
import { save } from "../../system/save";
import { addMoveControl } from "~/pixi/input/move";
import { handleCollisions } from "~/pixi/input/collisions";
export const Faris = async (app: IApp): Promise<ICharacter> => {
  const sprite = await renderSprite({
    app: app,
    texture: farisJpg,
    x: 0,
    y: 0,
  });

  const faris: ICharacter = {
    name: "Faris",
    hp: 100,
    mv: 4,
    charId: nanoid(),
    collision: CollisionEnum.CAN_PUSH,
    mapLayer: MapLayerEnum.CHARACTER,
    sprite: sprite,
  };

  addMoveControl(app, faris, () => {
    handleCollisions(app, faris);
  });

  save({ app, character: faris, sprite: sprite });
  return faris;
};
