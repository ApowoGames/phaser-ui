import { Transform } from "../pos/Transform";
export interface ICellConfig {
    scene: Phaser.Scene;
    transform: Transform;
    view: Phaser.GameObjects.GameObject;
    index: number;
}
