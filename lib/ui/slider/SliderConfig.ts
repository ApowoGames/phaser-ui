export interface SliderConfig {
    background?: Phaser.GameObjects.GameObject;
    track?: Phaser.GameObjects.GameObject;
    indicator?: Phaser.GameObjects.GameObject;
    thumb?: Phaser.GameObjects.GameObject;
    space?: { left?: number, right?: number, top?: number, bottom?: number }
    inputmode?: number;
    valuechangeCallback?: Function;
    valuechangeCallbackScope?: object;
    enable?: boolean;
    gap?: boolean;
    value?: number;
}