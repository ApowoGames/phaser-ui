"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseUI_1 = require("../baseUI/BaseUI");
const MouseEvent_1 = require("../interface/event/MouseEvent");
var ButtonState;
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
class Button extends BaseUI_1.BaseUI {
    constructor(scene, key, frame, downFrame, text, music, dpr, scale, nineConfig) {
        super(scene);
        this.mDownTime = 0;
        this.mPressDelay = 1000;
        this.mIsMove = false;
        this.dpr = dpr || 1;
        this.scale = scale || 1;
        this.soundGroup = {
            up: {
                key: "click",
            }
        };
        Object.assign(this.soundGroup, music);
        this.ninePatchConfig = nineConfig;
        this.mKey = key;
        this.mFrame = frame;
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
    get background() {
        return this.mBackground;
    }
    get text() {
        return this.mText;
    }
    addListen() {
        this.removeListen();
        this.on("pointerdown", this.onPointerDownHandler, this);
        this.on("pointerup", this.onPointerUpHandler, this);
        this.on("pointermove", this.onPointerMoveHandler, this);
    }
    removeListen() {
        this.off("pointerdown", this.onPointerDownHandler, this);
        this.off("pointerup", this.onPointerUpHandler, this);
        this.off("pointermove", this.onPointerMoveHandler, this);
    }
    mute(boo) {
        this.silent = boo;
    }
    changeNormal() {
        this.setBgFrame(this.mFrame);
    }
    changeDown() {
        if (this.mDownFrame) {
            this.setBgFrame(this.mDownFrame);
        }
    }
    setFrame(frame) {
        if (this.mBackground) {
            this.setBgFrame(frame);
        }
    }
    setText(val) {
        if (this.mText) {
            this.mText.setText(val);
        }
    }
    setTextStyle(style) {
        if (this.mText) {
            this.mText.setStyle(style);
        }
    }
    setFontStyle(val) {
        if (this.mText) {
            this.mText.setFontStyle(val);
        }
    }
    setTextOffset(x, y) {
        if (this.mText) {
            this.mText.setPosition(x, y);
        }
    }
    setTextColor(color) {
        if (this.mText) {
            this.mText.setColor(color);
        }
    }
    createBackground() {
        this.mBackground = this.scene.make.image({
            key: this.mKey,
            frame: this.mFrame
        }, false);
        this.setSize(this.mBackground.width, this.mBackground.height);
        this.add(this.mBackground);
    }
    setBgFrame(frame) {
        this.mBackground.setFrame(frame);
        this.setSize(this.mBackground.width, this.mBackground.height);
    }
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
    onPointerMoveHandler(pointer) {
        if (this.soundGroup && this.soundGroup.move)
            this.playSound(this.soundGroup.move);
        if (!this.interactiveBoo)
            return;
        this.mIsMove = true;
        this.emit(MouseEvent_1.CoreUI.MouseEvent.Move);
    }
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
