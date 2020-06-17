import { IProgressBarSkinData } from "./IProgressBarSkinData";
import { Transform } from "../pos/Transform";
import { TextConfig } from "../text/TextConfig";
import { ISoundGroup } from "../sound/ISoundConfig";
import { INinePatchSkinData } from "../ninepatch/INinePatchSkinData";

export interface ProgressBarConfig {  //Todo I?
    x: number;
    y: number;
    width: number;
    height: number;
    background: INinePatchSkinData; // Phaser.GameObjects.Sprite | Phaser.GameObjects.Image;
    bar: INinePatchSkinData; // Phaser.GameObjects.Sprite | Phaser.GameObjects.Image;
    dpr?: number;
    scale?: number;
    textConfig?: TextConfig;
    text?: string;
    music?: ISoundGroup;
}
