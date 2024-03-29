"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
import NineSlicePatch from "../ninepatch/NineSlicePatch";
import TabButton from "./TabButton";
/**
 * @class NinePatchTabButton
 * @memberof apowophaserui
 * @constructor
 * @extends apowophaserui.TabButton
 * @param {Phaser.Scene} scene
 * @param {number} width
 * @param {number} height
 * @param {string} key
 * @param {string} normalFrame
 * @param {string} [downFrame]
 * @param {string} [text]
 * @param {*} [configlist]
 * @param {number} [dpr]
 * @param {number} [scale]
 * @param {*} [data]
 */
class NinePatchTabButton extends TabButton {
    constructor(scene, width, height, key, normalFrame, downFrame, text, configlist, dpr, scale, data) {
        super(scene, key, normalFrame, downFrame, text, {}, dpr, scale, { width, height, configlist });
        /**
         * @name apowophaserui.NinePatchTabButton#mKey
         * @type {string}
         * @protected
         */
        this.mKey;
        /**
         * @name apowophaserui.NinePatchTabButton#btnData
         * @type {*}
         * @protected
         */
        this.btnData;
        /**
         * @name apowophaserui.NinePatchTabButton#mBackground
         * @type {*}
         * @protected
         */
        this.mBackground;
        this.mBackground.setConfig(configlist[0]);
        this.dpr = dpr || 1;
        this.scale = scale || 1;
        this.setSize(width, height);
        if (data) {
            this.btnData = data;
        }
        this.changeNormal();
        this.enable = true;
    }
    /**
     * @method apowophaserui.NinePatchTabButton#changeNormal
     */
    changeNormal() {
        // if (this.configlist && this.configlist.length > 0) {
        // resetPatchesConfig(this.mBackground.getConfig());
        // this.mBackground.setConfig(this.configlist[0]);
        //     this.setSize(this.wid, this.hei);
        // }
        this.setBgFrame(this.mFrame);
    }
    /**
    * @method apowophaserui.NinePatchTabButton#changeDown
    */
    changeDown() {
        if (this.mDownFrame) {
            // if (this.configlist && this.configlist.length > 1) {
            // resetPatchesConfig(this.mBackground.getConfig());
            // this.mBackground.setConfig(this.configlist[0]);
            //     this.setSize(this.wid, this.hei);
            // }
            this.setBgFrame(this.mDownFrame);
        }
    }
    /**
     * @method apowophaserui.NinePatchTabButton#setSize
     * @param {number} [width]
     * @param {number} [height]
     * @return {*}
     */
    setSize(width, height) {
        super.setSize(width, height);
        this.mBackground.setSize(width, height);
        return this;
    }
    /**
     * @method apowophaserui.NinePatchTabButton#getBtnData
     * @return {*}
     */
    getBtnData() {
        return this.btnData;
    }
    /**
     * @name apowophaserui.NinePatchTabButton#enable
     * @type {boolean}
     */
    set enable(value) {
        if (value) {
            this.mBackground.clearTint();
            this.setInteractive();
        }
        else {
            this.mBackground.setTintFill(0x666666);
            this.removeInteractive();
        }
    }
    /**
     * @method apowophaserui.NinePatchTabButton#createBackground
     */
    createBackground() {
        const config = this.ninePatchConfig.configlist[0];
        const width = this.ninePatchConfig.width;
        const height = this.ninePatchConfig.height;
        this.mBackground = new NineSlicePatch(this.scene, 0, 0, width, height, this.mKey, this.mFrame, { left: config.left, top: config.top, right: config.right, bottom: config.bottom }, this.dpr, 1);
        this.add(this.mBackground);
    }
    /**
     * @method apowophaserui.NinePatchTabButton#setBgFrame
     * @param {string} frame 
     */
    setBgFrame(frame) {
        this.mBackground.setFrame(frame);
        // this.setSize(this.mBackground.width, this.mBackground.height);
    }
}
export default NinePatchTabButton;
