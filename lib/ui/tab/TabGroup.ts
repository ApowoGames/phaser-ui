/*
 * 页签组件
 * @Author: gxm
 * @Date: 2020-03-11 13:33:29
 * @Last Modified by: gxm
 * @Last Modified time: 2020-06-15 19:48:43
 */
import { IListConfig } from "../interface/list/IListConfig";
import { TabButton } from "./TabButton";
export class TabGroup extends Phaser.Events.EventEmitter {
    private mPrevTab: TabButton;
    private mConfig: IListConfig;
    private mList: any[];
    constructor(scene: Phaser.Scene, config: IListConfig, world: any) {
        super();
        this.mConfig = config;
        this.mList = [];
    }

    public addTab(tab: TabButton): this {
        this.mList.push(tab);
        tab.on("selectChange", this.selectChange, this);
        return this;
    }
    public addTabAll(tabList: TabButton[]): this {
        this.mList = this.mList.concat(tabList);
        for (const item of tabList) {
            item.on("selectChange", this.selectChange, this);
        }
        return this;
    }
    public replace(index: number, tab: TabButton) {
        this.mList.splice(index, 0, tab);
    }

    public removeItem(item: TabButton): this {
        this.mList = this.mList.filter((button) => button !== item);
        item.removeAllListeners();
        return this;
    }

    public destroy() {
        if (this.mList) {
            this.mList.forEach((item) => {
                this.removeItem(item);
                item.destroy();
            });
        }
        super.destroy();
    }

    public reset() {
        if (this.mList) {
            this.mList.forEach((item) => {
                this.removeItem(item);
            });
        }
    }

    public select(item: TabButton) {
        if (this.mPrevTab === item) {
            return;
        }
        if (this.mPrevTab) {
            this.mPrevTab.selected = false;
        }
        item.selected = true;
        this.emit("selected", item, this.mPrevTab);
        this.mPrevTab = item;
    }

    private selectChange(pointer: Phaser.Input.Pointer, gameObject: TabButton) {
        this.select(gameObject);
    }
}
