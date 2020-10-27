"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @class BaseImage
 * @memberof apowophaserui
 * @extends Phaser.GameObjects.Image
 * @param {Phaser.Scene} scene
 * @param {number} x
 * @param {number} y
 * @param {string} [texture]
 * @param {string} [frame]
 */
class BaseImage extends Phaser.GameObjects.Image {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        this.texture.setFilter(Phaser.Textures.FilterMode.NEAREST);
    }
}
export default BaseImage;