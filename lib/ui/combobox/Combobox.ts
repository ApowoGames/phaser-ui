import { IComboboxConfig } from "../interface/combobox/IComboboxConfig";
import { AbstractItem } from "../interface/baseUI/AbstructItem";
import { ISoundConfig } from "../interface/sound/ISoundConfig";
import { BaseUI } from "../baseUI/BaseUI";

export interface ISelectCallItedata extends AbstractItem {
    text: string;
    data: any;
}
export interface ISelectCallUI {
    selectCall(data: ISelectCallItedata);
}
export class SelectCallItem extends BaseUI {
    protected configList: ISoundConfig[];
    protected mText: Phaser.GameObjects.Text;
    protected mSelectBG: Phaser.GameObjects.Graphics;
    protected mSelectCallUI: ISelectCallUI;
    private mSelect: boolean = false;
    constructor(scene: Phaser.Scene, selectCallUI: ISelectCallUI, wid: number, hei: number, music?: ISoundConfig[]) {
        super(scene);
        this.mSelectCallUI = selectCallUI;
        this.configList = music;
        this.mText = this.scene.make.text({
            x: -wid >> 1, y: -hei >> 1,
            style: { fill: "#F7EDED", fontSize: 18 }
        }, false);
        const COLOR = 0xffcc00;
        this.mSelectBG = scene.make.graphics(undefined, false);
        this.mSelectBG.fillStyle(COLOR, .8);
        this.mSelectBG.fillRect(-wid >> 1, -hei >> 1, wid, hei);
        this.mSelectBG.visible = false;
        this.container.add([this.mSelectBG, this.mText]);
        this.width = wid;
        this.height = hei;
        this.container.setSize(wid, hei);

        this.setInteractive();
    }

    public setInteractive() {
        this.container.setInteractive(new Phaser.Geom.Rectangle(0, 0, this.width, this.height), Phaser.Geom.Rectangle.Contains);
        super.setInteractive();
    }

    public disInteractive() {
        this.container.disableInteractive();
        super.setInteractive();
    }


    public addListen() {
        this.container.on("pointerover", this.overHandler, this);
        this.container.on("pointerout", this.outHandler, this);
        this.container.on("pointerdown", this.selectHandler, this);
    }

    public removeListen() {
        this.container.off("pointerover", this.overHandler, this);
        this.container.off("pointerout", this.outHandler, this);
        this.container.off("pointerdown", this.selectHandler, this);
    }

    public set itedata(val: ISelectCallItedata) {
        this.data = val;
        this.mText.text = this.data.text;
        this.mText.x = -this.width / 2 + (this.width - this.mText.width >> 1);
        this.mText.y = -this.height / 2 + (this.height - this.mText.height >> 1);
    }

    public get itedata(): ISelectCallItedata {
        return this.data;
    }

    public destroy() {
        this.mText.destroy(true);
        this.mSelectBG.destroy(true);
        this.data = null;
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
        return this.enable;
    }

    protected overHandler() {
        if (!this.enable) return;
        this.mSelectBG.visible = true;
    }

    protected selectHandler() {
        if (!this.enable) {
            if (this.configList && this.configList[1]) (this.mSelectCallUI as ComboBox).playSound(this.configList[1]);
            return;
        }
        if (this.configList && this.configList[0]) (this.mSelectCallUI as ComboBox).playSound(this.configList[0]);
        this.overHandler();
        this.mSelectCallUI.selectCall(this.itedata);
    }
    protected outHandler() {
        if (!this.enable) return;
        this.mSelectBG.visible = false;
    }
}
export class ComboBox extends BaseUI implements ISelectCallUI {
    protected itemList: SelectCallItem[];
    private mConfig: IComboboxConfig;
    private mBg: Phaser.GameObjects.Image;
    private mIsopen: boolean = false;
    private mItemBG: Phaser.GameObjects.Graphics;
    private mtxt: Phaser.GameObjects.Text;
    private mArrow: Phaser.GameObjects.Image;
    private mInitialize: boolean = false;
    constructor(scene: Phaser.Scene, config: IComboboxConfig) {
        super(scene);
        this.mConfig = config;
        this.init();
    }

    public selectCall(itedata: ISelectCallItedata) {
        this.mtxt.text = itedata.text;
        this.mtxt.x = this.mConfig.wid - this.mtxt.width >> 1;
        this.mtxt.y = this.mConfig.hei - this.mtxt.height >> 1;
        this.showTween(false);
        if (this.mConfig.clickCallBack) {
            this.mConfig.clickCallBack.call(this, itedata);
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
            this.data = this.itemList[0].itedata;
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
            item.itedata = {
                index: i,
                text: str,
                data: {},
                selected: false,
                enabled: true,
            };
            this.itemList.push(item);
        }
        // 默認顯示第0個
        this.selectCall(this.itemList[0].itedata);
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

        this.container.add([this.mBg, this.mArrow, this.mtxt]);
        this.mInitialize = true;
        if (this.data) {
            this.selectCall(this.data);
        }
    }

    private openHandler() {
        if (!this.enable) {
            if (this.mConfig.boxMusic && this.mConfig.boxMusic[1]) this.playSound(this.mConfig.boxMusic[1]);
            return;
        }
        if (this.mConfig.boxMusic && this.mConfig.boxMusic[0]) this.playSound(this.mConfig.boxMusic[0]);
        if (!this.itemList || this.itemList.length < 1) return;
        this.showTween(this.mIsopen);
    }
    private showTween(open: boolean) {
        if (open) {
            this.mItemBG = this.createTexture();
            this.container.addAt(this.mItemBG, 0);
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
            item.view.x = this.mConfig.wid >> 1;
            this.container.add(item.view);
            this.scene.tweens.add({
                targets: item,
                duration: 50 * i,
                props: {
                    y: { value: open ? -this.mConfig.hei * i - this.mConfig.hei / 2 : -this.mConfig.hei >> 1 },
                    alpha: { value: open ? 1 : 0 }
                },
                onComplete: (tween, targets, element) => {
                    if (!open) {
                        this.container.remove(item.view);
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
