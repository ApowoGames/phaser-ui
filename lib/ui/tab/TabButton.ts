import { Button, ButtonState } from "../button/Button";
import { ISoundGroup } from "../interface/sound/ISoundConfig";
import { MouseEvent } from "../interface/event/MouseEvent";

export class TabButton extends Button {
    protected mSelected: boolean = false;
    constructor(scene: Phaser.Scene, key: string, frame?: string, downFrame?: string, text?: string, music?: ISoundGroup) {
        super(scene, key, frame, downFrame, text, music);
    }

    public set selected(value: boolean) {
        this.mSelected = value;
        const buttonState = value ? ButtonState.Select : ButtonState.Normal;
        this.buttonStateChange(buttonState);
        this.emit("selectChange", value);
    }

    public get selected(): boolean {
        return this.mSelected;
    }

    public destroy() {
        this.selected = false;
        super.destroy();
    }

    protected onPointerUpHandler(pointer: Phaser.Input.Pointer) {
        if (!this.interactiveBoo) {
            if (this.soundGroup && this.soundGroup.disabled) this.playSound(this.soundGroup.disabled);
            return;
        }
        if (!this.mIsMove || (Date.now() - this.mDownTime > this.mPressTime)) {
            if (Math.abs(pointer.downX - pointer.upX) < 30 && Math.abs(pointer.downY - pointer.upY) < 30) {
                if (this.soundGroup && this.soundGroup.up) this.playSound(this.soundGroup.up);
                this.emit(MouseEvent.Tap, pointer, this);
            }
        }

        clearTimeout(this.mPressDelay);
        this.mIsMove = false;
        this.mDownTime = 0;
    }

    protected onPointerDownHandler(pointer: Phaser.Input.Pointer) {
        if (!this.interactiveBoo) {
            if (this.soundGroup && this.soundGroup.disabled) this.playSound(this.soundGroup.disabled);
            return;
        }
        if (this.soundGroup && this.soundGroup.down) this.playSound(this.soundGroup.down);
        this.selected = true;
        this.mDownTime = Date.now();
        this.mPressTime = setTimeout(() => {
            this.emit(MouseEvent.Hold, this);
        }, this.mPressTime);
        this.emit(MouseEvent.Down, this);
    }
}
