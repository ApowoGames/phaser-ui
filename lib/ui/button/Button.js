"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseUI_1 = require("../baseUI/BaseUI");
const MouseEvent_1 = require("../interface/event/MouseEvent");
var ButtonState;
/**
 * @name TooqinUI.Button.ButtonState
 * @enum {string}
 * @memberof TooqinUI
 * @readonly
 */
(function (ButtonState) {
    ButtonState["Normal"] = "normal";
    ButtonState["Over"] = "over";
    ButtonState["Select"] = "select";
    ButtonState["Disable"] = "disable";
})(ButtonState = exports.ButtonState || (exports.ButtonState = {}));
var ButtonSoundKey;
(function (ButtonSoundKey) {
})(ButtonSoundKey = exports.ButtonSoundKey || (exports.ButtonSoundKey = {}));
const GetValue = Phaser.Utils.Objects.GetValue;
/**
 * @class Button
 * @memberof TooqinUI.Button
 * @constructor
 * @param {Phaser.Scene} scene
 * @param {string} key
 * @param {string} frame
 * @param {string} downFrame
 * @param {string} text
 */
class Button extends BaseUI_1.BaseUI {
    constructor(scene, key, frame, downFrame, text, music, dpr, scale, nineConfig) {
        super(scene);
        /**
         * @name TooqinUI.Button#mDownTime
         * @type {number}
         * @protected
         */
        this.mDownTime = 0;
        /**
         * @name TooqinUI.Button#mPressDelay
         * @type {number}
         * @protected
         */
        this.mPressDelay = 1000;
        /**
         * @name TooqinUI.Button#mIsMove
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
         * @name TooqinUI.Button#ninePatchConfig
         * @type {*}
         * @protected
         */
        this.ninePatchConfig = nineConfig;
        /**
         * @name TooqinUI.Button#mKey
         * @type {string}
         * @protected
         */
        this.mKey = key;
        /**
         * @name TooqinUI.Button#mFrame
         * @type {string}
         * @protected
         */
        this.mFrame = frame;
        /**
         * @name TooqinUI.Button#mDownFrame
         * @type {string}
         * @protected
         */
        this.mDownFrame = downFrame;
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
     * @name TooqinUI.Button.background
     * @type {Phaser.GameObjects.Image}
     * @return {Phaser.GameObjects.Image}
     */
    get background() {
        return this.mBackground;
    }
    /**
     * @name TooqinUI.Button.text
     * @type {Phaser.GameObjects.Text}
     * @return {Phaser.GameObjects.Text}
     */
    get text() {
        return this.mText;
    }
    /**
     * @method  TooqinUI.Button#addListen
     */
    addListen() {
        this.removeListen();
        this.on("pointerdown", this.onPointerDownHandler, this);
        this.on("pointerup", this.onPointerUpHandler, this);
        this.on("pointermove", this.onPointerMoveHandler, this);
    }
    /**
     * @method  TooqinUI.Button#removeListen
     */
    removeListen() {
        this.off("pointerdown", this.onPointerDownHandler, this);
        this.off("pointerup", this.onPointerUpHandler, this);
        this.off("pointermove", this.onPointerMoveHandler, this);
    }
    /**
     * @method  TooqinUI.Button#mute
     * @param {boolean}boo
     */
    mute(boo) {
        this.silent = boo;
    }
    /**
     * @method  TooqinUI.Button#changeNormal
     */
    changeNormal() {
        this.setBgFrame(this.mFrame);
    }
    /**
     * @method  TooqinUI.Button#changeDown
     */
    changeDown() {
        if (this.mDownFrame) {
            this.setBgFrame(this.mDownFrame);
        }
    }
    /**
     * @method  TooqinUI.Button#setFrame
     * @param {string|number}frame
     */
    setFrame(frame) {
        if (this.mBackground) {
            this.setBgFrame(frame);
        }
    }
    /**
     * @method TooqinUI.Button#setText
     * @param {string} val 
     */
    setText(val) {
        if (this.mText) {
            this.mText.setText(val);
        }
    }
    /**
     * @method TooqinUI.Button#setTextStyle
     * @param {*} style 
     */
    setTextStyle(style) {
        if (this.mText) {
            this.mText.setStyle(style);
        }
    }
    /**
     * @method TooqinUI.Button#setFontStyle
     * @param {string} val 
     */
    setFontStyle(val) {
        if (this.mText) {
            this.mText.setFontStyle(val);
        }
    }
    /**
     * @method TooqinUI.Button#setTextOffset
     * @param {number} x 
     * @param {number} y 
     */
    setTextOffset(x, y) {
        if (this.mText) {
            this.mText.setPosition(x, y);
        }
    }
    /**
     * @method TooqinUI.Button#setTextColor
     * @param {string} color 
     */
    setTextColor(color) {
        if (this.mText) {
            this.mText.setColor(color);
        }
    }
    /**
     * @method TooqinUI.Button#createBackground
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
     * @method TooqinUI.Button#setBgFrame
     * @param {string|number} frame 
     */
    setBgFrame(frame) {
        this.mBackground.setFrame(frame);
        this.setSize(this.mBackground.width, this.mBackground.height);
    }
    /**
     * @method TooqinUI.Button#buttonStateChange
     * @param {TooqinUI.Button.ButtonState} state 
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
     * @method TooqinUI.Button#onPointerMoveHandler
     * @param {Phaser.Input.Pointer} pointer 
     */
    onPointerMoveHandler(pointer) {
        if (this.soundGroup && this.soundGroup.move)
            this.playSound(this.soundGroup.move);
        if (!this.interactiveBoo)
            return;
        this.mIsMove = true;
        this.emit(MouseEvent_1.CoreUI.MouseEvent.Move);
    }
    /**
     * @method TooqinUI.Button#onPointerUpHandler
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
                this.emit(MouseEvent_1.CoreUI.MouseEvent.Tap, pointer, this);
            }
        }
        clearTimeout(this.mPressDelay);
        this.mIsMove = false;
        this.mDownTime = 0;
    }
    /**
      * @method TooqinUI.Button#onPointerDownHandler
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
            this.emit(MouseEvent_1.CoreUI.MouseEvent.Hold, this);
        }, this.mPressTime);
        this.emit(MouseEvent_1.CoreUI.MouseEvent.Down, this);
    }
}
exports.Button = Button;
