"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
import Button from "../button/Button";
import ClickEvent from "../interface/event/ClickEvent";
/**
 * @class CheckBox
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
class CheckBox extends Button {
    constructor(scene, key, frame, downFrame, text, music, dpr, scale, nineConfig) {
        super(scene, key, frame, downFrame, text, music, dpr, scale, nineConfig);
        /**
         * @name apowophaserui.CheckBox#mSelected
         * @type {boolean}
         * @default false
         */
        this.mSelected = false;
    }
    /**
     * @name apowophaserui.CheckBox#selected
     * @type {boolean}
     */
    set selected(value) {
        this.mSelected = value;
        const buttonState = value ? Button.ButtonState.Select : Button.ButtonState.Normal;
        this.buttonStateChange(buttonState);
        this.emit("selectChange", value);
    }
    get selected() {
        return this.mSelected;
    }
    /**
     * @method apowophaserui.CheckBox#destroy
     */
    destroy() {
        this.selected = false;
        super.destroy();
    }
    /**
     * @method apowophaserui.CheckBox#onPointerUpHandler
     * @param {Phaser.Geom.Point} [pointer]
     * @protected 
     */
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
                this.selected = !this.selected;
                this.emit(ClickEvent.Tap, pointer, this);
            }
        }
        clearTimeout(this.mPressDelay);
        this.mIsMove = false;
        this.mDownTime = 0;
    }
    /**
     * @method apowophaserui.CheckBox#onPointerUpHandler
     * @param {Phaser.Geom.Point} [pointer]
     * @protected 
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
export default CheckBox;
