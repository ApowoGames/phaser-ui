"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Button_1 = require("../button/Button");
const MouseEvent_1 = require("../interface/event/MouseEvent");
class TabButton extends Button_1.Button {
    constructor(scene, key, frame, downFrame, text, music, dpr, scale, nineConfig) {
        super(scene, key, frame, downFrame, text, music, dpr, scale, nineConfig);
        this.mSelected = false;
    }
    set selected(value) {
        this.mSelected = value;
        const buttonState = value ? Button_1.ButtonState.Select : Button_1.ButtonState.Normal;
        this.buttonStateChange(buttonState);
        this.emit("selectChange", value);
    }
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
                this.emit(MouseEvent_1.CoreUI.MouseEvent.Tap, pointer, this);
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
            this.emit(MouseEvent_1.CoreUI.MouseEvent.Hold, this);
        }, this.mPressTime);
        this.emit(MouseEvent_1.CoreUI.MouseEvent.Down, this);
    }
}
exports.TabButton = TabButton;
