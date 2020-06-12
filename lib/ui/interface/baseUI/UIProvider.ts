import { IAbstractUI } from "./IAbstractUI";

export interface UIProvider {
    scene: Phaser.Scene;
    parent?: IAbstractUI;
}
