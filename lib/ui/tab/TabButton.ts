import { Button, ButtonState, NinePatchConfig } from "../button/Button";
import { ISoundGroup } from "../interface/sound/ISoundConfig";
import { CoreUI } from "../interface/event/MouseEvent";
export class TabButton extends Button {
    protected mSelected: boolean = false;
    constructor(scene: Phaser.Scene, key: string, frame?: string, downFrame?: string, text?: string, music?: ISoundGroup, dpr?: number, scale?: number, nineConfig?: NinePatchConfig) {
        super(scene, key, frame, downFrame, text, music, dpr, scale, nineConfig);
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
                this.emit(CoreUI.MouseEvent.Tap, pointer, this);
                this.selected = true;
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
        this.mDownTime = Date.now();
        this.mPressTime = setTimeout(() => {
            this.emit(CoreUI.MouseEvent.Hold, this);
        }, this.mPressTime);
        this.emit(CoreUI.MouseEvent.Down, this);
    }
}
