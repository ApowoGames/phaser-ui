"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
import ClickEvent from "../interface/event/ClickEvent";
import { Button } from "../button/Button";
var ButtonState = {
    "Normal": 0,
    "Over": 1,
    "Select": 2,
    "Disable": 3,
};
/**
 * @class TabButton
 * @memberof apowophaserui
 * @extends apowophaserui.Button
 * @constructor
 * @param {Phaser.Scene} scene
 * @param {string} key
 * @param {string} [frame]
 * @param {string} [downFrame]
 * @param {string} [text]
 * @param {*} [music]
 * @param {number} [dpr]
 * @param {number} [scale]
 * @param {*} [nineConfig]
 */
class TabButton extends Button {
    constructor(scene, key, frame, downFrame, text, music, dpr, scale, nineConfig) {
        super(scene, key, frame, downFrame, text, music, dpr, scale, nineConfig);
        /**
         * @name apowophaserui.TabButton#mSelected
         * @type {boolean}
         */
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
    /**
     * @method apowophaserui.TabButton#destroy
     */
    destroy() {
        this.selected = false;
        super.destroy();
    }
    /**
     * @method apowophaserui.TabButton#onPointerUpHandler
     * @param {Phaser.Input.Pointer} pointer 
     */
    onPointerUpHandler(pointer) {
        if (!this.interactiveBoo) {
            if (this.soundGroup && this.soundGroup.disabled)
                this.playSound(this.soundGroup.disabled);
            return;
        }
        //  if (!this.mIsMove || (Date.now() - this.mDownTime > this.mPressTime)) {
        //  if (Math.abs(pointer.downX - pointer.upX) < 30 && Math.abs(pointer.downY - pointer.upY) < 30) {
        const isdown = this.checkPointerInBounds(this, pointer.downX, pointer.downY);
        this.emit(ClickEvent.Up, this);
        if (isdown) {
            if (this.soundGroup && this.soundGroup.up)
                this.playSound(this.soundGroup.up);
            this.emit(ClickEvent.Tap, pointer, this);
            this.selected = true;
        }
        //  }
        clearTimeout(this.mPressDelay);
        this.mIsMove = false;
        this.mDownTime = 0;
    }
     /**
     * @method apowophaserui.TabButton#onPointerDownHandler
     * @param {Phaser.Input.Pointer} [pointer] 
     */
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
