"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Scroller_js_1 = require("../../plugins/input/scroller/Scroller.js");
const BaseUI_1 = require("../baseUI/BaseUI");
/**
 * @enum {string}
 * @memberof Tooqingui
 * @readonly
 * @property {string} downinBound "downinBound"
 * @property {string} downoutBound "downoutBound"
 * @property {string} upinBound "upinBound"
 * @property {string} upoutBound "upoutBound"
 */
var ScrollerEvent = {
    "downinBound": 1,
    "downoutBound": 2,
    "upinBound": 3,
    "upoutBound": 4
};
const GetValue = Phaser.Utils.Objects.GetValue;
/**
 * @class GameScroller
 * @memberof Tooqingui
 * @constructor
 * @extends Tooqingui.BaseUI
 * @param {Phaser.Scene} scene
 * @param {*} config
 * @param {Phaser.GameObjects.Container} [gameObject]
 */
class GameScroller extends BaseUI_1.BaseUI {
    constructor(scene, config, gameObject) {
        super(scene);
        this.mMoveing = false;
        this.soundMap = new Map();
        this.mConfig = config;
        /**
         * @name Tooqingui.GameScroller#soundGroup
         * @type {Tooqingui.ISoundGroup}
         * @protected
         */
        this.soundGroup = config.music;
        this.x = config.x;
        this.y = config.y;
        this.width = this.mConfig.width;
        this.height = this.mConfig.height;
        const zoom = config.zoom;
        this.maskGraphic = scene.make.graphics(undefined, false);
        this.maskGraphic.fillStyle(0);
        this.maskGraphic.fillRect(-this.width * 0.5 * zoom, -this.height * 0.5 * zoom, this.width * zoom, this.height * zoom);
        const worldpos = this.getWorldTransformMatrix();
        this.maskGraphic.setPosition(worldpos.tx, worldpos.ty);
        // this.add(this.maskGraphic);
        if (gameObject) {
            this.mGameObject = gameObject;
        }
        else {
            this.mGameObject = scene.make.container(undefined, false);
            this.add(this.mGameObject);
        }
        this.mGameObject.setMask(this.maskGraphic.createGeometryMask());
        // const bg1 = scene.make.graphics(undefined, false);
        // bg1.fillStyle(0, .2);
        // bg1.fillRect(0, 0, config.width, config.height);
        // bg1.setPosition(-config.width / 2, -config.height / 2);
        // this.add(bg1);
        if (!config.valuechangeCallback)
            config.valuechangeCallback = (value) => {
                this.onScrollValueChange(value);
            };
        this.mScroller = new Scroller_js_1.default(this, config);
        this.mDisDelection = GetValue(config, "interactivedisDetection", 10);
        this.mCellDownHandler = GetValue(config, "celldownCallBack", undefined);
        this.mCellUpHandler = GetValue(config, "cellupCallBack", undefined);
        this.setInteractive();
        this.addListen();
    }
    /**
     * @name Tooqingui.GameScroller#view
     * @return {Phaser.GameObjects.Container}
     */
    get view() {
        return this.mGameObject;
    }
    /**
     * @method Tooqingui.GameScroller#setEnable
     * @param {boolean} enable 
     */
    setEnable(enable) {
        if (this.mScroller)
            this.mScroller.setEnable(enable);
    }
    /**
     * @method Tooqingui.GameScroller#setValue
     * @param {number} value 
     */
    setValue(value) {
        if (this.mScroller)
            this.mScroller.setValue(value);
    }
    /**
     * @method Tooqingui.GameScroller#adjustBackDeceleration
     * @param {number} deceler 
     */
    adjustBackDeceleration(deceler) {
        if (this.mScroller)
            this.mScroller.setBackDeceleration(deceler);
    }
    /**
     * @method Tooqingui.GameScroller#adjustSlidingDeceleration
     * @param {number} deceler 
     */
    adjustSlidingDeceleration(deceler) {
        if (this.mScroller)
            this.mScroller.setSlidingDeceleration(deceler);
    }
    /**
     * @method Tooqingui.GameScroller#adjustScrollMode
     * @param {number} mode 
     */
    adjustScrollMode(mode) {
        if (!this.mConfig.orientation || this.mConfig.orientation !== mode) {
            if (this.mScroller)
                this.mScroller.setOrientationMode(mode);
        }
        this.mConfig.orientation = mode;
    }
    /**
     * @method Tooqingui.GameScroller#adjustDragThreshol
     * @param {number} hold 
     */
    adjustDragThreshol(hold) {
        if (this.mScroller)
            this.mScroller.setDragThreshold(hold);
    }
    /**
     * @method Tooqingui.GameScroller#updateScrollPos
     * @param {number} pos 
     */
    updateScrollPos(pos) {
        if (this.mConfig.orientation) {
            this.mGameObject.x = pos;
        }
        else {
            this.mGameObject.y = pos;
        }
    }
    /**
     * @method Tooqingui.GameScroller#refreshMask
     */
    refreshMask() {
        const worldpos = this.getWorldTransformMatrix();
        this.maskGraphic.setPosition(worldpos.tx, worldpos.ty);
    }
    /***
    * @method Tooqingui.GameScroller#adjustMask
    * @param {number}width
    * @param {number}height
    * @param {number}x
    * @param {number}y
    */
    adjustMask(width, height, x = this.mConfig.x, y = this.mConfig.y) {
        this.mGameObject.clearMask();
        const mask = this.scene.make.graphics(undefined, false);
        mask.fillStyle(0);
        mask.fillRect(0, 0, width, height);
        mask.setPosition(x, y);
        this.mGameObject.setMask(mask.createGeometryMask());
    }
    /**
     * @method Tooqingui.GameScroller#addItem
     * @param {Phaser.GameObjects.GameObject} item 
     */
    addItem(item) {
        this.mGameObject.add(item);
        this.setInteractiveObject(item);
    }
    /**
     * @method Tooqingui.GameScroller#addItemAt
     * @param {Phaser.GameObjects.GameObject} item 
     * @param {number} index 
     */
    addItemAt(item, index) {
        this.mGameObject.addAt(item, index);
        // this.setInteractiveObject(item);
    }
    /**
     * @method Tooqingui.GameScroller#getItemList
     * @return {Phaser.GameObjects.GameObject[]}
     */
    getItemList() {
        return this.mGameObject.list;
    }
    /**
     * @method Tooqingui.GameScroller#setBounds
     * @param {number} value0 
     * @param {number} value1 
     */
    setBounds(value0, value1) {
        this.mScroller.setBounds(value0, value1);
    }
    /**
     * @method Tooqingui.GameScroller#setAlign
     * @param {number} [align = 2]
     */
    setAlign(align = 2) {
        this.mConfig.align = align;
        this.Sort();
    }
    /**
     * @method Tooqingui.GameScroller#Sort
     */
    Sort() {
        let value = 0;
        const space = (this.mConfig.space === undefined ? 0 : this.mConfig.space);
        const list = this.mGameObject.list;
        const activeArr = [];
        for (const item of list) {
            if (item.visible) {
                activeArr.push(item);
            }
        }
        for (const item of activeArr) {
            if (this.mConfig.orientation === 1) {
                item.x = item.width * item.originX + value;
                value += item.width + space;
            }
            else {
                item.y = item.height * item.originY + value;
                value += item.height + space;
            }
        }
        if (this.mConfig.orientation === 1) {
            this.mGameObject.width = value;
            for (const item of activeArr) {
                item.x -= value * 0.5;
            }
            value -= this.width;
        }
        else {
            this.mGameObject.height = value;
            for (const item of activeArr) {
                item.y -= value * 0.5;
            }
            value -= this.height;
        }
        let leftBound = 0, rightBound = 0, bound = 0;
        if (value < 0) {
            if (this.mConfig.align === 0) {
                leftBound = rightBound = -value / 2;
            }
            else if (this.mConfig.align === 1) {
                leftBound = rightBound = 0;
            }
            else {
                leftBound = rightBound = value / 2;
            }
            bound = leftBound;
        }
        else {
            leftBound = -value / 2;
            rightBound = value / 2;
            if (this.mConfig.align === 0) {
                bound = leftBound;
            }
            else if (this.mConfig.align === 1) {
                bound = 0;
            }
            else {
                bound = rightBound;
            }
        }
        this.mLeftBound = leftBound;
        this.mRightBound = rightBound;
        this.setBounds(leftBound, rightBound);
        this.setValue(bound);
    }
    /**
     * @method Tooqingui.GameScroller#clearItems
     */
    clearItems() {
        const list = this.mGameObject.list;
        for (const item of list) {
            item.destroy();
        }
        this.mGameObject.list.length = 0;
        this.clearInteractiveObject();
    }
    /**
     * @name Tooqingui.GameScroller#bounds
     * @return {number[]}
     */
    get bounds() {
        return [this.mLeftBound, this.mRightBound];
    }
    /**
     * @method Tooqingui.GameScroller#removeInteractiveObject
     * @param {*} obj 
     */
    removeInteractiveObject(obj) {
        const index = this.mInteractiveList.indexOf(obj);
        if (index > -1) {
            this.mInteractiveList.splice(index, 1);
        }
    }
    addListen() {
        if (!this.scene)
            return;
        this.removeListen();
        this.scene.input.on("pointermove", this.pointerMoveHandler, this);
        this.scene.input.on("pointerdown", this.pointerDownHandler, this);
        this.scene.input.on("pointerup", this.pointerUpHandler, this);
    }
    removeListen() {
        this.mMoveing = false;
        if (!this.scene)
            return;
        this.scene.input.off("pointerdown", this.pointerDownHandler, this);
        this.scene.input.off("pointerup", this.pointerUpHandler, this);
        this.scene.input.off("pointermove", this.pointerMoveHandler, this);
    }
    /**
     * @name Tooqingui.GameScroller#left
     * @return {number}
     */
    get left() {
        return -this.mGameObject.width / 2;
    }
    /**
    * @name Tooqingui.GameScroller#right
    * @return {number}
    */
    get right() {
        return this.mGameObject.width / 2;
    }
    /**
    * @name Tooqingui.GameScroller#top
    * @return {number}
    */
    get top() {
        return -this.mGameObject.height / 2;
    }
    /**
    * @name Tooqingui.GameScroller#bottom
    * @return {number}
    */
    get bottom() {
        return this.mGameObject.height / 2;
    }
    /**
     * @method Tooqingui.GameScroller#setInteractiveObject
     * @param {*} obj 
     */
    setInteractiveObject(obj) {
        if (!this.mInteractiveList)
            this.mInteractiveList = [];
        this.mInteractiveList.push(obj);
    }
    destroy() {
        this.mMoveing = false;
        if (this.mGameObject)
            this.mGameObject.clearMask(true);
        if (this.mScroller)
            this.mScroller.destroy();
        super.destroy();
    }
    // public refreshBound(refreshSize?: number) {
    //     if (!this.mInteractiveList) return;
    //     // 滚动容器尺寸
    //     let totalSize: number = 0;
    //     if (refreshSize !== undefined) {
    //         totalSize = refreshSize;
    //     } else {
    //         this.mInteractiveList.forEach((cell) => {
    //             if (cell) {
    //                 totalSize += this.mConfig.orientation ? cell.width : cell.height;
    //             }
    //         });
    //     }
    //     // // 滚动容器尺寸
    //     // const tmpSize: number = this.mConfig.orientation ? this.mGameObject.width : this.mGameObject.height;
    //     // 父容器初始位置
    //     const baseSize: number = this.mConfig.orientation ? this.mGameObject.parentContainer.x : this.mGameObject.parentContainer.y;
    //     // 视口范围尺寸（滚动不能小于改尺寸）
    //     const baseShowSize: number = this.mConfig.orientation ? this.mConfig.width : this.mConfig.height;
    //     if (totalSize < baseShowSize) totalSize = baseShowSize;
    //     this.setBounds(baseSize, baseSize - totalSize + baseShowSize);
    // }
    /**
     * @method Tooqingui.GameScroller#clearInteractiveObject
     */
    clearInteractiveObject() {
        if (!this.mInteractiveList)
            return;
        this.mInteractiveList.length = 0;
        this.mInteractiveList = [];
        this.mScroller.setBounds(0, 0);
    }
    pointerMoveHandler(pointer) {
        if (this.soundGroup && this.soundGroup.move)
            this.playSound(this.soundGroup.move);
        this.mMoveing = true;
    }
    pointerDownHandler(pointer) {
        // this.scene.input.off("pointermove", this.pointerMoveHandler, this);
        if (this.soundGroup && this.soundGroup.down)
            this.playSound(this.soundGroup.down);
        const inBound = this.checkPointerInBounds(this, pointer);
        if (inBound && this.checkPointerDelection(pointer)) {
            if (this.mCellDownHandler && !this.mMoveing) {
                if (!this.mInteractiveList)
                    return;
                for (let i = 0, len = this.mInteractiveList.length; i < len; i++) {
                    const interactiveObj = this.mInteractiveList[i];
                    if (this.checkPointerInBounds(interactiveObj, pointer, true)) {
                        this.mCellDownHandler(interactiveObj);
                        break;
                    }
                }
            }
            const eventName = inBound ? ScrollerEvent.downinBound : ScrollerEvent.downoutBound;
            this.emit(eventName, this);
        }
    }
    pointerUpHandler(pointer, gameObject) {
        // this.scene.input.on("pointermove", this.pointerMoveHandler, this);
        if (this.soundGroup && this.soundGroup.up)
            this.playSound(this.soundGroup.up);
        const inBound = this.checkPointerInBounds(this, pointer);
        if (inBound && this.checkPointerDelection(pointer)) {
            if (this.mCellUpHandler && !this.mMoveing) {
                if (!this.mInteractiveList)
                    return;
                for (let i = 0, len = this.mInteractiveList.length; i < len; i++) {
                    const interactiveObj = this.mInteractiveList[i];
                    if (this.checkPointerInBounds(interactiveObj, pointer, true)) {
                        this.mCellUpHandler(interactiveObj);
                        break;
                    }
                }
            }
            const eventName = inBound ? ScrollerEvent.upinBound : ScrollerEvent.upoutBound;
            this.emit(eventName, this);
        }
        this.mMoveing = false;
    }
    /**
     * @method Tooqingui.GameScroller#checkPointerInBounds
     * @param {*} gameObject 
     * @param {Phaser.Input.Pointer} pointer 
     * @param {boolean} isCell 
     * @return {boolean}
     */
    checkPointerInBounds(gameObject, pointer, isCell = false) {
        if (!this.mRectangle) {
            this.mRectangle = new Phaser.Geom.Rectangle(0, 0, 0, 0);
        }
        this.mRectangle.left = -gameObject.width / 2;
        this.mRectangle.right = gameObject.width / 2;
        this.mRectangle.top = -gameObject.height / 2;
        this.mRectangle.bottom = gameObject.height / 2;
        if (pointer) {
            const worldMatrix = gameObject.getWorldTransformMatrix();
            const x = pointer.x - worldMatrix.tx;
            const y = pointer.y - worldMatrix.ty;
            if (this.mRectangle.left <= x && this.mRectangle.right >= x && this.mRectangle.top <= y && this.mRectangle.bottom >= y) {
                return true;
            }
            return false;
        }
        return false;
    }
    /**
     * @method Tooqingui.gameScroller#onScrollValueChange
     * @param {number} value 
     */
    onScrollValueChange(value) {
        if (this.mConfig.orientation === 1) {
            this.mGameObject.x = value;
        }
        else {
            this.mGameObject.y = value;
        }
    }
}
exports.GameScroller = GameScroller;
