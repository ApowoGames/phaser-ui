import { Transform } from "../pos/transform";
export interface ITreeNode {
    transform: Transform;
    view: Phaser.GameObjects.GameObject;
    expand: boolean;
}