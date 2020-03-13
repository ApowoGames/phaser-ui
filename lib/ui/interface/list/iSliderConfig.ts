import { ResourceData } from "../baseUI/resourceData";

export interface ISliderConfig {
    track: ResourceData; // Phaser.GameObjects.Sprite | Phaser.GameObjects.Image; // 轨道
    thumb: ResourceData; // Phaser.GameObjects.Sprite | Phaser.GameObjects.Image; // 滑块
}