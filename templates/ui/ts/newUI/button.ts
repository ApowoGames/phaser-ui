/*
 * 按钮组件
 * @Author: gxm
 * @Date: 2020-03-10 10:51:48
 * @Last Modified by: gxm
 * @Last Modified time: 2020-03-11 15:09:38
 */

import { AbstractInteractiveObject, UIProvider, Transform } from "../interface/AbstractUI";
import { IFramesSkinData } from "../interface/IUISkin";
import { FramesSkin, SkinEvent } from "./baseSkin";
import { Pos } from "../tool/pos";

export enum ButtonState {
    Normal = "normal",
    Over = "over",
    Select = "select",
    Disable = "disable",
}
export interface ButtonConfig {
    transform: Transform;
    framesSkinData: IFramesSkinData;
    textconfig;
    text?: string;
}
const GetValue = Phaser.Utils.Objects.GetValue;
export class Button implements AbstractInteractiveObject {
    private mSelected: boolean;
    private mEnabled: boolean;
    private mContainer: Phaser.GameObjects.Container;
    private mFrameSkin: FramesSkin;
    private mConfig: ButtonConfig;
    public constructor(config: ButtonConfig) {
        this.mConfig = config;
        const transform: Transform = config.transform;
        const posX = this.getPos(transform).x;
        const posY = this.getPos(transform).y;
        const scene = transform.scene;
        const dpr = transform.dpr;
        const baseWidth = transform.width;
        const baseHeight = transform.height;
        this.mContainer = scene.make.container({ x: posX, y: posY, width: baseWidth * dpr, height: baseHeight * dpr }, false);
        this.mContainer.setInteractive(new Phaser.Geom.Rectangle(0, 0, baseWidth * dpr, baseHeight * dpr), Phaser.Geom.Rectangle.Contains);
        this.mFrameSkin = new FramesSkin(scene, config.framesSkinData);
        this.mFrameSkin.on(SkinEvent.Init, this.skinInitHandler, this);
        this.mFrameSkin.preload();
    }

    public set selected(value: boolean) {
        this.mSelected = value;
        const buttonState: string = value ? ButtonState.Select : ButtonState.Normal;
        if (this.mFrameSkin) {
            this.mFrameSkin.changeFrame(buttonState);
        }
    }
    public get selected(): boolean {
        return this.mSelected;
    }

    public set enabled(value: boolean) {
        this.mEnabled = value;
        const buttonState: string = value ? ButtonState.Normal : ButtonState.Disable;
        if (this.mFrameSkin) {
            this.mFrameSkin.changeFrame(buttonState);
        }
    }

    public get enabled(): boolean {
        return this.mEnabled;
    }

    public setViewData(viewData: IFramesSkinData) {
        const scene = this.mConfig.framesSkinData.background.transForm.scene;
        if (!this.mFrameSkin) {
            this.mFrameSkin = new FramesSkin(scene, viewData);
        } else {
            this.mFrameSkin.setSkinData(viewData);
        }
        this.mFrameSkin.on(SkinEvent.Init, this.skinInitHandler, this);
        this.mFrameSkin.preload();
    }

    public setProvider(provider: UIProvider) {

    }

    private skinInitHandler() {
        this.mFrameSkin.off(SkinEvent.Init, this.skinInitHandler, this);
        const bgTransform: Transform = this.mConfig.framesSkinData.background.transForm;
        this.getPos(bgTransform);
        this.mFrameSkin.BackGround.x = this.getPos(bgTransform).x;
        this.mFrameSkin.BackGround.y = this.getPos(bgTransform).y;
        this.mContainer.add(this.mFrameSkin.BackGround);
        if (this.mFrameSkin.Icon) {
            this.mFrameSkin.Icon.x = this.getPos(this.mConfig.framesSkinData.icon.transForm).x;
            this.mFrameSkin.Icon.y = this.getPos(this.mConfig.framesSkinData.icon.transForm).y;
            this.mContainer.add(this.mFrameSkin.Icon);
        }
    }

    private getPos(transform: Transform): Pos {
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
            pos.y = Number(tmpValue.split("%")[0]) * transform.width;
        } else {
            pos.y = GetValue(transform, "y", 0);
        }
        return pos;
    }
}
