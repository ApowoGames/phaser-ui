/*
 * 页签组件
 * @Author: gxm
 * @Date: 2020-03-11 13:33:29
 * @Last Modified by: gxm
 * @Last Modified time: 2020-04-17 11:42:55
 */

import { Tool } from "../tool/Tool";

import { Transform } from "../interface/pos/Transform";
import { IListConfig } from "../interface/list/IListConfig";
import { TabButton } from "./TabButton";
import { BaseUI } from "../baseUI/BaseUI";

const GetValue = Phaser.Utils.Objects.GetValue;
export class TabGroup extends BaseUI {
    private mSelectIndex: number;
    private mConfig: IListConfig;
    private mList: any[];
    private mWorld;
    constructor(scene: Phaser.Scene, config: IListConfig, world: any) {
        super(scene);
        this.mConfig = config;
        this.mWorld = world;
        this.scene = scene;
        const transform: Transform = !config ? undefined : config.transform;
        const posX = Tool.getPos(transform).x;
        const posY = Tool.getPos(transform).y;
        const baseWidth = !transform && !transform.width ? 0 : transform.width;
        const baseHeight = !transform && !transform.height ? 0 : transform.height;
        // tab主容器
        this.container.setPosition(posX, posY);
        this.container.setSize(baseWidth, baseHeight);
        this.mList = [];
    }

    public setInteractive() {
        this.container.setInteractive(new Phaser.Geom.Rectangle(0, 0, this.container.width, this.container.height), Phaser.Geom.Rectangle.Contains);
        super.setInteractive();
    }

    public disInteractive() {
        this.container.disableInteractive();
        super.disInteractive();
    }

    public get skin(): Phaser.GameObjects.Container {
        return this.container;
    }

    public setPos(pos: any) {
        this.container.x = pos.x;
        this.container.y = pos.y;
    }

    public setSize(width: number, height: number) {
        this.container.setSize(width, height);
        if (this.enable) {
            this.container.setInteractive(new Phaser.Geom.Rectangle(0, 0, width, height), Phaser.Geom.Rectangle.Contains);
        }
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
        if (this.container) {
            if (this.container.parentContainer)
                this.container.parentContainer.remove(this.container);
            this.container.destroy();
            this.container = null;
        }
        super.destroy();
    }

    private refreshList() {
        this.container.removeAll();
        for (let i: number = 0, len = this.mList.length; i < len; i++) {
            const tab: TabButton = new TabButton(this.scene, this.mList[i], this.mWorld);
            this.container.add(tab.skin);
        }
    }
}
