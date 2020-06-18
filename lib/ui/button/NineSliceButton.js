"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NineSlicePatch_1 = require("../ninepatch/NineSlicePatch");
const BaseUI_1 = require("../baseUI/BaseUI");
const MouseEvent_1 = require("../interface/event/MouseEvent");
/**
 * @class NineSliceButton
 * @memberof tooqinui
 * @constructor
 * @param {Phaser.Scene} scene
 * @param {number} x
 * @param {number} y
 * @param {number} width
 * @param {number} height
 * @param {string} key
 * @param {string} frame
 * @param {string} text
 * @param {number} dpr
 * @param {number} scale
 * @param {*} config
 * @param {*} music
 * @param {*} data
 */
class NineSliceButton extends BaseUI_1.BaseUI {
    constructor(scene, x, y, width, height, key, frame, text, dpr, scale, config, music, data) {
        super(scene, x, y);
        this.x = x;
        this.y = y;
        this.mKey = key;
        this.mFrame = frame ? frame : "__BASE";
        this.dpr = dpr || 1;
        this.scale = scale || 1;
        this.initFrame();
        this.setSize(width, height);
        this.mNingBg = new NineSlicePatch_1.NineSlicePatch(this.scene, 0, 0, width, height, key, this.mFrame_nrmal, config);
        this.add(this.mNingBg);
        if (data) {
            this.btnData = data;
        }
        /**
         * @name tooqinui.NineSliceButton#mLabel
         * @type {Phaser.GameObjects.Text}
         * @protected
         */
        this.mLabel = this.scene.make.text(undefined, false)
            .setOrigin(0.5, 0.5)
            .setSize(this.width, this.height)
            .setAlign("center")
            .setText(text);
        this.add(this.mLabel);
        this.setInteractive(new Phaser.Geom.Rectangle(0, 0, width, height), Phaser.Geom.Rectangle.Contains);
        this.addListen();
    }
    /**
     * @method tooqinui.NineSliceButton#addListen
     */
    addListen() {
        this.removeListen();
        this.on("pointerdown", this.onPointerDown, this);
        this.on("pointerup", this.onPointerUp, this);
    }
    /**
     * @method tooqinui.NineSliceButton#removeListen
     */
    removeListen() {
        this.off("pointerdown", this.onPointerDown, this);
        this.off("pointerup", this.onPointerUp, this);
    }

    set enable(value) {
        if (value) {
            this.mNingBg.clearTint();
            this.mLabel.clearTint();
            this.setInteractive();
        }
        else {
            this.mNingBg.setTintFill(0x666666);
            this.mLabel.setTintFill(0x777777);
            this.removeInteractive();
        }
    }
    /**
     * @method tooqinui.NineSliceButton#getBtnData
     * @return {*}
     */
    getBtnData() {
        return this.btnData;
    }
    /**
     * @method tooqinui.NineSliceButton#setText
     * @param {string} text 
     */
    setText(text) {
        this.mLabel.setText(text);
    }
    /**
     * @method tooqinui.NineSliceButton#getText
     * @return {string}
     */
    getText() {
        return this.mLabel.text;
    }
    /**
     * @method tooqinui.NineSliceButton#setTextStyle
     * @param {any} style 
     */
    setTextStyle(style) {
        this.mLabel.setStyle(style);
    }
    /**
     * @method tooqinui.NineSliceButton#setFontStyle
     * @param {string} val 
     */
    setFontStyle(val) {
        this.mLabel.setFontStyle(val);
    }
    /**
     * @method tooqinui.NineSliceButton#setTextOffset
     * @param {number} x 
     * @param {number} y 
     */
    setTextOffset(x, y) {
        this.mLabel.setPosition(x, y);
    }
    /**
     * @method tooqinui.NineSliceButton#setFrame
     * @param {string|number} frame 
     */
    setFrame(frame) {
        this.mNingBg.setFrame(frame);
        return this;
    }
    /**
     * @method tooqinui.NineSliceButton#destroy
     */
    destroy() {
        this.removeListen();
        if (this.mLabel)
            this.mLabel.destroy();
        super.destroy();
    }
    /**
     * @method tooqinui.NineSliceButton#setFrameNormal
     * @param {string} normal 
     * @param {string} down 
     * @param {string} over 
     */
    setFrameNormal(normal, down, over) {
        this.mFrame_nrmal = normal;
        this.mFrame_down = (down ? down : normal);
        this.mFrame_over = (over ? over : normal);
        this.changeNormal();
        return this;
    }
    /**
     * @method tooqinui.NineSliceButton#changeNormal
     */
    changeNormal() {
        this.setFrame(this.mFrame_nrmal);
    }
    /**
     * @method tooqinui.NineSliceButton#changeDown
     */
    changeDown() {
        // this.scale = 0.9;
        this.setFrame(this.mFrame_down);
    }
    /**
     * @method tooqinui.NineSliceButton#changeOver
     */
    changeOver() {
        // this.setTexture()
        this.setFrame(this.mFrame_over);
    }
    /**
     * @method tooqinui.NineSliceButton#isExists
     * @param {string} frame 
     */
    isExists(frame) {
        const originTexture = this.scene.textures.get(this.mKey);
        if (originTexture && originTexture.has(frame))
            return true;
        return false;
    }
    /**
     * @method tooqinui.NineSliceButton#onPointerDown
     * @param {Phaser.Input.Pointer} pointer 
     */
    onPointerDown(pointer) {
        this.changeDown();
    }
    /**
     * @method tooqinui.NineSliceButton#onPointerUp
     * @param {Phaser.Input.Pointer} pointer 
     */
    onPointerUp(pointer) {
        this.changeNormal();
        this.emit(MouseEvent_1.CoreUI.MouseEvent.Tap, pointer, this);
    }
    /**
     * @name tooqinui.NineSliceButton#label
     * @return {string}
     */
    get label() {
        return this.mLabel;
    }
    /**
     * @method tooqinui.NineSliceButton#initFrame
     */
    initFrame() {
        const frame = this.mFrame ? this.mFrame : this.mKey;
        this.mFrame_nrmal = `${frame}_normal`;
        let down = `${frame}_down`;
        if (!this.isExists(down)) {
            down = `${frame}_normal`;
        }
        this.mFrame_down = down;
        let over = `${frame}_over`;
        if (!this.isExists(over)) {
            over = `${frame}_normal`;
        }
        this.mFrame_over = over;
    }
}
exports.NineSliceButton = NineSliceButton;
