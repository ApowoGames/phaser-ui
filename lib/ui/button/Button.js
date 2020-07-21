"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
import BaseUI from "../baseUI/BaseUI";
import ClickEvent from "../interface/event/ClickEvent";
/**
 * @enum {string}
 * @memberof apowophaserui
 * @readonly
 * @property {string} Change "Text_Change"
 * @property {string} Click "Text_Click"
 * @property {string} DBClick "Text_DBClick"
 * @property {string} Focus "Text_Focus"
 */
var ButtonState = {
    "Normal": "normal",
    "Over": "over",
    "Select": "select",
    "Disable": "disable",
};
/**
 * @class Button
 * @memberof apowophaserui
 * @extends apowophaserui.BaseUI
 * @constructor
 * @extends apowophaserui.IButtonState
 * @param {Phaser.Scene} scene
 * @param {string} key
 * @param {string} [frame]
 * @param {string} [downFrame]
 * @param {string} [text]
 * @param {apowophaserui.ISoundGroup} [music]
 * @param {number} [dpr]
 * @param {number} [scale]
 * @param {*} [nineConfig]
 */
class Button extends BaseUI {
    constructor(scene, key, frame, downFrame, text, music, dpr, scale, nineConfig) {
        super(scene);
        /**
         * @name apowophaserui.Button#mDownTime
         * @type {number}
         * @protected
         */
        this.mDownTime = 0;
        /**
         * @name apowophaserui.Button#mPressDelay
         * @type {number}
         * @protected
         */
        this.mPressDelay = 1000;
        /**
         * @name apowophaserui.Button#mIsMove
         * @type {boolean}
         * @protected
         * @default false
         */
        this.mIsMove = false;
        this.dpr = dpr || 1;
        this.scale = scale || 1;
        this.soundGroup = {
            up: {
                key: "click",
            }
        };
        Object.assign(this.soundGroup, music);
        /**
         * @description {width:number,height:number,configList:IPatchesConfig[](top:number,left?:number,right?:number,bottom?:number)}
         * @name apowophaserui.Button#ninePatchConfig
         * @type {*}
         * @protected
         */
        this.ninePatchConfig = nineConfig || undefined;
        /**
         * @name apowophaserui.Button#mKey
         * @type {string}
         * @protected
         */
        this.mKey = key;
        /**
         * @name apowophaserui.Button#mFrame
         * @type {string}
         * @protected
         */
        this.mFrame = frame;
        /**
         * @name apowophaserui.Button#mDownFrame
         * @type {string}
         * @protected
         */
        this.mDownFrame = downFrame;
        /**
         * @name apowophaserui.Button#mText
         * @type {Phaser.GameObjects.Text}
         * @protected
         */
        this.mText;
        /**
         * @name apowophaserui.Button#mBackground
         * @type {Phaser.GameObjects.Image|apowophaserui.NineSlicePatch}
         * @protected
         */
        this.mBackground;
        this.createBackground();
        if (text) {
            this.mText = this.scene.make.text(undefined, false)
                .setOrigin(0.5, 0.5)
                .setText(text)
                .setSize(this.mBackground.width, this.mBackground.height);
            this.add(this.mText);
        }
        this.setInteractive();
        this.addListen();
    }
    /**
     * @name apowophaserui.Button#background
     * @type {Phaser.GameObjects.Image}
     * @return {Phaser.GameObjects.Image}
     */
    get background() {
        return this.mBackground;
    }
    /**
     * @name apowophaserui.Button#text
     * @type {Phaser.GameObjects.Text}
     * @return {Phaser.GameObjects.Text}
     */
    get text() {
        return this.mText;
    }
    /**
     * @method  apowophaserui.Button#addListen
     */
    addListen() {
        this.removeListen();
        this.on("pointerdown", this.onPointerDownHandler, this);
        this.on("pointerup", this.onPointerUpHandler, this);
        this.on("pointermove", this.onPointerMoveHandler, this);
    }
    /**
     * @method  apowophaserui.Button#removeListen
     */
    removeListen() {
        this.off("pointerdown", this.onPointerDownHandler, this);
        this.off("pointerup", this.onPointerUpHandler, this);
        this.off("pointermove", this.onPointerMoveHandler, this);
    }
    /**
     * @method  apowophaserui.Button#mute
     * @param {boolean}boo
     */
    mute(boo) {
        this.silent = boo;
    }
    /**
     * @method  apowophaserui.Button#changeNormal
     */
    changeNormal() {
        this.setBgFrame(this.mFrame);
    }
    /**
     * @method  apowophaserui.Button#changeDown
     */
    changeDown() {
        if (this.mDownFrame) {
            this.setBgFrame(this.mDownFrame);
        }
    }
    /**
     * @method  apowophaserui.Button#setFrame
     * @param {string|number}frame
     */
    setFrame(frame) {
        if (this.mBackground) {
            this.setBgFrame(frame);
        }
    }
    /**
     * @method apowophaserui.Button#setText
     * @param {string} val 
     */
    setText(val) {
        if (this.mText) {
            this.mText.setText(val);
        }
    }
    /**
     * @method apowophaserui.Button#setTextStyle
     * @param {*} style 
     */
    setTextStyle(style) {
        if (this.mText) {
            this.mText.setStyle(style);
        }
    }
    /**
     * @method apowophaserui.Button#setFontStyle
     * @param {string} val 
     */
    setFontStyle(val) {
        if (this.mText) {
            this.mText.setFontStyle(val);
        }
    }
    /**
     * @method apowophaserui.Button#setTextOffset
     * @param {number} x 
     * @param {number} y 
     */
    setTextOffset(x, y) {
        if (this.mText) {
            this.mText.setPosition(x, y);
        }
    }
    /**
     * @method apowophaserui.Button#setTextColor
     * @param {string} color 
     */
    setTextColor(color) {
        if (this.mText) {
            this.mText.setColor(color);
        }
    }
    /**
     * @method apowophaserui.Button#createBackground
     */
    createBackground() {
        this.mBackground = this.scene.make.image({
            key: this.mKey,
            frame: this.mFrame
        }, false);
        this.setSize(this.mBackground.width, this.mBackground.height);
        this.add(this.mBackground);
    }
    /**
     * @method apowophaserui.Button#setBgFrame
     * @param {string|number} frame 
     */
    setBgFrame(frame) {
        this.mBackground.setFrame(frame);
        this.setSize(this.mBackground.width, this.mBackground.height);
    }
    /**
     * @method apowophaserui.Button#buttonStateChange
     * @param {apowophaserui.ButtonState} state 
     */
    buttonStateChange(state) {
        switch (state) {
            case ButtonState.Normal:
                this.changeNormal();
                break;
            case ButtonState.Over:
                break;
            case ButtonState.Select:
                this.changeDown();
                break;
            case ButtonState.Disable:
                break;
        }
    }
    /**
     * @method apowophaserui.Button#onPointerMoveHandler
     * @param {Phaser.Input.Pointer} pointer 
     */
    onPointerMoveHandler(pointer) {
        if (this.soundGroup && this.soundGroup.move)
            this.playSound(this.soundGroup.move);
        if (!this.interactiveBoo)
            return;
        this.mIsMove = true;
        this.emit(ClickEvent.Move);
    }
    /**
     * @method apowophaserui.Button#onPointerUpHandler
     * @param {Phaser.Input.Pointer} pointer 
     */
    onPointerUpHandler(pointer) {
        if (!this.interactiveBoo) {
            if (this.soundGroup && this.soundGroup.disabled)
                this.playSound(this.soundGroup.disabled);
            return;
        }
        this.buttonStateChange(ButtonState.Normal);
        if (!this.mIsMove || (Date.now() - this.mDownTime > this.mPressTime)) {
            if (Math.abs(pointer.downX - pointer.upX) < 30 && Math.abs(pointer.downY - pointer.upY) < 30) {
                if (this.soundGroup && this.soundGroup.up)
                    this.playSound(this.soundGroup.up);
                this.emit(ClickEvent.Tap, pointer, this);
            }
        }
        clearTimeout(this.mPressDelay);
        this.mIsMove = false;
        this.mDownTime = 0;
    }
    /**
      * @method apowophaserui.Button#onPointerDownHandler
      * @param {Phaser.Input.Pointer} pointer 
      */
    onPointerDownHandler(pointer) {
        if (!this.interactiveBoo) {
            if (this.soundGroup && this.soundGroup.disabled)
                this.playSound(this.soundGroup.disabled);
            return;
        }
        if (this.soundGroup && this.soundGroup.down)
            this.playSound(this.soundGroup.down);
        this.buttonStateChange(ButtonState.Select);
        this.mDownTime = Date.now();
        this.mPressTime = setTimeout(() => {
            this.emit(ClickEvent.Hold, this);
        }, this.mPressTime);
        this.emit(ClickEvent.Down, this);
    }
}
export { Button, ButtonState };
