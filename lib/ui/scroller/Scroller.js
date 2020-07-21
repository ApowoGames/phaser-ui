"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
import Scroller from "../../plugins/input/scroller/Scroller.js";
import BaseUI from "../baseUI/BaseUI";
import ResizeGameObject from "../../plugins/utils/size/ResizeGameObject.js";
/**
 * @enum {string}
 * @memberof apowophaserui
 * @readonly
 * @property {string} downinBound "downinBound"
 * @property {string} downoutBound "downoutBound"
 * @property {string} upinBound "upinBound"
 * @property {string} upoutBound "upoutBound"
 */
var BaseScrollerEvent = {
    "downinBound": 1,
    "downoutBound": 2,
    "upinBound": 3,
    "upoutBound": 4
};
const GetValue = Phaser.Utils.Objects.GetValue;
/**
 * @class BaseScroller
 * @memberof apowophaserui
 * @constructor
 * @extends apowophaserui.BaseUI
 * @param {Phaser.Scene} scene
 * @param {*} config
 * @param {Phaser.GameObjects.Container} [gameObject]
 */
class BaseScroller extends BaseUI {
    constructor(scene, config, gameObject) {
        super(scene);
        this.mChildPad = 0;
        this.mMoveing = false;
        this.soundMap = new Map();
        this.mConfig = config;
        /**
         * @name apowophaserui.BaseScroller#soundGroup
         * @type {apowophaserui.ISoundGroup}
         * @protected
         */
        this.soundGroup = config.music;
        const bg = scene.make.graphics(undefined, false);
        bg.fillStyle(0);
        bg.fillRect(0, 0, config.width, config.height);
        bg.setPosition(config.x, config.y);
        this.width = this.mConfig.width;
        this.height = this.mConfig.height;
        gameObject.setMask(bg.createGeometryMask());
        this.mGameObject = gameObject;
        this.basePoint = (config.basePoint ? config.basePoint : new Phaser.Geom.Point(this.mGameObject.parentContainer.x, this.mGameObject.parentContainer.y));
        const container = scene.make.container(undefined, false);
        container.setSize(config.width, config.height);
        // const bg1 = scene.make.graphics(undefined, false);
        // bg1.fillStyle(0, .2);
        // bg1.fillRect(0, 0, config.width, config.height);
        // bg1.setPosition(-config.width / 2, -config.height / 2);
        // container.add(bg1);
        if (this.mGameObject.parentContainer) {
            container.x = config.clickX;
            container.y = config.clickY;
            this.mGameObject.parentContainer.add(container);
        }
        this.mScroller = new Scroller(container, config);
        this.clickContainer = container;
        this.mDisDelection = GetValue(config, "interactivedisDetection", 10);
        this.mCellDownHandler = GetValue(config, "celldownCallBack", undefined);
        this.mCellUpHandler = GetValue(config, "cellupCallBack", undefined);
        this.setInteractive();
        this.addListen();
    }
    /**
    * @method apowophaserui.BaseScroller#setEnable
    * @param {boolean} enable 
    */
    setEnable(enable) {
        if (this.mScroller)
            this.mScroller.setEnable(enable);
    }
    /**
    * @method apowophaserui.BaseScroller#setValue
    * @param {number} value 
    */
    setValue(value) {
        if (this.mScroller)
            this.mScroller.setValue(value);
    }
    /**
     * @method apowophaserui.BaseScroller#adjustBackDeceleration
     * @param {number} deceler 
     */
    adjustBackDeceleration(deceler) {
        if (this.mScroller)
            this.mScroller.setBackDeceleration(deceler);
    }
    /**
     * @method apowophaserui.BaseScroller#adjustSlidingDeceleration
     * @param {number} deceler 
     */
    adjustSlidingDeceleration(deceler) {
        if (this.mScroller)
            this.mScroller.setSlidingDeceleration(deceler);
    }
    /**
    * @method apowophaserui.BaseScroller#adjustScrollMode
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
    * @method apowophaserui.BaseScroller#adjustDragThreshol
    * @param {number} hold 
    */
    adjustDragThreshol(hold) {
        if (this.mScroller)
            this.mScroller.setDragThreshold(hold);
    }
    /***
     * @method apowophaserui.BaseScroller#adjustMask
     * @param {number}width
     * @param {number}height
     * @param {number}x
     * @param {number}y
     */
    adjustMask(width, height, x = this.mConfig.x, y = this.mConfig.y) {
        let mask = this.mGameObject.mask;
        if (!mask) {
            const config = this.mConfig;
            mask = this.scene.make.graphics(undefined, false);
            mask.fillStyle(0);
            mask.fillRect(0, 0, width, height);
            mask.setPosition(config.x, config.y);
            this.width = width;
            this.height = height;
            this.mGameObject.setMask(mask.createGeometryMask());
        }
        mask.x = x;
        mask.y = y;
        ResizeGameObject(mask, width, height);
    }
    /**
    * @method apowophaserui.BaseScroller#setBounds
    * @param {number} value0 
    * @param {number} value1 
    */
    setBounds(value0, value1) {
        this.mScroller.setBounds(value0, value1);
    }
    /**
     * @name apowophaserui.BaseScroller#bounds
     * @return {number[]}
     */
    get bounds() {
        return this.mConfig.bounds;
    }
    /**
     * @method apowophaserui.BaseScroller#resize
     * @param {number} width 
     * @param {number} height 
     * @param {number} value0 
     * @param {number} value1 
     */
    resize(width, height, value0, value1) {
        this.width = width;
        this.height = height;
        if (this.mGameObject.parentContainer) {
            this.clickContainer.x = this.mConfig.clickX;
            this.clickContainer.y = this.mConfig.clickY;
            this.mGameObject.parentContainer.add(this.clickContainer);
        }
        if (value0 !== undefined && value1 !== undefined)
            this.mScroller.setBounds(value0, value1);
    }
    // resize(width, height) {
    //     if ((this.width === width) && (this.height === height)) {
    //         return this;
    //     }
    //     super.resize(width, height);
    //     if (this.cellsMask) {
    //         ResizeGameObject(MaskToGameObject(this.cellsMask), width, height);
    //     }
    //     if (this.expandCellSize) {
    //         this.table.setDefaultCellWidth(this.instWidth / this.table.colCount);
    //     }
    //     this.updateTable(true);
    //     return this;
    // }
    /**
     * @method apowophaserui.BaseScroller#clearInteractiveObject
     */
    clearInteractiveObject() {
        if (!this.mInteractiveList)
            return;
        this.mInteractiveList.length = 0;
        this.mInteractiveList = [];
        this.mScroller.setBounds(0, 0);
    }
    /**
     * @method apowophaserui.BaseScroller#setInteractiveObject
     * @param {*} obj 
     */
    setInteractiveObject(obj) {
        if (!this.mInteractiveList)
            this.mInteractiveList = [];
        this.mInteractiveList.push(obj);
    }
    /**
     * @method apowophaserui.BaseScroller#removeInteractiveObject
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
     * @name apowophaserui.BaseScroller#left
     * @return {number}
     */
    get left() {
        return -this.mGameObject.width / 2;
    }
    /**
    * @name apowophaserui.BaseScroller#right
    * @return {number}
    */
    get right() {
        return this.mGameObject.width / 2;
    }
    /**
    * @name apowophaserui.BaseScroller#top
    * @return {number}
    */
    get top() {
        return -this.mGameObject.height / 2;
    }
    /**
    * @name apowophaserui.BaseScroller#bottom
    * @return {number}
    */
    get bottom() {
        return this.mGameObject.height / 2;
    }
    /**
     * @name apowophaserui.BaseScroller#boundPad0
     * @return {number}
     */
    get boundPad0() {
        return this.mScroller.boundPad0;
    }
    /**
    * @name apowophaserui.BaseScroller#boundPad1
    * @return {number}
    */
    get boundPad1() {
        return this.mScroller.boundPad1;
    }
    destroy() {
        this.mMoveing = false;
        if (this.mGameObject)
            this.mGameObject.clearMask(true);
        if (this.mScroller)
            this.mScroller.destroy();
        if (this.clickContainer)
            this.clickContainer.destroy();
        super.destroy();
    }
    /**
     * @method apowophaserui.BaseScroller#refreshBound
     * @param {number} [refreshSize]
     */
    refreshBound(refreshSize) {
        // if (!this.mInteractiveList) return;
        // 滚动容器尺寸
        let totalSize = 0;
        if (refreshSize !== undefined) {
            totalSize = refreshSize;
        }
        else {
            this.mInteractiveList.forEach((cell) => {
                if (cell) {
                    totalSize += this.mConfig.orientation ? cell.width : cell.height;
                }
            });
        }
        // // 滚动容器尺寸
        // const tmpSize: number = this.mConfig.orientation ? this.mGameObject.width : this.mGameObject.height;
        // 父容器初始位置
        const baseSize = this.mConfig.orientation ? this.basePoint.x : this.basePoint.y;
        // 视口范围尺寸（滚动不能小于改尺寸）
        const baseShowSize = this.mConfig.orientation ? this.mConfig.width : this.mConfig.height;
        if (totalSize < baseShowSize)
            totalSize = baseShowSize;
        this.setBounds(baseSize, baseSize - totalSize + baseShowSize);
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
        const inBound = this.checkPointerInBounds(this.clickContainer, pointer);
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
            const eventName = inBound ? BaseScrollerEvent.downinBound : BaseScrollerEvent.downoutBound;
            this.emit(eventName, this.clickContainer);
        }
    }
    pointerUpHandler(pointer, gameObject) {
        if (gameObject && this.mInteractiveList && this.mInteractiveList.length > 0) {
            if (this.mInteractiveList.indexOf(gameObject[0]) === -1 && gameObject[0] !== this.clickContainer)
                return;
        }
        // this.scene.input.on("pointermove", this.pointerMoveHandler, this);
        if (this.soundGroup && this.soundGroup.up)
            this.playSound(this.soundGroup.up);
        const inBound = this.checkPointerInBounds(this.clickContainer, pointer);
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
            const eventName = inBound ? BaseScrollerEvent.upinBound : BaseScrollerEvent.upoutBound;
            this.emit(eventName, this.clickContainer);
        }
        this.mMoveing = false;
    }
    /**
    * @method apowophaserui.BaseScroller#checkPointerInBounds
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
}
export default BaseScroller;
