import type { Sprite } from "pixi.js";
import { CollisionEnum, type ICharacter } from "~/core/types";
import { type IApp } from "../startPixi";

// 處理碰撞
interface IHandleCollisionsProps {
  app: IApp;
  character: ICharacter;
  dirX: number;
  dirY: number;
}
export const handleCollisions = ({
  app,
  character,
  dirX,
  dirY,
}: IHandleCollisionsProps) => {
  const all = app.store.allCharacters;
  all.forEach((target) => {
    // 檢查角色和其他物體之間的碰撞
    if (target.name === character.name) return;
    if (!checkCollision(character.sprite, target.sprite)) return;

    if (target.collision === CollisionEnum.CAN_NOT_PUSH) {
      console.log("%cCAN_NOT_PUSH", "color: red");
      // 停止角色移動
      character.sprite.x -= dirX * character.mv;
      character.sprite.y -= dirY * character.mv;
      return;
    }

    // 检查角色和其他物体之间的碰撞
    if (target.collision === CollisionEnum.CAN_PUSH) {
      console.log("%cCAN_PUSH", "color: lightgreen");

      const directionActions = {
        left: () => (target.sprite.x -= character.mv),
        right: () => (target.sprite.x += character.mv),
        up: () => (target.sprite.y -= character.mv),
        down: () => (target.sprite.y += character.mv),
      };

      // 根据 dirX 和 dirY 执行相应的操作
      if (dirX === -1) directionActions.left();
      if (dirX === 1) directionActions.right();
      if (dirY === -1) directionActions.up();
      if (dirY === 1) directionActions.down();
      return;
    }
  });
};

const checkCollision = (sprite1: Sprite, sprite2: Sprite): boolean => {
  const bounds1 = sprite1.getBounds();
  const bounds2 = sprite2.getBounds();
  return (
    bounds1.x + bounds1.width > bounds2.x &&
    bounds1.x < bounds2.x + bounds2.width &&
    bounds1.y + bounds1.height > bounds2.y &&
    bounds1.y < bounds2.y + bounds2.height
  );
};
