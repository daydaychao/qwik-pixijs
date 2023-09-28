import type { Application } from "pixi.js";
import type { ICharacter } from "~/core/types";

export const addMoveControl = (
  app: Application,
  character: ICharacter,
  cb: () => void
) => {
  const keys: Record<any, boolean> = {};
  window.addEventListener("keydown", (e) => {
    keys[e.key] = true;
  });
  window.addEventListener("keyup", (e) => {
    keys[e.key] = false;
  });

  const movingLoop = () => {
    let dirX = 0;
    let dirY = 0;

    if (keys["ArrowUp"] || keys["w"]) dirY -= 1;
    if (keys["ArrowDown"] || keys["s"]) dirY += 1;
    if (keys["ArrowLeft"] || keys["a"]) dirX -= 1;
    if (keys["ArrowRight"] || keys["d"]) dirX += 1;

    // Normalize diagonal movement
    if (dirX !== 0 && dirY !== 0) {
      const length = Math.sqrt(dirX * dirX + dirY * dirY);
      dirX /= length;
      dirY /= length;
    }

    character.sprite.x += dirX * character.mv;
    character.sprite.y += dirY * character.mv;

    cb();
  };

  app.ticker.add(() => {
    movingLoop();
  });
};
