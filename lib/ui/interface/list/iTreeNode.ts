import { Transform } from "../pos/Transform";
export interface ITreeNode {
    transform: Transform;
    view: Phaser.GameObjects.GameObject;
    expand: boolean;
}