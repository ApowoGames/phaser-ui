"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
import NineSlicePatch from "../ninepatch/NineSlicePatch";
import BaseUI from "../baseUI/BaseUI";
/**
 * @enum {string}
 * @memberof apowophaserui
 * @readonly
 * @property {string} tweenStart "tweenStart"
 * @property {string} tweenComplete "tweenComplete"
 * @property {string} tweenUpdate "tweenUpdate"
*/
var ProgressBarEvent = {
    "tweenStart": "tweenStart",
    "tweenComplete": "tweenComplete",
    "tweenUpdate": "tweenUpdate",
};
const GetValue = Phaser.Utils.Objects.GetValue;
/**
 * @class ProgressBar
 * @memberof apowophaserui
 * @constructor
 * @extends apowophaserui.BaseUI
 * @param {Phaser.Scene} scene
 * @param {*} [config]
 */
class ProgressBar extends BaseUI {
    constructor(scene, config) {
        super(scene);
        /**
         * @name apowophaserui.ProgressBar#mConfig
         * @type {*}
         * @protected
         */
        this.mConfig = config;
        const posX = config.x;
        const posY = config.y;
        this.width = config.width;
        this.height = config.height;
        this.setPosition(posX, posY);
        this.setSize(this.width, this.height);
        this.dpr = GetValue(config, "dpr", 1);
        this.scale = GetValue(config, "scale", 1);
        const bgSkinData = config.background;
        const barSkinData = config.bar;
        /**
         * @name apowophaserui.ProgressBar#mBgSkin
         * @type {*}
         * @protected
         */
        this.mBgSkin = new NineSlicePatch(scene, bgSkinData.x, bgSkinData.y, bgSkinData.width, bgSkinData.height, bgSkinData.key, bgSkinData.frame, bgSkinData.config, this.dpr, this.scale);
        /**
         * @name apowophaserui.ProgressBar#mBarSkin
         * @type {*}
         * @protected
         */
        this.mBarSkin = new NineSlicePatch(scene, barSkinData.x, barSkinData.y, barSkinData.width, barSkinData.height, barSkinData.key, barSkinData.frame, barSkinData.config, this.dpr, this.scale);
        // 按钮文本
        const textconfig = {};
        /**
         * @name apowophaserui.ProgressBar#mText
         * @type {*}
         * @protected
         */
        this.mText = scene.make.text({
            style: Object.assign(textconfig, config.textConfig)
        }, false);
        /**
         * @name apowophaserui.ProgressBar#barWid
         * @type {*}
         * @protected
         */
        this.barWid = barSkinData.width;
        const hei = this.mBarSkin.height;
        /**
         * @name apowophaserui.ProgressBar#mBarMaskGraphics
         * @type {*}
         * @protected
         */
        this.mBarMaskGraphics = this.scene.make.graphics(undefined, false);
        this.mBarMaskGraphics.fillStyle(0, 1);
        this.mBarMaskGraphics.beginPath();
        this.mBarMaskGraphics.fillRect(0, 0, 10, hei);
        this.mBarMaskGraphics.setPosition(-this.barWid / 2, -hei / 2);
        // this.mBarSkin.mask = this.mBarMaskGraphics.createGeometryMask();
        this.add([this.mBgSkin, this.mBarSkin, this.mText]);
        this.disInteractive();
    }
    /**
        * @method apowophaserui.ProgressBar#setProgress
        * @param {number} curVal 
        * @param {number} maxVal 
        */
    setProgress(curVal, maxVal) {
        let value = curVal / maxVal;
        if (value > 1)
            value = 1;
        else if (value < 0)
            value = 0;
        this.curWid = (value) * this.barWid;
        const hei = this.mBarSkin.height;
        this.mBarSkin.resize(this.curWid, hei);
        this.mBarSkin.x = -this.barWid / 2 + this.curWid / 2;
        // this.mBarMaskGraphics.clear();
        // this.mBarMaskGraphics.fillRect(0, 0, this.curWid, hei);
        // this.mBarMaskGraphics.setPosition(-this.barWid / 2, -hei / 2);
        // if (this.mTween) {
        //     this.mTween.stop();
        //     this.mTween.remove();
        // }
        // this.mTween = this.scene.tweens.add({
        //     targets: this.mBarMaskGraphics,
        //     duration: 1000,
        //     ease: "Linear",
        //     scaleX: { value: curVal / maxVal },
        //     onStart: () => {
        //         this.onTweenStart();
        //     },
        //     onComplete: (tween, targets, element) => {
        //         this.onTweenComplete();
        //     },
        //     onUpdate: (tween, targets, element) => {
        //         this.onTweenUpdate();
        //     },
        //     onCompleteParams: [this]
        // });
    }
    /**
     * @method apowophaserui.ProgressBar#setText
     * @param {string} val 
     */
    setText(val) {
        if (this.mText) {
            this.mText.text = val;
            if (!this.mText.parentContainer)
                this.add(this.mText);
        }
    }
    /**
     * @name apowophaserui.ProgressBar#text
     * @type {Phaser.GameObjects.Text}
     * @return {Phaser.GameObjects.Text}
     */
    get text() {
        return this.mText;
    }
    /**
     * @name apowophaserui.ProgressBar#bar
     * @type {Phaser.GameObjects.Image}
     * @return {Phaser.GameObjects.Image}
     */
    get bar() {
        return this.mBarSkin;
    }
    /**
     * @method apowophaserui.ProgressBar#destory
     */
    destory() {
        // if (this.mTween) {
        //     this.mTween.stop();
        //     this.mTween.remove();
        //     this.mTween = null;
        // }
        super.destroy();
    }
}
export { ProgressBarEvent, ProgressBar };
