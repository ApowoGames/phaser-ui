"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
import { Button, ButtonState } from "../button/Button";
import ClickEvent from "../interface/event/ClickEvent";
/**
 * @class TabButton
 * @memberof phaserui
 * @constructor
 * @extends phaserui.Button
 * @param {Phaser.Scene} scene
 * @param {string} key
 * @param {string} [frame]
 * @param {string} [downFrame]
 * @param {string} [text]
 * @param {phaserui.ISoundGroup} [music]
 * @param {number} [dpr]
 * @param {number} [scale]
 * @param {*} [nineConfig]
 */
class TabButton extends Button {
    constructor(scene, key, frame, downFrame, text, music, dpr, scale, nineConfig) {
        super(scene, key, frame, downFrame, text, music, dpr, scale, nineConfig);
        this.mSelected = false;
    }
    set selected(value) {
        this.mSelected = value;
        const buttonState = value ? ButtonState.Select : ButtonState.Normal;
        this.buttonStateChange(buttonState);
        this.emit("selectChange", value);
    }
    /**
     * @name phaserui.TabButton#selected
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
