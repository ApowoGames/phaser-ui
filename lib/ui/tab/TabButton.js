"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
import { Button } from "../button/Button";
import ClickEvent from "../interface/event/ClickEvent";
/**
 * @class TabButton
 * @memberof apowophaserui
 * @constructor
 * @extends apowophaserui.Button
 * @param {Phaser.Scene} scene
 * @param {apowophaserui.ButtonConfig} buttonConfig
 */
class TabButton extends Button {
    constructor(scene, buttonConfig) {
        super(scene, buttonConfig);
        this.mSelected = false;
    }
    set selected(value) {
        this.mSelected = value;
        const buttonState = value ? ButtonState.Select : ButtonState.Normal;
        this.buttonStateChange(buttonState);
        this.emit("selectChange", value);
    }
    /**
     * @name apowophaserui.TabButton#selected
     * @return {boolean}
     */
    get selected() {
        return this.mSelected;
    }

    destroy() {
        this.selected = false;
        super.destroy();
    }
    onPointerUpHandler(pointer) {
        if (!this.interactiveBoo) {
            if (this.soundGroup && this.soundGroup.disabled)
                this.playSound(this.soundGroup.disabled);
            return;
        }
        if (!this.mIsMove || (Date.now() - this.mDownTime > this.mPressTime)) {
            if (Math.abs(pointer.downX - pointer.upX) < 30 && Math.abs(pointer.downY - pointer.upY) < 30) {
                if (this.soundGroup && this.soundGroup.up)
                    this.playSound(this.soundGroup.up);
                this.emit(ClickEvent.Tap, pointer, this);
                this.selected = true;
            }
        }
        clearTimeout(this.mPressDelay);
        this.mIsMove = false;
        this.mDownTime = 0;
    }
    onPointerDownHandler(pointer) {
        if (!this.interactiveBoo) {
            if (this.soundGroup && this.soundGroup.disabled)
                this.playSound(this.soundGroup.disabled);
            return;
        }
        if (this.soundGroup && this.soundGroup.down)
            this.playSound(this.soundGroup.down);
        this.mDownTime = Date.now();
        this.mPressTime = setTimeout(() => {
            this.emit(ClickEvent.Hold, this);
        }, this.mPressTime);
        this.emit(ClickEvent.Down, this);
    }
}
export default TabButton;
