import { Transform } from "./AbstractUI";

export interface ResourceData {
    transForm: Transform;
    key: string;
    texture: string; // [ texture,..]
}
export interface IFramesSkinData {
    background: ResourceData; // Phaser.GameObjects.Sprite | Phaser.GameObjects.Image;
    icon?: ResourceData; // Phaser.GameObjects.Sprite | Phaser.GameObjects.Image;
}
export interface ISlidrSkinData {
    background: ResourceData; // Phaser.GameObjects.Sprite | Phaser.GameObjects.Image;
    track: ResourceData; // Phaser.GameObjects.Sprite | Phaser.GameObjects.Image; // 轨道
    thumb: ResourceData; // Phaser.GameObjects.Sprite | Phaser.GameObjects.Image; // 滑块
}
export interface IProgressBarSkinData {
    background: ResourceData; // Phaser.GameObjects.Sprite | Phaser.GameObjects.Image;
    bar: ResourceData; // Phaser.GameObjects.Sprite | Phaser.GameObjects.Image;
}
