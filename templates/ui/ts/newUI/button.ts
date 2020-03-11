/*
 * 按钮组件
 * @Author: gxm
 * @Date: 2020-03-10 10:51:48
 * @Last Modified by: gxm
 * @Last Modified time: 2020-03-11 19:18:14
 */

import { AbstractInteractiveObject, UIProvider, Transform } from "../interface/AbstractUI";
import { IFramesSkinData } from "../interface/ISkinData";
import { FramesSkin } from "./baseSkin";
import { Pos } from "../tool/pos";
import { TextConfig } from "../interface/TextConfig";
import { Event } from "../interface/eventType";

export enum ButtonState {
    Normal = "normal",
    Over = "over",
    Select = "select",
    Disable = "disable",
}
export interface ButtonConfig {
    transform: Transform;
    framesSkinData: IFramesSkinData;
    textconfig: TextConfig;
    text?: string;
}
const GetValue = Phaser.Utils.Objects.GetValue;
export class Button extends Phaser.Events.EventEmitter implements AbstractInteractiveObject {
    private mSelected: boolean;
    private mEnabled: boolean;
    private mContainer: Phaser.GameObjects.Container;
    private mFrameSkin: FramesSkin;
    private mText: Phaser.GameObjects.Text;
    private mConfig: ButtonConfig;
    private mPressTime: number = 2000;
    private mPressDelay: any;
    private mDownTime: number = 0;
    private mIsMove: boolean = false;
    private mWorld;
    public constructor(btnConfig: ButtonConfig, world: any) {
        super();
        this.mConfig = btnConfig;
        this.mWorld = world;
        const transform: Transform = btnConfig.transform;
        const posX = this.getPos(transform).x;
        const posY = this.getPos(transform).y;
        const scene = transform.scene;
        const baseWidth = transform.width;
        const baseHeight = transform.height;
        const dpr = world.dpr;
        // 按钮容器
        this.mContainer = scene.make.container({ x: posX, y: posY, width: baseWidth * dpr, height: baseHeight * dpr }, false);
        this.mContainer.setInteractive(new Phaser.Geom.Rectangle(0, 0, baseWidth * dpr, baseHeight * dpr), Phaser.Geom.Rectangle.Contains);
        this.mFrameSkin = new FramesSkin(scene, btnConfig.framesSkinData);
        //按钮背景
        const bgTransform: Transform = this.mConfig.framesSkinData.background.transForm;
        this.mFrameSkin.BackGround.x = this.getPos(bgTransform).x;
        this.mFrameSkin.BackGround.y = this.getPos(bgTransform).y;
        this.mContainer.add(this.mFrameSkin.BackGround);
        //按钮icon
        if (this.mFrameSkin.Icon) {
            const iconTransform: Transform = this.mConfig.framesSkinData.icon.transForm;
            this.mFrameSkin.Icon.x = this.getPos(iconTransform).x;
            this.mFrameSkin.Icon.y = this.getPos(iconTransform).y;
            this.mContainer.add(this.mFrameSkin.Icon);
        }
        //按钮文本
        const textconfig = {};
        const txtTransform: Transform = btnConfig.textconfig.transform;
        this.mText = scene.make.text({
            x: this.getPos(txtTransform).x,
            y: this.getPos(txtTransform).y,
            style: Object.assign(textconfig, btnConfig.textconfig.style)
        }, false);
        this.mContainer.add(this.mText);
        this.mContainer.on("pointerDown", this.onPointerDownHandler, this)
        this.mContainer.on("pointerUp", this.onPointerUpHandler, this);
        this.mContainer.on("pointerMove", this.onPointerMoveHandler, this);
    }

    public set selected(value: boolean) {
        this.mSelected = value;
        const buttonState: string = value ? ButtonState.Select : ButtonState.Normal;
        const frameName: string = this.mConfig.framesSkinData.background.frameObj[buttonState];
        if (this.mFrameSkin) {
            this.mFrameSkin.changeFrame(frameName);
        }
    }
    public get selected(): boolean {
        return this.mSelected;
    }

    public set enabled(value: boolean) {
        this.mEnabled = value;
        const buttonState: string = value ? ButtonState.Normal : ButtonState.Disable;
        const frameName: string = this.mConfig.framesSkinData.background.frameObj[buttonState];
        if (this.mFrameSkin) {
            this.mFrameSkin.changeFrame(frameName);
        }
    }

    public get enabled(): boolean {
        return this.mEnabled;
    }

    public setText(val: string) {
        if (this.mText) this.mText.text = val;
    }

    public destroy() {
        this.mContainer.off("pointerDown", this.onPointerDownHandler, this)
        this.mContainer.off("pointerUp", this.onPointerUpHandler, this);
        this.mContainer.off("pointerMove", this.onPointerMoveHandler, this);
        if (this.mPressDelay) {
            clearTimeout(this.mPressDelay);
        }
        this.mIsMove = false;
        super.destroy();
    }

    protected getPos(transform: Transform): Pos {
        const pos: Pos = new Pos();
        let tmpValue: string;
        if (typeof (transform.x) === "string") {
            tmpValue = GetValue(transform, "x", "100%");
            pos.x = Number(tmpValue.split("%")[0]) * transform.width;
        } else {
            pos.x = GetValue(transform, "x", 0);
        }

        if (typeof (transform.y) === "string") {
            tmpValue = GetValue(transform, "y", "100%");
            pos.y = Number(tmpValue.split("%")[0]) * transform.height;
        } else {
            pos.y = GetValue(transform, "y", 0);
        }
        return pos;
    }
    protected onPointerUpHandler(pointer) {
        if (!this.mEnabled) return;
        // 移动端用tap替换click
        if (!this.mWorld.game.device.os.desktop) {
            // 在没有发生移动或点击时间超过200毫秒发送tap事件
            if (!this.mIsMove || (Date.now() - this.mDownTime > this.mPressTime)) {
                // events.push(MouseEvent.Tap);
                this.emit(Event.Tap, pointer, this.mContainer);
            }
        } else {
            this.emit(Event.Click, pointer, this);
        }
        clearTimeout(this.mPressDelay);
        this.mIsMove = false;
        this.mDownTime = 0;
    }

    protected onPointerDownHandler(pointer) {
        if (!this.mEnabled) return;
        this.mDownTime = Date.now();
        this.mPressDelay = setTimeout(() => {
            this.emit(Event.Hold, this);
        }, this.mPressTime);
        this.emit(Event.Down);
    }

    protected onPointerMoveHandler(pointer) {
        if (!this.mEnabled) return;
        this.mIsMove = true;
        this.emit(Event.Move);
    }
}
