import { type IApp } from "../startPixi";
import { Faris } from "../characters/faris";

export const runScene01 = async (app: IApp) => {
  app.store.scene = "scene01";

  Faris(app);
};
