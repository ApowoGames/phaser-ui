"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
import Scroller from "../../plugins/input/scroller/Scroller.js";
import BaseUI from "../baseUI/BaseUI";
/**
 * @enum {string}
 * @memberof apowophaserui
 * @readonly
 * @property {string} downinBound "downinBound"
 * @property {string} downoutBound "downoutBound"
 * @property {string} upinBound "upinBound"
 * @property {string} upoutBound "upoutBound"
 */
var ScrollerEvent = {
    "downinBound": "downinBound",
    "downoutBound": "downoutBound",
    "upinBound": "upinBound",
    "upoutBound": "upoutBound"
};
const GetValue = Phaser.Utils.Objects.GetValue;
/**
 * @class GameScroller
 * @memberof apowophaserui
 * @extends apowophaserui.BaseUI
 * @constructor
 * @param {Phaser.Scene} scene
 * @param {*} config
 * @param {Phaser.GameObjects.Container} [gameObject]
 */
class GameScroller extends BaseUI {
    constructor(scene, config, gameObject) {
        super(scene);
        /**
         * 是否在移动中
         */
        this.mMoveing = false;
        this.zoom = 1;
        /**
         * @name apowophaserui.GameScroller#soundMap
         */
        this.soundMap = new Map();
        this.mConfig = config;
        this.soundGroup = config.music;
        this.x = config.x;
        this.y = config.y;
        this.width = this.mConfig.width;
        this.height = this.mConfig.height;
        this.zoom = config.zoom ? config.zoom : 1;
        this.maskGraphic = scene.make.graphics(undefined, false);
        this.maskGraphic.fillStyle(0);
        this.maskGraphic.fillRect(-this.width * 0.5 * this.zoom, -this.height * 0.5 * this.zoom, this.width * this.zoom, this.height * this.zoom);
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
        const valuechangeCallback = config.valuechangeCallback;
        config.valuechangeCallback = (value) => {
            this.onScrollValueChange(value);
            if (valuechangeCallback)
                valuechangeCallback(value);
        };
        this.mScroller = new Scroller(this, config);
        this.mDisDelection = GetValue(config, "interactivedisDetection", 10);
        this.mCellDownHandler = GetValue(config, "celldownCallBack", undefined);
        this.mCellUpHandler = GetValue(config, "cellupCallBack", undefined);
        this.setInteractive();
        this.addListen();
    }
    /**
     * @name apowophaserui.GameScroller#view
     * @type {Phaser.GameObjects.Container}
     * @return {Phaser.GameObjects.Container}
     */
    get view() {
        return this.mGameObject;
    }
    /**
     * @method apowophaserui.GameScroller#setEnable
     * @param {boolean} enable 
     */
    setEnable(enable) {
        if (this.mScroller)
            this.mScroller.setEnable(enable);
    }
    /**
     * @method apowophaserui.GameScroller#setValue
     * @param {number} value 
     */
    setValue(value) {
        if (this.mScroller)
            this.mScroller.setValue(value);
    }
    /**
     * @method apowophaserui.GameScroller#getValue
     * @return {number}
     */
    getValue() {
        return this.mScroller.value;
    }
    /**
     * @name apowophaserui.isSliding
     * @return {boolean}
     */
    get isSliding() {
        return this.mScroller.isSliding;
    }
    /**
     * @name apowophaserui.dragSpeed
     * @return {number}
     */
    get dragSpeed() {
        return this.mScroller.dragSpeed;
    }
    /**
     * @method apowophaserui.GameScroller#adjustBackDeceleration
     * @param {number} deceler 
     */
    adjustBackDeceleration(deceler) {
        if (this.mScroller)
            this.mScroller.setBackDeceleration(deceler);
    }
    /**
     * @method apowophaserui.GameScroller#adjustSlidingDeceleration
     * @param {number} deceler 
     */
    adjustSlidingDeceleration(deceler) {
        if (this.mScroller)
            this.mScroller.setSlidingDeceleration(deceler);
    }
    /**
     * @method apowophaserui.GameScroller#adjustScrollMode
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
     * @method apowophaserui.GameScroller#adjustDragThreshol
     * @param {number} hold 
     */
    adjustDragThreshol(hold) {
        if (this.mScroller)
            this.mScroller.setDragThreshold(hold);
    }
    /**
     * @method apowophaserui.GameScroller#updateScrollPos
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
     * @method apowophaserui.GameScroller#setParent
     * @param {Phaser.GameObjects.Container} parent 
     */
    setParent(parent) {
        parent.add(this);
        this.refreshMask();
    }
    /**
     * @method apowophaserui.GameScroller#resetSize
     * @param {number} width
     * @param {number} height 
     */
    resetSize(width, height) {
        this.setSize(width, height);
        this.scene.input.setHitArea(this);
        if (this.maskGraphic) {
            this.maskGraphic.fillRect(-this.width * 0.5 * this.zoom, -this.height * 0.5 * this.zoom, this.width * this.zoom, this.height * this.zoom);
            this.refreshMask();
        }
        this.Sort();
    }
    /**
     * @method apowophaserui.GameScroller#refreshMask
     */
    refreshMask() {
        const worldpos = this.getWorldTransformMatrix();
        this.maskGraphic.setPosition(worldpos.tx, worldpos.ty);
    }
    /***
    *  调整scroller遮照范围
    * @method apowophaserui.GameScroller#adjustMask
    * @param {number} width
    * @param {number} height
    * @param {number} x
    * @param {number} y
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
     * @method apowophaserui.GameScroller#addItem
     * @param {Phaser.GameObjects.GameObject} item 
     */
    addItem(item) {
        this.mGameObject.add(item);
        this.setInteractiveObject(item);
    }
    /**
     * @method apowophaserui.GameScroller#addItems
     * @param {Phaser.GameObjects.GameObject[]} items 
     */
    addItems(items) {
        this.mGameObject.add(items);
        for (const item of items) {
            this.setInteractiveObject(item);
        }
    }
    /**
     * @method apowophaserui.GameScroller#addItemAt
     * @param {Phaser.GameObjects.GameObject} item 
     * @param {number} index 
     */
    addItemAt(item, index) {
        this.mGameObject.addAt(item, index);
        this.setInteractiveObject(item);
    }
    /**
     * @method apowophaserui.GameScroller#getItemList
     * @return {Phaser.GameObjects.GameObject[]}
     */
    getItemList() {
        return this.mGameObject.list;
    }
    /**
     * @method apowophaserui.GameScroller#getItemAt
     * @param {number} index 
     * @return {Phaser.GameObjects.GameObject}
     */
    getItemAt(index) {
        return this.mGameObject.list[index];
    }
    /**
     * @method apowophaserui.GameScroller#setBounds
     * @param {number} value0 
     * @param {number} value1 
     */
    setBounds(value0, value1) {
        this.mScroller.setBounds(value0, value1);
    }
    /**
     * @method apowophaserui.GameScroller#setAlign
     * @param {number} [align=2] 2 居左 1居中 0居右 默认居左
     */
    setAlign(align = 2) {
        this.mConfig.align = align;
        this.Sort();
    }
    /**
     * @method apowophaserui.GameScroller#Sort
     * @param {boolean} [isFixed] 
     * @param {boolean} [iscallValue]
     */
    Sort(isFixed = false, iscallValue = true) {
        let value = 0;
        const offset = (isFixed ? this.getScrollBound() : 0);
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
        value -= space;
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
        let value0 = bound;
        if (isFixed) {
            value0 += offset;
            if (value0 < leftBound)
                value0 = leftBound;
            if (value0 > rightBound)
                value0 = rightBound;
        }
        this.setBounds(leftBound, rightBound);
        if (iscallValue)
            this.setValue(value0);
    }
    /**
     * @method apowophaserui.GameScroller#getScrollBound
     * @return {number}
     */
    getScrollBound() {
        let scrollValue = 0;
        let contentValue = 0;
        let bound = 0;
        if (this.mConfig.orientation === 1) {
            scrollValue = this.width;
            contentValue = this.mGameObject.width;
        }
        else {
            scrollValue = this.height;
            contentValue = this.mGameObject.height;
        }
        bound = contentValue - scrollValue;
        if (bound < 0) {
            if (this.mConfig.align === 0) {
                bound = -bound / 2;
            }
            else if (this.mConfig.align === 1) {
                bound = 0;
            }
            else {
                bound = bound / 2;
            }
        }
        else {
            if (this.mConfig.align === 0) {
                bound = -bound / 2;
            }
            else if (this.mConfig.align === 1) {
                bound = 0;
            }
            else {
                bound = bound / 2;
            }
        }
        let offset = 0;
        if (this.mConfig.orientation === 1) {
            offset = this.mGameObject.x - bound;
        }
        else {
            offset = this.mGameObject.y - bound;
        }
        return offset;
    }
    /**
     * @method apowophaserui.GameScroller#clearItems
     * @param {boolean} destroy 
     */
    clearItems(destroy = true) {
        const list = this.mGameObject.list;
        for (const item of list) {
            this.mGameObject.remove(item);
            if (destroy) {
                item.destroy();
            }
        }
        this.clearInteractiveObject();
    }
    /**
     * @name apowophaserui.GameScroller#bounds
     * @return {number[]}
     */
    get bounds() {
        return [this.mLeftBound, this.mRightBound];
    }
    /**
     * @method apowophaserui.GameScroller#removeInteractiveObject
     * @param {*} obj 
     */
    removeInteractiveObject(obj) {
        const index = this.mInteractiveList.indexOf(obj);
        if (index > -1) {
            this.mInteractiveList.splice(index, 1);
        }
    }
    /**
     * @method apowophaserui.GameScroller#addListen
     */
    addListen() {
        if (!this.scene)
            return;
        this.removeListen();
        const selfevent = this.mConfig.selfevent || false;
        if (selfevent) {
            this.on("pointermove", this.pointerMoveHandler, this);
            this.on("pointerdown", this.pointerDownHandler, this);
            this.on("pointerup", this.pointerUpHandler, this);
        }
        else {
            this.scene.input.on("pointermove", this.pointerMoveHandler, this);
            this.scene.input.on("pointerdown", this.pointerDownHandler, this);
            this.scene.input.on("pointerup", this.pointerUpHandler, this);
        }
    }
    /**
     * @method apowophaserui.GameScroller#removeListen
     */
    removeListen() {
        this.mMoveing = false;
        if (!this.scene)
            return;
        const selfevent = this.mConfig.selfevent || false;
        if (selfevent) {
            this.off("pointermove", this.pointerMoveHandler, this);
            this.off("pointerdown", this.pointerDownHandler, this);
            this.off("pointerup", this.pointerUpHandler, this);
        }
        else {
            this.scene.input.off("pointerdown", this.pointerDownHandler, this);
            this.scene.input.off("pointerup", this.pointerUpHandler, this);
            this.scene.input.off("pointermove", this.pointerMoveHandler, this);
        }
    }
    /**
     * @name apowophaserui.GameScroller#left
     * @type {number}
     * @return {number}
     */
    get left() {
        return -this.mGameObject.width / 2;
    }
    /**
     * @name apowophaserui.GameScroller#right
     * @type {number}
     * @return {number}
     */
    get right() {
        return this.mGameObject.width / 2;
    }
    /**
     * @name apowophaserui.GameScroller#top
     * @type {number}
     * @return {number}
     */
    get top() {
        return -this.mGameObject.height / 2;
    }
    /**
     * @name apowophaserui.GameScroller#bottom
     * @type {number}
     * @return {number}
     */
    get bottom() {
        return this.mGameObject.height / 2;
    }
    /**
     * @method apowophaserui.GameScroller#setInteractiveObject
     * @param {*} obj 
     */
    setInteractiveObject(obj) {
        if (!this.mInteractiveList)
            this.mInteractiveList = [];
        this.mInteractiveList.push(obj);
    }
    /**
     * @method apowophaserui.GameScroller#destroy
     */
    destroy() {
        this.mMoveing = false;
        if (this.mGameObject)
            this.mGameObject.clearMask(true);
        if (this.mScroller)
            this.mScroller.destroy();
        super.destroy();
    }

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
        // this.mMoveing = true;
    }
    pointerDownHandler(pointer) {
        // this.scene.input.off("pointermove", this.pointerMoveHandler, this);
        pointer.upX = pointer.downX;
        pointer.upY = pointer.downY;
        if (this.soundGroup && this.soundGroup.down)
            this.playSound(this.soundGroup.down);
        const inBound = this.checkPointerInBounds(this, pointer);
        if (inBound) {
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

    checkPointerInBounds(gameObject, pointer, isCell = false) {
        // 移动超过30个单位，直接表示在移动，不必做点击处理
        const offsetValue = this.mConfig.dpr * 30;
        if (Math.abs(pointer.downX - pointer.upX) >= offsetValue || Math.abs(pointer.downY - pointer.upY) >= offsetValue) {
            return false;
        }
        if (!this.mRectangle) {
            this.mRectangle = new Phaser.Geom.Rectangle(0, 0, 0, 0);
        }
        const zoom = this.mConfig.zoom ? this.mConfig.zoom : 1;
        this.mRectangle.left = -gameObject.width / 2;
        this.mRectangle.right = gameObject.width / 2;
        this.mRectangle.top = -gameObject.height / 2;
        this.mRectangle.bottom = gameObject.height / 2;
        if (pointer) {
            const worldMatrix = gameObject.getWorldTransformMatrix();
            const x = (pointer.x - worldMatrix.tx) / zoom;
            const y = (pointer.y - worldMatrix.ty) / zoom;
            if (this.mRectangle.left <= x && this.mRectangle.right >= x && this.mRectangle.top <= y && this.mRectangle.bottom >= y) {
                return true;
            }
            return false;
        }
        return false;
    }
    onScrollValueChange(value) {
        if (this.mConfig.orientation === 1) {
            this.mGameObject.x = value;
        }
        else {
            this.mGameObject.y = value;
        }
    }
}
export default GameScroller;
