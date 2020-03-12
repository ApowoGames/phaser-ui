import { AbstractUI } from "./abstructUI";

export interface UIProvider {
    scene: Phaser.Scene;
    parent?: AbstractUI;
}