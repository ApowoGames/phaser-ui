import { IAbstructUI } from "./IAbstructUI";

export interface UIProvider {
    scene: Phaser.Scene;
    parent?: IAbstructUI;
}
