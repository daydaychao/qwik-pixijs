import type { Sprite } from "pixi.js";
import { CollisionEnum, type ICharacter } from "~/core/types";
import { type IApp } from "../startPixi";

// 處理碰撞
export const handleCollisions = (app: IApp, mover: ICharacter) => {
  const dirX = mover.sprite.x;
  const dirY = mover.sprite.y;

  const all = app.store.allCharacters;
  all.forEach((target) => {
    // 檢查角色和其他物體之間的碰撞
    if (target.collision === CollisionEnum.CAN_NOT_PUSH) {
      if (checkCollision(mover.sprite, target.sprite)) {
        // 如果碰到 1，停止角色移動
        mover.sprite.x -= dirX * mover.mv;
        mover.sprite.y -= dirY * mover.mv;
      }

      // 檢查角色和其他物體之間的碰撞
      if (checkCollision(mover.sprite, target.sprite)) {
        // 如果碰到 rock，角色和 rock 都可以推動它
        mover.sprite.x += dirX * mover.mv;
        mover.sprite.y += dirY * mover.mv;
        target.sprite.x += dirX * mover.mv;
        target.sprite.y += dirY * mover.mv;
      }
    }
  });

  const checkCollision = (sprite1: Sprite, sprite2: Sprite) => {
    const bounds1 = sprite1.getBounds();
    const bounds2 = sprite2.getBounds();
    return (
      bounds1.x + bounds1.width > bounds2.x &&
      bounds1.x < bounds2.x + bounds2.width &&
      bounds1.y + bounds1.height > bounds2.y &&
      bounds1.y < bounds2.y + bounds2.height
    );
  };
};
