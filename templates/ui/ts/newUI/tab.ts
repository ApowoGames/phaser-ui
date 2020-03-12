/*
 * 页签组件
 * @Author: gxm
 * @Date: 2020-03-11 13:33:29
 * @Last Modified by: gxm
 * @Last Modified time: 2020-03-12 18:01:48
 */

import { Button, ButtonConfig } from "./button";
import { Tool } from "../tool/tool";
import { Event } from "../interface/eventType";
import { ButtonState } from "../../../../button";
import { Transform } from "../interface/transform";
import { IListConfig } from "../interface/iListConfig";
export interface ITabsGroupConfig extends IListConfig {
}
const GetValue = Phaser.Utils.Objects.GetValue;
export class TabGroup {
    private mSelectIndex: number;
    private mConfig: ITabsGroupConfig;
    private mContainer: Phaser.GameObjects.Container;
    private mList: any[];
    private mWorld;
    private mScene: Phaser.Scene;
    constructor(scene: Phaser.Scene, config: ITabsGroupConfig, world: any) {
        this.mConfig = config;
        this.mWorld = world;
        this.mScene = scene;
        const transform: Transform = !config ? undefined : config.transform;
        const posX = Tool.getPos(transform).x;
        const posY = Tool.getPos(transform).y;
        const baseWidth = !transform && !transform.width ? 0 : transform.width;
        const baseHeight = !transform && !transform.height ? 0 : transform.height;
        // tab主容器
        this.mContainer = scene.make.container({ x: posX, y: posY, width: baseWidth, height: baseHeight }, false);
        this.mContainer.setInteractive(new Phaser.Geom.Rectangle(0, 0, baseWidth, baseHeight), Phaser.Geom.Rectangle.Contains);
        this.mList = [];
    }

    public get skin(): Phaser.GameObjects.Container {
        return this.mContainer;
    }

    public setPos(pos: any) {
        this.mContainer.x = pos.x;
        this.mContainer.y = pos.y;
    }

    public setSize(width: number, height: number) {
        this.mContainer.setSize(width, height);
        this.mContainer.setInteractive(new Phaser.Geom.Rectangle(0, 0, width, height), Phaser.Geom.Rectangle.Contains);
    }

    public set selectIndex(select: number) {
        this.mSelectIndex = select;
    }
    public get selectIndex(): number {
        return this.mSelectIndex;
    }

    public addTab(tab: any) {
        this.mList.push(tab);
        this.refreshList();
    }
    public replace(index: number, tab: any) {
        this.mList.splice(index, 0, tab);
        this.refreshList();
    }

    public destroy() {
        if (this.mList) {
            this.mList.length = 0;
            this.mList = null;
        }
        if (this.mContainer) {
            if (this.mContainer.parentContainer)
                this.mContainer.parentContainer.remove(this.mContainer);
            this.mContainer.destroy();
            this.mContainer = null;
        }
    }

    private refreshList() {
        this.mContainer.removeAll();
        for (let i: number = 0, len = this.mList.length; i < len; i++) {
            const tab: TabButton = new TabButton(this.mScene, this.mList[i], this.mWorld);
            this.mContainer.add(tab.skin);
        }
    }
}

export class TabButton extends Button {
    constructor(scene: Phaser.Scene, config: ButtonConfig, world: any) {
        super(scene, config, world);
    }
    public set selected(value: boolean) {
        this.mSelected = value;
        const buttonState = value ? ButtonState.Select : ButtonState.Normal;
        this.buttonStateChange(buttonState);
    }

    protected onPointerDownHandler(pointer) {
        if (!this.mEnabled) return;
        this.mDownTime = Date.now();
        this.mPressDelay = setTimeout(() => {
            this.emit(Event.Hold, this);
        }, this.mPressTime);
        this.emit(Event.Down);
    }

    protected onPointerUpHandler(pointer) {
        if (!this.mEnabled) return;
        this.buttonStateChange(ButtonState.Select);
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
}
