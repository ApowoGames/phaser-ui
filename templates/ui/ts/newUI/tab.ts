/*
 * 页签组件
 * @Author: gxm
 * @Date: 2020-03-11 13:33:29
 * @Last Modified by: gxm
 * @Last Modified time: 2020-03-12 00:57:39
 */

import { Button, ButtonConfig } from "./button";
import { IListConfig, Transform } from "../interface/AbstractUI";
import { Pos } from "../tool/pos";
import { Event } from "../interface/eventType";
import { ButtonState } from "../../../../button";
export interface ITabsGroupConfig extends IListConfig {
}
const GetValue = Phaser.Utils.Objects.GetValue;
export class TabGroup {
    private mSelectIndex: number;
    private mConfig: ITabsGroupConfig;
    private mContainer: Phaser.GameObjects.Container;
    private mList: any[];
    private mWorld;
    constructor(config: ITabsGroupConfig, world: any) {
        this.mConfig = config;
        this.mWorld = world;
        const transform: Transform = config.transform;
        const posX = this.getPos(transform).x;
        const posY = this.getPos(transform).y;
        const scene = transform.scene;
        const baseWidth = transform.width;
        const baseHeight = transform.height;
        const dpr = world.dpr;
        // tab主容器
        this.mContainer = scene.make.container({ x: posX, y: posY, width: baseWidth * dpr, height: baseHeight * dpr }, false);
        this.mContainer.setInteractive(new Phaser.Geom.Rectangle(0, 0, baseWidth * dpr, baseHeight * dpr), Phaser.Geom.Rectangle.Contains);

        this.mList = [];

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
            const tab: TabButton = new TabButton(this.mList[i], this.mWorld);
            this.mContainer.add(tab.skin);
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

export class TabButton extends Button {
    constructor(config: ButtonConfig, world: any) {
        super(config, world);
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
