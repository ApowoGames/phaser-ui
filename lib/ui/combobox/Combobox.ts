import { IComboboxConfig } from "../interface/combobox/IComboboxConfig";
import { IAbstructItem } from "../interface/baseUI/IAbstructItem";
import { ISoundGroup } from "../interface/sound/ISoundConfig";
import { BaseUI } from "../baseUI/BaseUI";

export interface ISelectCallItemdata extends IAbstructItem {
    text: string;
    data: any;
}
export interface ISelectCallUI {
    selectCall(data: ISelectCallItemdata);
}
export class SelectCallItem extends BaseUI {
    protected soundGroup: ISoundGroup;
    protected mText: Phaser.GameObjects.Text;
    protected mSelectBG: Phaser.GameObjects.Graphics;
    protected mSelectCallUI: ISelectCallUI;
    private mSelect: boolean = false;
    private mItemData: ISelectCallItemdata;
    constructor(scene: Phaser.Scene, selectCallUI: ISelectCallUI, wid: number, hei: number, music?: ISoundGroup) {
        super(scene);
        this.mSelectCallUI = selectCallUI;
        this.soundGroup = music;
        this.mText = this.scene.make.text({
            x: -wid >> 1, y: -hei >> 1,
            style: { fill: "#F7EDED", fontSize: 18 }
        }, false);
        const COLOR = 0xffcc00;
        this.mSelectBG = scene.make.graphics(undefined, false);
        this.mSelectBG.fillStyle(COLOR, .8);
        this.mSelectBG.fillRect(-wid >> 1, -hei >> 1, wid, hei);
        this.mSelectBG.visible = false;
        this.add([this.mSelectBG, this.mText]);
        this.width = wid;
        this.height = hei;
        this.setSize(wid, hei);

        this.setInteractive();
    }

    public setInteractive(): this {
        super.setInteractive(new Phaser.Geom.Rectangle(0, 0, this.width, this.height), Phaser.Geom.Rectangle.Contains);
        return this;
    }

    public addListen() {
        this.on("pointerover", this.overHandler, this);
        this.on("pointerout", this.outHandler, this);
        this.on("pointerdown", this.selectHandler, this);
    }

    public removeListen() {
        this.off("pointerover", this.overHandler, this);
        this.off("pointerout", this.outHandler, this);
        this.off("pointerdown", this.selectHandler, this);
    }

    public set itemData(val: ISelectCallItemdata) {
        this.mItemData = val;
        this.mText.text = this.mItemData.text;
        this.mText.x = -this.width / 2 + (this.width - this.mText.width >> 1);
        this.mText.y = -this.height / 2 + (this.height - this.mText.height >> 1);
    }

    public get itemData(): ISelectCallItemdata {
        return this.mItemData;
    }

    public destroy() {
        if (!this.mInitialized) return;
        this.mText.destroy(true);
        this.mSelectBG.destroy(true);
        this.mItemData = null;
        this.mText = null;
        this.mSelectBG = null;
        this.mSelectCallUI = null;
        super.destroy();
    }

    public set selected(val: boolean) {
        this.mSelectBG.visible = val;
        this.mSelect = val;
    }
    public get selected(): boolean {
        return this.mSelect;
    }

    public get interactive(): boolean {
        return this.interactiveBoo;
    }

    protected overHandler() {
        if (!this.interactiveBoo) return;
        this.mSelectBG.visible = true;
    }

    protected selectHandler() {
        if (!this.interactiveBoo) {
            if (this.soundGroup && this.soundGroup.disabled) (this.mSelectCallUI as ComboBox).playSound(this.soundGroup.disabled);
            return;
        }
        if (this.soundGroup && this.soundGroup.down) (this.mSelectCallUI as ComboBox).playSound(this.soundGroup.down);
        this.overHandler();
        this.mSelectCallUI.selectCall(this.mItemData);
    }
    protected outHandler() {
        if (!this.interactiveBoo) return;
        this.mSelectBG.visible = false;
    }
}
/**
 * @class ComboBox
 * @memberof TooqinUI.ComboBox
 * @constructor
 * @param {Phaser.Scene} scene
 * @param {*} config (export interface IComboboxConfig {wid: number;hei: number;
    resKey: string;resPng: string;resJson: string;resBg: string;
    resArrow: string;fontStyle: { size: number, color: string, bold: boolean };
    up: boolean;clickCallBack: Function;boxMusic?: ISoundGroup;itemMusic?: ISoundGroup;
  })
 */
export class ComboBox extends BaseUI implements ISelectCallUI {
    protected itemList: SelectCallItem[];
    private soundGroup: ISoundGroup;
    private mConfig: IComboboxConfig;
    private mBg: Phaser.GameObjects.Image;
    private mIsopen: boolean = false;
    private mItemBG: Phaser.GameObjects.Graphics;
    private mtxt: Phaser.GameObjects.Text;
    private mArrow: Phaser.GameObjects.Image;
    private mInitialize: boolean = false;
    private mSelectData: ISelectCallItemdata;
    constructor(scene: Phaser.Scene, config: IComboboxConfig) {
        super(scene);
        this.mConfig = config;
        this.soundGroup = config.boxMusic;
        this.init();
    }

    public selectCall(itemData: ISelectCallItemdata) {
        this.mtxt.text = itemData.text;
        this.mtxt.x = this.mConfig.wid - this.mtxt.width >> 1;
        this.mtxt.y = this.mConfig.hei - this.mtxt.height >> 1;
        this.showTween(false);
        if (this.mConfig.clickCallBack) {
            this.mConfig.clickCallBack.call(this, itemData);
        }
    }

    public addListen() {
        super.addListen();
        this.on("uiClick", this.openHandler, this);
    }

    public removeListen() {
        super.removeListen();
        this.off("uiClick", this.openHandler, this);
    }

    public set text(value: string[]) {
        if (!this.mInitialize) {
            this.mSelectData = this.itemList[0].itemData;
            return;
        }
        if (this.itemList) {
            const itemLen: number = this.itemList.length;
            for (let i: number = 0; i < itemLen; i++) {
                let item: SelectCallItem = this.itemList[i];
                if (!item) continue;
                item.destroy();
                item = null;
            }
            this.itemList.length = 0;
        }
        this.itemList = [];
        const len: number = value.length;
        for (let i: number = 0; i < len; i++) {
            const item: SelectCallItem = new SelectCallItem(this.scene, this, this.mConfig.wid, this.mConfig.hei, this.mConfig.itemMusic);
            const str: string = value[i];
            item.itemData = {
                index: i,
                text: str,
                data: {},
                selected: false,
                enabled: true,
            };
            this.itemList.push(item);
        }
        // 默認顯示第0個
        this.selectCall(this.itemList[0].itemData);
    }

    public destroy() {
        if (this.itemList) {
            const len: number = this.itemList.length;
            for (let i: number = 0; i < len; i++) {
                const item: SelectCallItem = this.itemList[i];
                if (!item) continue;
                item.destroy();
            }
            this.itemList.length = 0;
            this.itemList = null;
        }
        super.destroy();
    }

    private init() {
        const resKey: string = this.mConfig.resKey;
        const resPng: string = this.mConfig.resPng;
        const resJson: string = this.mConfig.resJson;
        this.mInitialize = false;
        if (!this.scene.textures.exists(resKey)) {
            this.scene.load.atlas(resKey, resPng, resJson);
            this.scene.load.once(Phaser.Loader.Events.COMPLETE, this.onLoadCompleteHandler, this);
            this.scene.load.start();
        } else {
            this.onLoadCompleteHandler();
        }
    }

    private onLoadCompleteHandler() {
        const resKey: string = this.mConfig.resKey;
        this.mBg = this.scene.make.image(undefined, false);
        this.mBg.setTexture(resKey, this.mConfig.resBg);
        this.mBg.x = this.mConfig.wid / 2;
        this.mBg.y = this.mConfig.hei / 2;
        this.mBg.setSize(this.mConfig.wid, this.mConfig.hei);
        this.mArrow = this.scene.make.image(undefined, false);
        this.mArrow.setTexture(resKey, this.mConfig.resArrow);
        this.mArrow.scaleY = this.mConfig.up ? -1 : 1;
        this.mArrow.x = this.mConfig.wid - this.mArrow.width;
        this.mArrow.y = (this.mConfig.hei - this.mArrow.height >> 1) + 4;
        this.mtxt = this.scene.make.text({
            x: 0, y: 0,
            style: { fill: "#F7EDED", fontSize: 18 }
        }, false);

        this.add([this.mBg, this.mArrow, this.mtxt]);
        this.mInitialize = true;
        if (this.mSelectData) {
            this.selectCall(this.mSelectData);
        }
    }

    private openHandler() {
        if (!this.interactiveBoo) {
            if (this.soundGroup && this.soundGroup.disabled) this.playSound(this.soundGroup.disabled);
            return;
        }
        if (this.soundGroup && this.soundGroup.expand) this.playSound(this.soundGroup.expand);
        if (!this.itemList || this.itemList.length < 1) return;
        this.showTween(this.mIsopen);
    }
    private showTween(open: boolean) {
        if (open) {
            this.mItemBG = this.createTexture();
            this.addAt(this.mItemBG, 0);
        } else {
            if (this.mItemBG) {
                if (this.mItemBG.parentContainer) {
                    this.mItemBG.parentContainer.remove(this.mItemBG);
                }
                this.mItemBG.destroy();
            }
        }
        this.mArrow.scaleY = open ? 1 : -1;
        this.showTweenItem(open);
        this.mIsopen = !this.mIsopen;
    }
    private showTweenItem(open: boolean) {
        const len: number = this.itemList.length;
        for (let i: number = 0; i < len; i++) {
            const item: SelectCallItem = this.itemList[i];
            if (!item) {
                continue;
            }
            item.x = this.mConfig.wid >> 1;
            this.add(item);
            this.scene.tweens.add({
                targets: item,
                duration: 50 * i,
                props: {
                    y: { value: open ? -this.mConfig.hei * i - this.mConfig.hei / 2 : -this.mConfig.hei >> 1 },
                    alpha: { value: open ? 1 : 0 }
                },
                onComplete: (tween, targets, element) => {
                    if (!open) {
                        this.remove(item);
                    }
                },
                onCompleteParams: [this],
            });
        }
    }

    private createTexture(): Phaser.GameObjects.Graphics {
        const COLOR = 0x3D3838;
        const height = this.mConfig.hei * this.itemList.length;
        const bgGraphics: Phaser.GameObjects.Graphics = this.scene.make.graphics(undefined, false);
        bgGraphics.fillStyle(COLOR, .8);
        bgGraphics.fillRect(0, -height, this.mConfig.wid, height);
        return bgGraphics;
    }
}
