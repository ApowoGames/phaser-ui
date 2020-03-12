/*
 * 按钮组件
 * @Author: gxm
 * @Date: 2020-03-10 10:51:48
 * @Last Modified by: gxm
 * @Last Modified time: 2020-03-12 16:55:13
 */

import { FramesSkin } from "./frameSkin";
import { Tool } from "../tool/tool";
import { Event } from "../interface/eventType";
import { IFramesSkinData } from "../interface/iFramesSkinData";
import { TextConfig } from "../interface/textConfig";
import { Transform } from "../interface/transform";
import { AbstractInteractiveObject } from "../interface/abstructInteractiveObject";

export enum ButtonState {
    Normal = "normal",
    Over = "over",
    Select = "select",
    Disable = "disable",
}
export interface ButtonConfig {
    framesSkinData: IFramesSkinData;
    transform?: Transform;
    textconfig?: TextConfig;
    text?: string;
}
const GetValue = Phaser.Utils.Objects.GetValue;
export class Button extends Phaser.Events.EventEmitter implements AbstractInteractiveObject {
    protected mSelected: boolean;
    protected mEnabled: boolean;
    protected mContainer: Phaser.GameObjects.Container;
    protected mFrameSkin: FramesSkin;
    protected mText: Phaser.GameObjects.Text;
    protected mConfig: ButtonConfig;
    protected mPressTime: number = 2000;
    protected mPressDelay: any;
    protected mDownTime: number = 0;
    protected mIsMove: boolean = false;
    protected mWorld;
    public constructor(scene: Phaser.Scene, btnConfig: ButtonConfig, world: any) {
        super();
        this.mConfig = btnConfig;
        this.mWorld = world;
        const transform: Transform = !btnConfig ? undefined : btnConfig.transform;
        const pos: any = Tool.getPos(transform);
        const posX = pos.x;
        const posY = pos.y;
        const baseWidth = !transform && !transform.width ? 0 : transform.width;
        const baseHeight = !transform && !transform.height ? 0 : transform.height;
        // 按钮容器
        this.mContainer = scene.make.container({ x: posX, y: posY, width: baseWidth, height: baseHeight }, false);
        this.mContainer.setInteractive(new Phaser.Geom.Rectangle(0, 0, baseWidth, baseHeight), Phaser.Geom.Rectangle.Contains);
        this.mFrameSkin = new FramesSkin(scene, btnConfig.framesSkinData);
        //按钮背景
        const bgTransform: Transform = this.mConfig.framesSkinData.background.transForm;
        this.mFrameSkin.BackGround.x = Tool.getPos(bgTransform).x;
        this.mFrameSkin.BackGround.y = Tool.getPos(bgTransform).y;
        this.mContainer.add(this.mFrameSkin.BackGround);
        //按钮icon
        if (this.mFrameSkin.Icon) {
            const iconTransform: Transform = this.mConfig.framesSkinData.icon.transForm;
            this.mFrameSkin.Icon.x = Tool.getPos(iconTransform).x;
            this.mFrameSkin.Icon.y = Tool.getPos(iconTransform).y;
            this.mContainer.add(this.mFrameSkin.Icon);
        }
        //按钮文本
        const textconfig = {};
        const txtTransform: Transform = btnConfig.textconfig.transform;
        this.mText = scene.make.text({
            x: Tool.getPos(txtTransform).x,
            y: Tool.getPos(txtTransform).y,
            style: Object.assign(textconfig, btnConfig.textconfig.style)
        }, false);
        this.mContainer.add(this.mText);
        this.mContainer.on("pointerDown", this.onPointerDownHandler, this)
        this.mContainer.on("pointerUp", this.onPointerUpHandler, this);
        this.mContainer.on("pointerMove", this.onPointerMoveHandler, this);
    }

    public set selected(value: boolean) {
        this.mSelected = value;
        // const buttonState = value ? ButtonState.Select : ButtonState.Normal;
        // this.buttonStateChange(buttonState);
    }
    public get selected(): boolean {
        return this.mSelected;
    }

    public set enabled(value: boolean) {
        this.mEnabled = value;
        const buttonState = value ? ButtonState.Normal : ButtonState.Disable;
        this.buttonStateChange(buttonState);
    }

    public get enabled(): boolean {
        return this.mEnabled;
    }

    public setSize(width: number, height: number) {
        this.mContainer.setSize(width, height);
        this.mContainer.setInteractive(new Phaser.Geom.Rectangle(0, 0, width, height), Phaser.Geom.Rectangle.Contains);
    }

    public setText(val: string) {
        if (this.mText) this.mText.text = val;
    }

    public get skin(): Phaser.GameObjects.Container {
        return this.mContainer;
    }

    public destroy() {
        this.mContainer.off("pointerDown", this.onPointerDownHandler, this);
        this.mContainer.off("pointerUp", this.onPointerUpHandler, this);
        this.mContainer.off("pointerMove", this.onPointerMoveHandler, this);
        if (this.mPressDelay) {
            clearTimeout(this.mPressDelay);
        }
        this.mDownTime = 0;
        this.mIsMove = false;
        super.destroy();
    }

    protected onPointerUpHandler(pointer) {
        if (!this.mEnabled) return;
        this.buttonStateChange(ButtonState.Normal);
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
        this.buttonStateChange(ButtonState.Select);
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

    protected buttonStateChange(state: ButtonState) {
        const frameName: string = this.mConfig.framesSkinData.background.frameObj[state];
        if (this.mFrameSkin) {
            this.mFrameSkin.changeFrame(frameName);
        }
    }
}
