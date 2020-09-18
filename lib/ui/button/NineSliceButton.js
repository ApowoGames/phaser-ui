"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
import NineSlicePatch from "../ninepatch/NineSlicePatch";
import Button from "./Button";
/**
 * @class NineSliceButton
 * @memberof apowophaserui
 * @constructor
 * @extends apowophaserui.Button
 * @param {Phaser.Scene} scene
 * @param {number} x
 * @param {number} y
 * @param {number} width
 * @param {number} height
 * @param {string} key
 * @param {string} frame
 * @param {string} [text]
 * @param {number} [dpr]
 * @param {number} [scale]
 * @param {*} [config]
 * @param {*} [music]
 * @param {*} [data]
 */
class NineSliceButton extends Button {
    constructor(scene, x, y, width, height, key, frame, text, dpr, scale, config, music, data) {
        super(scene, key, frame, frame, text, music, dpr, scale, {
            width,
            height,
            configlist: [config]
        });
        this.x = x;
        this.y = y;
        if (data) {
            this.btnData = data;
        }
    }
    /**
     * @name apowophaserui.NineSliceButton#enable
     * @type {boolean}
     */
    set enable(value) {
        if (value) {
            this.mBackground.clearTint();
            if (this.mText)
                this.mText.clearTint();
            this.setInteractive();
        }
        else {
            this.mBackground.setTintFill(0x666666);
            if (this.mText)
                this.mText.setTintFill(0x777777);
            this.removeInteractive();
        }
    }
    /**
     * @method apowophaserui.NineSliceButton#getBtnData
     * @return {*}
     */
    getBtnData() {
        return this.btnData;
    }
    /**
     * @method apowophaserui.NineSliceButton#createBackground
     */
    createBackground() {
        this.mFrame = this.mFrame ? this.mFrame : "__BASE";
        this.initFrame();
        const config = this.ninePatchConfig.configlist[0];
        const width = this.ninePatchConfig.width;
        const height = this.ninePatchConfig.height;
        this.mBackground = new NineSlicePatch(this.scene, 0, 0, width, height, this.mKey, this.mFrame, { left: config.left, top: config.top, right: config.right, bottom: config.bottom }, this.dpr, 1);
        this.add(this.mBackground);
        this.setSize(width, height);
    }
    /**
     * @method apowophaserui.NineSliceButton#isExists
     * @param {string} frame 
     */
    isExists(frame) {
        const originTexture = this.scene.textures.get(this.mKey);
        if (originTexture && originTexture.has(frame))
            return true;
        return false;
    }
     /**
     * @method apowophaserui.NineSliceButton#initFrame
     */
    initFrame() {
        const frame = this.mFrame ? this.mFrame : this.mKey;
        this.mFrame = `${frame}_normal`;
        if (!this.isExists(this.mFrame)) {
            this.mFrame = frame;
        }
        this.mDownFrame = `${frame}_down`;
        if (!this.isExists(this.mDownFrame)) {
            this.mDownFrame = this.mFrame;
        }
        return this.mFrame;
    }
}
export default NineSliceButton;
