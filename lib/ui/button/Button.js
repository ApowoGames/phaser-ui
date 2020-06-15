"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseUI_1 = require("../baseUI/BaseUI");
const ClickEvent_1 = require("../interface/event/ClickEvent");
/**
 * @enum {string}
 * @memberof Tooqingui
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
 * @namespace Tooqingui.NinePatchConfig
 */
var NinePatchConfig = {
    /**
     * @name Tooqingui.NinePatchConfig#width
     * @type {number}
     */
    width,
    /**
     * @name Tooqingui.NinePatchConfig#height
     * @type {number}
     */
    height,
    /**
     * @name Tooqingui.NinePatchConfig#configlist
     * @type {Tooqingui.IPatchesConfig[]}
     */
    configlist
}
module.exports = NinePatchConfig
/**
 * @class Button
 * @memberof Tooqingui
 * @extends Tooqingui.BaseUI
 * @constructor
 * @extends Tooqingui.IButtonState
 * @param {Phaser.Scene} scene
 * @param {string} key
 * @param {string} [frame]
 * @param {string} [downFrame]
 * @param {string} [text]
 * @param {Tooqingui.ISoundGroup} [music]
 * @param {number} [dpr]
 * @param {number} [scale]
 * @param {Tooqingui.NinePatchConfig} [nineConfig]
 */
class Button extends BaseUI_1.BaseUI {
    constructor(scene, key, frame, downFrame, text, music, dpr, scale, nineConfig) {
        super(scene);
        /**
         * @name Tooqingui.Button#mDownTime
         * @type {number}
         * @protected
         */
        this.mDownTime = 0;
        /**
         * @name Tooqingui.Button#mPressDelay
         * @type {number}
         * @protected
         */
        this.mPressDelay = 1000;
        /**
         * @name Tooqingui.Button#mIsMove
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
         * @name Tooqingui.Button#ninePatchConfig
         * @type {*}
         * @protected
         */
        this.ninePatchConfig = nineConfig;
        /**
         * @name Tooqingui.Button#mKey
         * @type {string}
         * @protected
         */
        this.mKey = key;
        /**
         * @name Tooqingui.Button#mFrame
         * @type {string}
         * @protected
         */
        this.mFrame = frame;
        /**
         * @name Tooqingui.Button#mDownFrame
         * @type {string}
         * @protected
         */
        this.mDownFrame = downFrame;
        /**
         * @name Tooqingui.Button#mText
         * @type {Phaser.GameObjects.Text}
         * @protected
         */
        this.mText;
        /**
         * @name Tooqingui.Button#mBackground
         * @type {Phaser.GameObjects.Image|Tooqingui.NineSlicePatch}
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
     * @name Tooqingui.Button#background
     * @type {Phaser.GameObjects.Image}
     * @return {Phaser.GameObjects.Image}
     */
    get background() {
        return this.mBackground;
    }
    /**
     * @name Tooqingui.Button#text
     * @type {Phaser.GameObjects.Text}
     * @return {Phaser.GameObjects.Text}
     */
    get text() {
        return this.mText;
    }
    /**
     * @method  Tooqingui.Button#addListen
     */
    addListen() {
        this.removeListen();
        this.on("pointerdown", this.onPointerDownHandler, this);
        this.on("pointerup", this.onPointerUpHandler, this);
        this.on("pointermove", this.onPointerMoveHandler, this);
    }
    /**
     * @method  Tooqingui.Button#removeListen
     */
    removeListen() {
        this.off("pointerdown", this.onPointerDownHandler, this);
        this.off("pointerup", this.onPointerUpHandler, this);
        this.off("pointermove", this.onPointerMoveHandler, this);
    }
    /**
     * @method  Tooqingui.Button#mute
     * @param {boolean}boo
     */
    mute(boo) {
        this.silent = boo;
    }
    /**
     * @method  Tooqingui.Button#changeNormal
     */
    changeNormal() {
        this.setBgFrame(this.mFrame);
    }
    /**
     * @method  Tooqingui.Button#changeDown
     */
    changeDown() {
        if (this.mDownFrame) {
            this.setBgFrame(this.mDownFrame);
        }
    }
    /**
     * @method  Tooqingui.Button#setFrame
     * @param {string|number}frame
     */
    setFrame(frame) {
        if (this.mBackground) {
            this.setBgFrame(frame);
        }
    }
    /**
     * @method Tooqingui.Button#setText
     * @param {string} val 
     */
    setText(val) {
        if (this.mText) {
            this.mText.setText(val);
        }
    }
    /**
     * @method Tooqingui.Button#setTextStyle
     * @param {*} style 
     */
    setTextStyle(style) {
        if (this.mText) {
            this.mText.setStyle(style);
        }
    }
    /**
     * @method Tooqingui.Button#setFontStyle
     * @param {string} val 
     */
    setFontStyle(val) {
        if (this.mText) {
            this.mText.setFontStyle(val);
        }
    }
    /**
     * @method Tooqingui.Button#setTextOffset
     * @param {number} x 
     * @param {number} y 
     */
    setTextOffset(x, y) {
        if (this.mText) {
            this.mText.setPosition(x, y);
        }
    }
    /**
     * @method Tooqingui.Button#setTextColor
     * @param {string} color 
     */
    setTextColor(color) {
        if (this.mText) {
            this.mText.setColor(color);
        }
    }
    /**
     * @method Tooqingui.Button#createBackground
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
     * @method Tooqingui.Button#setBgFrame
     * @param {string|number} frame 
     */
    setBgFrame(frame) {
        this.mBackground.setFrame(frame);
        this.setSize(this.mBackground.width, this.mBackground.height);
    }
    /**
     * @method Tooqingui.Button#buttonStateChange
     * @param {Tooqingui.ButtonState} state 
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
     * @method Tooqingui.Button#onPointerMoveHandler
     * @param {Phaser.Input.Pointer} pointer 
     */
    onPointerMoveHandler(pointer) {
        if (this.soundGroup && this.soundGroup.move)
            this.playSound(this.soundGroup.move);
        if (!this.interactiveBoo)
            return;
        this.mIsMove = true;
        this.emit(ClickEvent_1.ClickEvent.Move);
    }
    /**
     * @method Tooqingui.Button#onPointerUpHandler
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
                this.emit(ClickEvent_1.ClickEvent.Tap, pointer, this);
            }
        }
        clearTimeout(this.mPressDelay);
        this.mIsMove = false;
        this.mDownTime = 0;
    }
    /**
      * @method Tooqingui.Button#onPointerDownHandler
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
            this.emit(ClickEvent_1.ClickEvent.Hold, this);
        }, this.mPressTime);
        this.emit(ClickEvent_1.ClickEvent.Down, this);
    }
}
exports.Button = Button;
