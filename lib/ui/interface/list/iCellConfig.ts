import { Transform } from "../pos/transform";
export interface ICellConfig {
    scene: Phaser.Scene;
    transform: Transform;
    view: Phaser.GameObjects.GameObject;
    index: number;
}