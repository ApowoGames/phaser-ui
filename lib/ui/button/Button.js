"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseUI_1 = require("../baseUI/BaseUI");
const ClickEvent_1 = require("../interface/event/ClickEvent");
/**
 * @enum {string}
 * @memberof tooqingui
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
 * @namespace tooqingui.NinePatchConfig
 */
var NinePatchConfig = {
    /**
     * @name tooqingui.NinePatchConfig#width
     * @type {number}
     */
    width,
    /**
     * @name tooqingui.NinePatchConfig#height
     * @type {number}
     */
    height,
    /**
     * @name tooqingui.NinePatchConfig#configlist
     * @type {tooqingui.IPatchesConfig[]}
     */
    configlist
}
module.exports = NinePatchConfig
/**
 * @class Button
 * @memberof tooqingui
 * @extends tooqingui.BaseUI
 * @constructor
 * @extends tooqingui.IButtonState
 * @param {Phaser.Scene} scene
 * @param {string} key
 * @param {string} [frame]
 * @param {string} [downFrame]
 * @param {string} [text]
 * @param {tooqingui.ISoundGroup} [music]
 * @param {number} [dpr]
 * @param {number} [scale]
 * @param {tooqingui.NinePatchConfig} [nineConfig]
 */
class Button extends BaseUI_1.BaseUI {
    constructor(scene, key, frame, downFrame, text, music, dpr, scale, nineConfig) {
        super(scene);
        /**
         * @name tooqingui.Button#mDownTime
         * @type {number}
         * @protected
         */
        this.mDownTime = 0;
        /**
         * @name tooqingui.Button#mPressDelay
         * @type {number}
         * @protected
         */
        this.mPressDelay = 1000;
        /**
         * @name tooqingui.Button#mIsMove
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
         * @name tooqingui.Button#ninePatchConfig
         * @type {*}
         * @protected
         */
        this.ninePatchConfig = nineConfig;
        /**
         * @name tooqingui.Button#mKey
         * @type {string}
         * @protected
         */
        this.mKey = key;
        /**
         * @name tooqingui.Button#mFrame
         * @type {string}
         * @protected
         */
        this.mFrame = frame;
        /**
         * @name tooqingui.Button#mDownFrame
         * @type {string}
         * @protected
         */
        this.mDownFrame = downFrame;
        /**
         * @name tooqingui.Button#mText
         * @type {Phaser.GameObjects.Text}
         * @protected
         */
        this.mText;
        /**
         * @name tooqingui.Button#mBackground
         * @type {Phaser.GameObjects.Image|tooqingui.NineSlicePatch}
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
     * @name tooqingui.Button#background
     * @type {Phaser.GameObjects.Image}
     * @return {Phaser.GameObjects.Image}
     */
    get background() {
        return this.mBackground;
    }
    /**
     * @name tooqingui.Button#text
     * @type {Phaser.GameObjects.Text}
     * @return {Phaser.GameObjects.Text}
     */
    get text() {
        return this.mText;
    }
    /**
     * @method  tooqingui.Button#addListen
     */
    addListen() {
        this.removeListen();
        this.on("pointerdown", this.onPointerDownHandler, this);
        this.on("pointerup", this.onPointerUpHandler, this);
        this.on("pointermove", this.onPointerMoveHandler, this);
    }
    /**
     * @method  tooqingui.Button#removeListen
     */
    removeListen() {
        this.off("pointerdown", this.onPointerDownHandler, this);
        this.off("pointerup", this.onPointerUpHandler, this);
        this.off("pointermove", this.onPointerMoveHandler, this);
    }
    /**
     * @method  tooqingui.Button#mute
     * @param {boolean}boo
     */
    mute(boo) {
        this.silent = boo;
    }
    /**
     * @method  tooqingui.Button#changeNormal
     */
    changeNormal() {
        this.setBgFrame(this.mFrame);
    }
    /**
     * @method  tooqingui.Button#changeDown
     */
    changeDown() {
        if (this.mDownFrame) {
            this.setBgFrame(this.mDownFrame);
        }
    }
    /**
     * @method  tooqingui.Button#setFrame
     * @param {string|number}frame
     */
    setFrame(frame) {
        if (this.mBackground) {
            this.setBgFrame(frame);
        }
    }
    /**
     * @method tooqingui.Button#setText
     * @param {string} val 
     */
    setText(val) {
        if (this.mText) {
            this.mText.setText(val);
        }
    }
    /**
     * @method tooqingui.Button#setTextStyle
     * @param {*} style 
     */
    setTextStyle(style) {
        if (this.mText) {
            this.mText.setStyle(style);
        }
    }
    /**
     * @method tooqingui.Button#setFontStyle
     * @param {string} val 
     */
    setFontStyle(val) {
        if (this.mText) {
            this.mText.setFontStyle(val);
        }
    }
    /**
     * @method tooqingui.Button#setTextOffset
     * @param {number} x 
     * @param {number} y 
     */
    setTextOffset(x, y) {
        if (this.mText) {
            this.mText.setPosition(x, y);
        }
    }
    /**
     * @method tooqingui.Button#setTextColor
     * @param {string} color 
     */
    setTextColor(color) {
        if (this.mText) {
            this.mText.setColor(color);
        }
    }
    /**
     * @method tooqingui.Button#createBackground
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
     * @method tooqingui.Button#setBgFrame
     * @param {string|number} frame 
     */
    setBgFrame(frame) {
        this.mBackground.setFrame(frame);
        this.setSize(this.mBackground.width, this.mBackground.height);
    }
    /**
     * @method tooqingui.Button#buttonStateChange
     * @param {tooqingui.ButtonState} state 
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
     * @method tooqingui.Button#onPointerMoveHandler
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
     * @method tooqingui.Button#onPointerUpHandler
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
      * @method tooqingui.Button#onPointerDownHandler
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
module.exports = Button;
