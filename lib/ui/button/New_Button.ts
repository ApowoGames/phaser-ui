/*
 * 按钮组件
 * @Author: gxm
 * @Date: 2020-03-10 10:51:48
 * @Last Modified by: gxm
 * @Last Modified time: 2020-04-24 11:19:51
 */

import { FramesSkin } from "../interface/button/FrameSkin";
import { Tool } from "../tool/Tool";
import { MouseEvent } from "../interface/event/MouseEvent";
import { TextConfig } from "../interface/text/TextConfig";
import { Transform } from "../interface/pos/Transform";
import { ResourceData } from "../interface/baseUI/ResourceData";
import { ISoundConfig, ISoundGroup } from "../interface/sound/ISoundConfig";
import { BaseUI } from "../baseUI/BaseUI";

export enum ButtonState {
    Normal = "normal",
    Over = "over",
    Select = "select",
    Disable = "disable",
}
export interface ButtonConfig {
    bgFrames?: ResourceData;
    iconFrames?: ResourceData;
    transform?: Transform;
    textconfig?: TextConfig;
    text?: string;
    /**
     * 默认 0位是点击音效，1位是不可点击音效，2，3根据具体ui实现
     */
    music?: ISoundGroup;
}
const GetValue = Phaser.Utils.Objects.GetValue;
export class New_Button extends BaseUI {
    protected soundGroup: ISoundGroup;
    protected mBgFramesSkin: FramesSkin;
    protected mIconFramesSkin: FramesSkin;
    protected mText: Phaser.GameObjects.Text;
    protected mConfig: ButtonConfig;
    protected mPressTime: number = 2000;
    protected mPressDelay: any;
    protected mDownTime: number = 0;
    protected mIsMove: boolean = false;
    protected mSelected: boolean = false;
    public constructor(scene: Phaser.Scene, world: any, btnConfig: ButtonConfig) {
        super(scene, world.dpr, world.uiScaleNew);
        this.soundMap = new Map();
        this.mConfig = btnConfig;
        this.soundGroup = btnConfig.music;
        const transform: Transform = !btnConfig ? undefined : btnConfig.transform;
        const pos: any = Tool.getPos(transform);
        const posX = pos.x;
        const posY = pos.y;
        this.width = !transform && !transform.width ? 0 : transform.width;
        this.height = !transform && !transform.height ? 0 : transform.height;
        const bgFrames: ResourceData = !btnConfig ? undefined : btnConfig.bgFrames;
        const iconFrames: ResourceData = !btnConfig ? undefined : btnConfig.iconFrames;
        // 按钮容器
        this.container.setPosition(posX, posY);
        this.container.setSize(this.width, this.height);
        // 按钮背景
        this.mBgFramesSkin = new FramesSkin(scene, bgFrames);
        const bgTransform: Transform = bgFrames.transForm;
        this.mBgFramesSkin.x = Tool.getPos(bgTransform).x;
        this.mBgFramesSkin.y = Tool.getPos(bgTransform).y;
        if (this.mBgFramesSkin.skin) this.container.add(this.mBgFramesSkin.skin);
        // 按钮icon
        this.mIconFramesSkin = new FramesSkin(scene, iconFrames);
        const iconTransform: Transform = iconFrames.transForm;
        this.mIconFramesSkin.x = Tool.getPos(iconTransform).x;
        this.mIconFramesSkin.y = Tool.getPos(iconTransform).y;
        if (this.mIconFramesSkin.skin) this.container.add(this.mIconFramesSkin.skin);
        // 按钮文本
        const textconfig = {};
        this.mText = scene.make.text({
            style: Object.assign(textconfig, btnConfig.textconfig)
        }, false);
    }

    public set selected(value: boolean) {
        this.mSelected = value;
    }
    public get selected(): boolean {
        return this.mSelected;
    }

    public get interactive(): boolean {
        return this.interactiveBoo;
    }

    public setInteractive() {
        super.setInteractive();
        this.buttonStateChange(ButtonState.Normal);
        this.container.setInteractive(new Phaser.Geom.Rectangle(0, 0, this.width, this.height), Phaser.Geom.Rectangle.Contains);
    }

    public disInteractive() {
        super.disInteractive();
        this.buttonStateChange(ButtonState.Disable);
        this.container.disableInteractive();
    }

    public setSize(width: number, height: number) {
        this.container.setSize(width, height);
        this.container.setInteractive(new Phaser.Geom.Rectangle(0, 0, width, height), Phaser.Geom.Rectangle.Contains);
    }

    public setBgTexture(resData: ResourceData) {
        this.mBgFramesSkin.setSkinData(resData);
        if (!this.mBgFramesSkin.skin.parentContainer) this.container.add(this.mBgFramesSkin.skin);
    }

    public setIconTexture(resData: ResourceData) {
        this.mIconFramesSkin.setSkinData(resData);
        if (!this.mIconFramesSkin.skin.parentContainer) this.container.add(this.mIconFramesSkin.skin);
    }

    public setText(val: string) {
        if (this.mText) {
            this.mText.text = val;
            if (!this.mText.parentContainer) this.container.add(this.mText);
        }
    }

    public get skin(): Phaser.GameObjects.Container {
        return this.container;
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

    public destroy() {

        if (this.mBgFramesSkin) {
            this.mBgFramesSkin.destroy();
            this.mBgFramesSkin = null;
        }
        if (this.mIconFramesSkin) {
            this.mIconFramesSkin.destroy();
            this.mIconFramesSkin = null;
        }
        if (this.container) {
            this.container.destroy();
        }
        if (this.mPressDelay) {
            clearTimeout(this.mPressDelay);
        }
        this.mDownTime = 0;
        this.silent = false;
        this.mIsMove = false;
        super.destroy();
    }

    protected onPointerUpHandler(pointer) {
        if (!this.interactiveBoo) {
            if (this.soundGroup && this.soundGroup.disabled) this.playSound(this.soundGroup.disabled);
            return;
        }
        this.buttonStateChange(ButtonState.Normal);
        if (!this.mIsMove || (Date.now() - this.mDownTime > this.mPressTime)) {
            // events.push(MouseEvent.Tap);
            if (this.soundGroup && this.soundGroup.up) this.playSound(this.soundGroup.up);
            this.emit(MouseEvent.Tap, pointer, this);
        }

        clearTimeout(this.mPressDelay);
        this.mIsMove = false;
        this.mDownTime = 0;
    }

    protected onPointerDownHandler(pointer) {
        if (!this.interactiveBoo) {
            if (this.soundGroup && this.soundGroup.disabled) this.playSound(this.soundGroup.disabled);
            return;
        }
        if (this.soundGroup && this.soundGroup.down) this.playSound(this.soundGroup.down);
        this.buttonStateChange(ButtonState.Select);
        this.mDownTime = Date.now();
        this.mPressDelay = setTimeout(() => {
            this.emit(MouseEvent.Hold, this);
        }, this.mPressTime);
        this.emit(MouseEvent.Down, this);
    }

    protected onPointerMoveHandler(pointer) {
        if (this.soundGroup && this.soundGroup.move) this.playSound(this.soundGroup.move);
        if (!this.interactiveBoo) return;
        this.mIsMove = true;
        this.emit(MouseEvent.Move);
    }

    protected buttonStateChange(state: ButtonState) {
        if (this.mConfig.bgFrames) {
            const frameName: string = this.mConfig.bgFrames.frameObj[state];
            if (this.mBgFramesSkin) {
                this.mBgFramesSkin.changeFrame(frameName);
            }
        }
        if (this.mConfig.iconFrames) {
            const frameName: string = this.mConfig.iconFrames.frameObj[state];
            if (this.mIconFramesSkin) {
                this.mIconFramesSkin.changeFrame(frameName);
            }
        }
    }
}