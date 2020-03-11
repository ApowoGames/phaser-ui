/*
 * 页签组件
 * @Author: gxm
 * @Date: 2020-03-11 13:33:29
 * @Last Modified by: gxm
 * @Last Modified time: 2020-03-11 19:18:49
 */

import { Button, ButtonConfig } from "./button";
import { IListConfig, Transform } from "../interface/AbstractUI";
import { Pos } from "../tool/pos";
export interface ITabsGroupConfig extends IListConfig {
    tabTransform: Transform;
    displayTransform: Transform;
}
const GetValue = Phaser.Utils.Objects.GetValue;
export class TabGroup {
    /**
     * tabButton的位置信息
     */
    private mTabsTransform: Transform;
    /**
     * tabButton对应显示容器的位置信息
     */
    private mDisplayTransform: Transform;
    private mSelectIndex: number;
    private mConfig: ITabsGroupConfig;
    constructor(config: ITabsGroupConfig) {
        this.mConfig = config;
        const transform: Transform = config.transform;
        const posX = this.getPos(transform).x;
        const posY = this.getPos(transform).y;
    }

    public set tabsTransform(tranform: Transform) {
        this.mTabsTransform = tranform;
    }
    public get tabsTransform(): Transform {
        return this.mTabsTransform;
    }

    public set displayTransform(tranform: Transform) {
        this.mDisplayTransform = tranform;
    }
    public get displayTransform(): Transform {
        return this.mDisplayTransform;
    }

    public set selectIndex(select: number) {
        this.mSelectIndex = select;
    }
    public get selectIndex(): number {
        return this.mSelectIndex;
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
}
