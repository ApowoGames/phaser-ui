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
        super(scene, key, frame, downFrame, text, music, dpr, scale, nineConfig, false);
        /**
         * @name apowophaserui.TabButton#mSelected
         * @type {boolean}
         */
        this.mSelected = false;
    }
    /**
     * @name apowophaserui.TabButton#selected
     * @param {boolean} value
     */
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
        if (this.mTweenBoo) {
            this.tween(false, this.pointerUp.bind(this, pointer));
        } else {
            this.pointerUp(pointer);
        }

    }
    pointerUp(pointer) {
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
     * @method apowophaserui.TabButton#onPointerOutHandler
     * @param {Phaser.Input.Pointer} pointer 
     * @protected
     */
    onPointerOutHandler(pointer) {
        super.onPointerOutHandler(pointer);
        this.buttonStateChange(this.mSelected ? ButtonState.Select : ButtonState.Normal);
    }
}
export default TabButton;
