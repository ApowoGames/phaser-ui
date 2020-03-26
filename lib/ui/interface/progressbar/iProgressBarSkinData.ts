import { INinePatchSkinData } from "../ninepatch/INinePatchSkinData";

export interface IProgressBarSkinData {
    background: INinePatchSkinData; // Phaser.GameObjects.Sprite | Phaser.GameObjects.Image;
    bar: INinePatchSkinData; // Phaser.GameObjects.Sprite | Phaser.GameObjects.Image;
}