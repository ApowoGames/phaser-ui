"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NineSlicePatch_1 = require("../ninepatch/NineSlicePatch");
const BaseUI_1 = require("../baseUI/BaseUI");
const MouseEvent_1 = require("../interface/event/MouseEvent");
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
        this.mLabel = this.scene.make.text(undefined, false)
            .setOrigin(0.5, 0.5)
            .setSize(this.width, this.height)
            .setAlign("center")
            .setText(text);
        this.add(this.mLabel);
        this.setInteractive(new Phaser.Geom.Rectangle(0, 0, width, height), Phaser.Geom.Rectangle.Contains);
        this.addListen();
    }
    addListen() {
        this.removeListen();
        this.on("pointerdown", this.onPointerDown, this);
        this.on("pointerup", this.onPointerUp, this);
    }
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
    getBtnData() {
        return this.btnData;
    }
    setText(text) {
        this.mLabel.setText(text);
    }
    getText() {
        return this.mLabel.text;
    }
    setTextStyle(style) {
        this.mLabel.setStyle(style);
    }
    setFontStyle(val) {
        this.mLabel.setFontStyle(val);
    }
    setTextOffset(x, y) {
        this.mLabel.setPosition(x, y);
    }
    setFrame(frame) {
        this.mNingBg.setFrame(frame);
        return this;
    }
    destroy() {
        this.removeListen();
        if (this.mLabel)
            this.mLabel.destroy();
        super.destroy();
    }
    setFrameNormal(normal, down, over) {
        this.mFrame_nrmal = normal;
        this.mFrame_down = (down ? down : normal);
        this.mFrame_over = (over ? over : normal);
        this.changeNormal();
        return this;
    }
    // public setState(val: string) {
    // }
    changeNormal() {
        this.setFrame(this.mFrame_nrmal);
    }
    changeDown() {
        // this.scale = 0.9;
        this.setFrame(this.mFrame_down);
    }
    changeOver() {
        // this.setTexture()
        this.setFrame(this.mFrame_over);
    }
    isExists(frame) {
        const originTexture = this.scene.textures.get(this.mKey);
        if (originTexture && originTexture.has(frame))
            return true;
        return false;
    }
    onPointerDown(pointer) {
        this.changeDown();
    }
    onPointerUp(pointer) {
        this.changeNormal();
        this.emit(MouseEvent_1.CoreUI.MouseEvent.Tap, pointer, this);
    }
    get label() {
        return this.mLabel;
    }
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
