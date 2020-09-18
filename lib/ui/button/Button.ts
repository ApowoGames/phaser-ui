import { BaseUI } from "../baseUI/BaseUI";
import { ISoundGroup } from "../interface/sound/ISoundConfig";
import { IButtonState } from "../interface/button/IButtonState";
import { ClickEvent } from "../interface/event/ClickEvent";
import { NineSlicePatch } from "../ninepatch/NineSlicePatch";
import { IPatchesConfig } from "../interface/baseUI/Patches.config";

export enum ButtonState {
    Normal = "normal",
    Over = "over",
    Select = "select",
    Disable = "disable",
}

export enum ButtonSoundKey {

}
const GetValue = Phaser.Utils.Objects.GetValue;
export interface NinePatchConfig {
    width: number;
    height: number;
    configlist: IPatchesConfig[];
}
export class Button extends BaseUI implements IButtonState {
    protected soundGroup: ISoundGroup;
    protected mDownTime: number = 0;
    protected mPressDelay = 1000;
    protected mPressTime: any;
    protected mBackground: Phaser.GameObjects.Image | NineSlicePatch;
    protected mKey: string;
    protected mFrame: string;
    protected mDownFrame: string;
    protected mText: Phaser.GameObjects.Text;
    protected mIsMove: boolean = false;
    protected mIsDown: boolean;
    protected ninePatchConfig: NinePatchConfig;
    private mRectangle: Phaser.Geom.Rectangle;
    private zoom: number;
    constructor(scene: Phaser.Scene, key: string, frame?: string, downFrame?: string, text?: string, music?: ISoundGroup, dpr?: number, scale?: number, nineConfig?: NinePatchConfig) {
        super(scene);
        this.dpr = dpr || 1;
        // this.scale = scale || 1;
        this.zoom = scale || 1;
        this.soundGroup = {
            up: {
                key: "click",
                // urls: "./resources/sound/click.mp3"
            }
        };
        Object.assign(this.soundGroup, music);
        this.ninePatchConfig = nineConfig;
        this.mKey = key;
        this.mFrame = frame || "__BASE";
        this.mDownFrame = downFrame;
        this.createBackground();
        if (text) {
            this.mText = this.scene.make.text(undefined, false)
                .setOrigin(0.5, 0.5)
                .setText(text);
            if (this.mBackground) {
                this.mText.setSize(this.mBackground.width, this.mBackground.height);
            }
            this.add(this.mText);
        }
        this.setInteractive();
        this.addListen();
    }

    public get background(): Phaser.GameObjects.Image | NineSlicePatch {
        return this.mBackground;
    }

    public get text(): Phaser.GameObjects.Text {
        return this.mText;
    }

    public addListen() {
        this.removeListen();
        this.on("pointerdown", this.onPointerDownHandler, this);
        this.on("pointerup", this.onPointerUpHandler, this);
        this.on("pointermove", this.onPointerMoveHandler, this);
    }

    public removeListen() {
        this.off("pointerdown", this.onPointerDownHandler, this);
        this.off("pointerup", this.onPointerUpHandler, this);
        this.off("pointermove", this.onPointerMoveHandler, this);
    }

    public set enable(value) {
        if (value) {
            if (this.mBackground) {
                this.mBackground.clearTint();
                if (this.mText) this.mText.clearTint();
            }
            this.setInteractive();
        } else {
            if (this.mBackground) {
                this.mBackground.setTintFill(0x666666);
                if (this.mText) this.mText.setTintFill(0x777777);
            }
            this.removeInteractive();
        }
    }

    public mute(boo: boolean) {
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

    setFrame(frame: string) {
        this.setBgFrame(frame);
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
    public setFrameNormal(normal: string, down?: string, over?: string) {
        this.mFrame = normal;
        this.mDownFrame = (down ? down : normal);
        this.changeNormal();
        return this;
    }
    protected createBackground() {
        if (this.mFrame) {
            this.mBackground = this.scene.make.image({
                key: this.mKey,
                frame: this.mFrame
            }, false);
            this.setSize(this.mBackground.width, this.mBackground.height);
            this.add(this.mBackground);
        }
    }
    protected setBgFrame(frame: string) {
        if (this.mBackground) {
            this.mBackground.setFrame(frame);
            this.setSize(this.mBackground.width, this.mBackground.height);
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
        this.emit(ClickEvent.Move);
    }

    protected onPointerUpHandler(pointer: Phaser.Input.Pointer) {
        if (!this.interactiveBoo) {
            if (this.soundGroup && this.soundGroup.disabled) this.playSound(this.soundGroup.disabled);
            return;
        }
        this.buttonStateChange(ButtonState.Normal);
        // if (!this.mIsMove || (Date.now() - this.mDownTime > this.mPressTime)) {
        const isdown = this.checkPointerInBounds(this, pointer.worldX, pointer.worldY);
        this.emit(ClickEvent.Up, this);
        // if (Math.abs(pointer.downX - pointer.upX) < this.width && Math.abs(pointer.downY - pointer.upY) < this.height) {
        if (isdown && this.mIsDown) {
            if (this.soundGroup && this.soundGroup.up) this.playSound(this.soundGroup.up);
            this.emit(ClickEvent.Tap, pointer, this);
        }
        // }

        clearTimeout(this.mPressTime);
        this.mIsMove = false;
        this.mIsDown = false;
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
            this.emit(ClickEvent.Hold, this);
        }, this.mPressDelay);
        this.emit(ClickEvent.Down, this);
        // this.mIsDownObject = this.checkPointerInBounds(this, pointer.worldX, pointer.worldY);
        this.mIsDown = true;
    }

    protected checkPointerInBounds(gameObject: any, pointerx: number, pointery: number): boolean {
        if (!this.mRectangle) {
            this.mRectangle = new Phaser.Geom.Rectangle(0, 0, 0, 0);
        }
        const zoom = this.zoom ? this.zoom : 1;
        this.mRectangle.left = -gameObject.width / 2;
        this.mRectangle.right = gameObject.width / 2;
        this.mRectangle.top = -gameObject.height / 2;
        this.mRectangle.bottom = gameObject.height / 2;
        const worldMatrix: Phaser.GameObjects.Components.TransformMatrix = gameObject.getWorldTransformMatrix();
        const x: number = (pointerx - worldMatrix.tx) / zoom;
        const y: number = (pointery - worldMatrix.ty) / zoom;
        if (this.mRectangle.left <= x && this.mRectangle.right >= x && this.mRectangle.top <= y && this.mRectangle.bottom >= y) {
            return true;
        }
        return false;
    }
}
