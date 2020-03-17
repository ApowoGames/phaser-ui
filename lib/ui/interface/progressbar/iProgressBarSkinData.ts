import { ResourceData } from "../baseUI/resourceData";
import { INinePatchSkinData } from "../ninepatch/iNinePatchSkinData";

export interface IProgressBarSkinData {
    background: INinePatchSkinData; // Phaser.GameObjects.Sprite | Phaser.GameObjects.Image;
    bar: INinePatchSkinData; // Phaser.GameObjects.Sprite | Phaser.GameObjects.Image;
}