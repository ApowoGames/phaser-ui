import { AbstractUI } from "./AbstructUI";

export interface UIProvider {
    scene: Phaser.Scene;
    parent?: AbstractUI;
}