import { BaseUI } from "../baseUI/BaseUI";
import { ISoundGroup } from "../interface/sound/ISoundConfig";
import { MouseEvent } from "../interface/event/MouseEvent";
export interface IButtonState {
    changeNormal();
    changeDown();
}

export enum ButtonState {
    Normal = "normal",
    Over = "over",
    Select = "select",
    Disable = "disable",
}

export class Button extends BaseUI implements IButtonState {
    protected soundGroup: ISoundGroup;
    protected mDownTime: number = 0;
    protected mPressDelay = 1000;
    protected mPressTime: any;
    protected mBackground: Phaser.GameObjects.Image;
    protected mKey: string;
    protected mFrame: string;
    protected mDownFrame: string;
    protected mText: Phaser.GameObjects.Text;
    protected mIsMove: boolean = false;
    constructor(scene: Phaser.Scene, key: string, frame?: string, downFrame?: string, text?: string, music?: ISoundGroup) {
        super(scene);
        this.setInteractive();
        this.soundGroup = music;
        this.mKey = key;
        this.mFrame = frame;
        this.mDownFrame = downFrame;
        this.mBackground = scene.make.image({
            key,
            frame
        }, false);
        this.setSize(this.mBackground.width, this.mBackground.height);
        this.add(this.mBackground);
        if (text) {
            this.mText = this.scene.make.text(undefined, false)
                .setOrigin(0.5, 0.5)
                .setText(text)
                .setSize(this.mBackground.width, this.mBackground.height);
            this.add(this.mText);
        }

    }

    public addListen() {
        this.container.on("pointerDown", this.onPointerDownHandler, this);
        this.container.on("pointerUp", this.onPointerUpHandler, this);
        this.container.on("pointerMove", this.onPointerMoveHandler, this);
    }

    public removeListen() {
        this.container.off("pointerDown", this.onPointerDownHandler, this);
        this.container.off("pointerUp", this.onPointerUpHandler, this);
        this.container.off("pointerMove", this.onPointerMoveHandler, this);
    }
    /**
    * 是否静音
    * @param boo 
    */
    public mute(boo: boolean) {
        this.silent = boo;
    }

    changeNormal() {
        this.mBackground.setFrame(this.mFrame);
    }

    changeDown() {
        if (this.mDownFrame) {
            this.mBackground.setFrame(this.mDownFrame);
        }
    }

    setFrame(frame: string) {
        if (this.mBackground) {
            this.mBackground.setFrame(frame);
        }
    }

    setText(val: string) {
        if (this.mText) {
            this.mText.setText(val);
        }
    }

    setTextStyle(style: object) {
        if (this.mText) {
            this.mText.setStyle(style);
        }
    }

    setFontStyle(val: string) {
        if (this.mText) {
            this.mText.setFontStyle(val);
        }
    }

    setTextOffset(x: number, y: number) {
        if (this.mText) {
            this.mText.setPosition(x, y);
        }
    }

    setTextColor(color: string) {
        if (this.mText) {
            this.mText.setColor(color);
        }
    }

    protected buttonStateChange(state: ButtonState) {
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

    protected onPointerMoveHandler(pointer: Phaser.Input.Pointer) {
        if (this.soundGroup && this.soundGroup.move) this.playSound(this.soundGroup.move);
        if (!this.interactiveBoo) return;
        this.mIsMove = true;
        this.emit(MouseEvent.Move);
    }

    protected onPointerUpHandler(pointer: Phaser.Input.Pointer) {
        if (!this.interactiveBoo) {
            if (this.soundGroup && this.soundGroup.disabled) this.playSound(this.soundGroup.disabled);
            return;
        }
        this.buttonStateChange(ButtonState.Normal);
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
        this.buttonStateChange(ButtonState.Select);
        this.mDownTime = Date.now();
        this.mPressTime = setTimeout(() => {
            this.emit(MouseEvent.Hold, this);
        }, this.mPressTime);
        this.emit(MouseEvent.Down, this);
    }
}
