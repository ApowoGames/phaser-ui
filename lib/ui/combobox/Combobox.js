"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseUI_1 = require("../baseUI/BaseUI");

/**
 * @namespace Tooqingui.ISelectCallItemdata
 * @extends Tooqingui.IAbstractItem
 */
var ISelectCallItemdata = {
    /**
     * @name Tooqingui.ISelectCallItemdata#text
     * @type {string}
     */
    text,
    /**
     * @name Tooqingui.ISelectCallItemdata#data
     * @type {*}
     */
    data,
};
/**
 * @namespace Tooqingui.ISelectCallUI
 */
var ISelectCallUI = {
    /**
     * @method Tooqingui.ISelectCallUI#selectCall
     * @param {*} data 
     */
    selectCall: function (data) {
    },
};
module.exports = Tooqingui.ISelectCallUI;
/**
 * @class SelectCallItem
 * @memberof Tooqingui
 * @constructor
 * @param {Phaser.Scene} scene
 * @param {*} selectCallUI {selectCall(data:ISelectCallItemdata)} {IselectCallItemdata(text:string,data:any,index:number)}
 * @param {number} wid
 * @param {number} hei
 * @param {*} music
 */
class SelectCallItem extends BaseUI_1.BaseUI {
    constructor(scene, selectCallUI, wid, hei, music) {
        super(scene);
        this.mSelect = false;
        /**
         * @name Tooqingui.SelectCallItem#mSelectCallUI
         * @type {*}
         * @protected
         */
        this.mSelectCallUI = selectCallUI;
        /**
         * @name Tooqingui.SelectCallItem#soundGroup
         * @type {*}
         * @protected
         */
        this.soundGroup = music;
        /**
         * @name Tooqingui.SelectCallItem#text
         * @type {Phaser.GameObjects.Text}
         * @protected
         */
        this.mText = this.scene.make.text({
            x: -wid >> 1, y: -hei >> 1,
            style: { fill: "#F7EDED", fontSize: 18 }
        }, false);
        const COLOR = 0xffcc00;
        /**
         * @name Tooqingui.SelectCallItem#mSelectBG
         * @type {Phaser.GameObjects.Graphics}
         * @protected
         */
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
    setInteractive() {
        super.setInteractive(new Phaser.Geom.Rectangle(0, 0, this.width, this.height), Phaser.Geom.Rectangle.Contains);
        return this;
    }
    /**
     * @method Tooqingui.SelectCallItem#addListen
     */
    addListen() {
        this.on("pointerover", this.overHandler, this);
        this.on("pointerout", this.outHandler, this);
        this.on("pointerdown", this.selectHandler, this);
    }
    /**
     * @method Tooqingui.SelectCallItem#removeListen
     */
    removeListen() {
        this.off("pointerover", this.overHandler, this);
        this.off("pointerout", this.outHandler, this);
        this.off("pointerdown", this.selectHandler, this);
    }
    set itemData(val) {
        this.mItemData = val;
        this.mText.text = this.mItemData.text;
        this.mText.x = -this.width / 2 + (this.width - this.mText.width >> 1);
        this.mText.y = -this.height / 2 + (this.height - this.mText.height >> 1);
    }
    /**
     * @name Tooqingui.SelectCallItem#itemData
     * @type {*}
     * @return {*}
     */
    get itemData() {
        return this.mItemData;
    }
    /**
     * @name Tooqingui.SelectCallItem#destroy
     */
    destroy() {
        if (!this.mInitialized)
            return;
        this.mText.destroy(true);
        this.mSelectBG.destroy(true);
        this.mItemData = null;
        this.mText = null;
        this.mSelectBG = null;
        this.mSelectCallUI = null;
        super.destroy();
    }
    set selected(val) {
        this.mSelectBG.visible = val;
        this.mSelect = val;
    }
    /**
     * @name Tooqingui.SelectCallItem#selected
     * @type {boolean}
     * @return {boolean}
     */
    get selected() {
        return this.mSelect;
    }
    /**
     * @name Tooqingui.SelectCallItem#setInteractive
     * @type {boolean}
     * @return {boolean}
     */
    get interactive() {
        return this.interactiveBoo;
    }
    /**
     * @method Tooqingui.SelectCallItem#overHandler
     */
    overHandler() {
        if (!this.interactiveBoo)
            return;
        this.mSelectBG.visible = true;
    }
    /**
     * @method Tooqingui.SelectCallItem#selectHandler
     */
    selectHandler() {
        if (!this.interactiveBoo) {
            if (this.soundGroup && this.soundGroup.disabled)
                this.mSelectCallUI.playSound(this.soundGroup.disabled);
            return;
        }
        if (this.soundGroup && this.soundGroup.down)
            this.mSelectCallUI.playSound(this.soundGroup.down);
        this.overHandler();
        this.mSelectCallUI.selectCall(this.mItemData);
    }
    /**
     * @method Tooqingui.SelectCallItem#outHandler
     */
    outHandler() {
        if (!this.interactiveBoo)
            return;
        this.mSelectBG.visible = false;
    }
}
exports.SelectCallItem = SelectCallItem;
/**
 * @class ComboBox
 * @memberof Tooqingui
 * @constructor
 * @extends Tooqingui.BaseUI
 * @param {Phaser.Scene} scene
 * @param {*} config
 */
class ComboBox extends BaseUI_1.BaseUI {
    constructor(scene, config) {
        super(scene);
        this.mIsopen = false;
        this.mInitialize = false;
        /**
         * @name Tooqingui.ComboBox#itemList
         * @type {any[]}
         */
        this.itemList = [];
        this.mConfig = config;
        this.soundGroup = config.boxMusic;
        this.init();
    }
    /**
     * @method Tooqingui.ComboBox#selectCall
     * @param {*} itemData 
     */
    selectCall(itemData) {
        this.mtxt.text = itemData.text;
        this.mtxt.x = this.mConfig.wid - this.mtxt.width >> 1;
        this.mtxt.y = this.mConfig.hei - this.mtxt.height >> 1;
        this.showTween(false);
        if (this.mConfig.clickCallBack) {
            this.mConfig.clickCallBack.call(this, itemData);
        }
    }
    /**
     * @method Tooqingui.ComboBox#addListen
     */
    addListen() {
        super.addListen();
        this.on("uiClick", this.openHandler, this);
    }
    /**
     * @method Tooqingui.ComboBox#removeListen
     */
    removeListen() {
        super.removeListen();
        this.off("uiClick", this.openHandler, this);
    }
    /**
     * @name Tooqingui.ComboBox#text
     * @type {string[]}
     */
    set text(value) {
        if (!this.mInitialize) {
            this.mSelectData = this.itemList[0].itemData;
            return;
        }
        if (this.itemList) {
            const itemLen = this.itemList.length;
            for (let i = 0; i < itemLen; i++) {
                let item = this.itemList[i];
                if (!item)
                    continue;
                item.destroy();
                item = null;
            }
            this.itemList.length = 0;
        }
        this.itemList = [];
        const len = value.length;
        for (let i = 0; i < len; i++) {
            const item = new SelectCallItem(this.scene, this, this.mConfig.wid, this.mConfig.hei, this.mConfig.itemMusic);
            const str = value[i];
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
    /**
     * @method Tooqingui.ComboBox#destroy
     */
    destroy() {
        if (this.itemList) {
            const len = this.itemList.length;
            for (let i = 0; i < len; i++) {
                const item = this.itemList[i];
                if (!item)
                    continue;
                item.destroy();
            }
            this.itemList.length = 0;
            this.itemList = null;
        }
        super.destroy();
    }
    /**
     * @method Tooqingui.ComboBox#init
     */
    init() {
        const resKey = this.mConfig.resKey;
        const resPng = this.mConfig.resPng;
        const resJson = this.mConfig.resJson;
        this.mInitialize = false;
        if (!this.scene.textures.exists(resKey)) {
            this.scene.load.atlas(resKey, resPng, resJson);
            this.scene.load.once(Phaser.Loader.Events.COMPLETE, this.onLoadCompleteHandler, this);
            this.scene.load.start();
        }
        else {
            this.onLoadCompleteHandler();
        }
    }
    /**
     * @method Tooqingui.ComboBox#onLoadCompleteHandler
     */
    onLoadCompleteHandler() {
        const resKey = this.mConfig.resKey;
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
    /**
     * @method Tooqingui.ComboBox#openHandler
     */
    openHandler() {
        if (!this.interactiveBoo) {
            if (this.soundGroup && this.soundGroup.disabled)
                this.playSound(this.soundGroup.disabled);
            return;
        }
        if (this.soundGroup && this.soundGroup.expand)
            this.playSound(this.soundGroup.expand);
        if (!this.itemList || this.itemList.length < 1)
            return;
        this.showTween(this.mIsopen);
    }
    /**
     * @method Tooqingui.ComboBox#showTween
     * @param {boolean} open 
     */
    showTween(open) {
        if (open) {
            this.mItemBG = this.createTexture();
            this.addAt(this.mItemBG, 0);
        }
        else {
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
    /**
     * @method Tooqingui.ComboBox#showTweenItem
     * @param {boolean} open 
     */
    showTweenItem(open) {
        const len = this.itemList.length;
        for (let i = 0; i < len; i++) {
            const item = this.itemList[i];
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
    /**
     * @method Tooqingui.ComboBox#createTexture
     * @return {Phaser.GameObjects.Graphics}
     */
    createTexture() {
        const COLOR = 0x3D3838;
        const height = this.mConfig.hei * this.itemList.length;
        const bgGraphics = this.scene.make.graphics(undefined, false);
        bgGraphics.fillStyle(COLOR, .8);
        bgGraphics.fillRect(0, -height, this.mConfig.wid, height);
        return bgGraphics;
    }
}
exports.ComboBox = ComboBox;
