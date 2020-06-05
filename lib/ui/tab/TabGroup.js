"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TabGroup extends Phaser.Events.EventEmitter {
    constructor(scene, config, world) {
        super();
        this.mConfig = config;
        this.mList = [];
    }
    addTab(tab) {
        this.mList.push(tab);
        tab.on("selectChange", this.selectChange, this);
        return this;
    }
    addTabAll(tabList) {
        this.mList = this.mList.concat(tabList);
        for (const item of tabList) {
            item.on("selectChange", this.selectChange, this);
        }
        return this;
    }
    replace(index, tab) {
        this.mList.splice(index, 0, tab);
    }
    removeItem(item) {
        this.mList = this.mList.filter((button) => button !== item);
        item.removeAllListeners();
        return this;
    }
    destroy() {
        if (this.mList) {
            this.mList.forEach((item) => {
                this.removeItem(item);
                item.destroy();
            });
        }
        super.destroy();
    }
    reset() {
        if (this.mList) {
            this.mList.forEach((item) => {
                this.removeItem(item);
            });
        }
    }
    select(item) {
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
    selectChange(pointer, gameObject) {
        this.select(gameObject);
    }
}
exports.TabGroup = TabGroup;
