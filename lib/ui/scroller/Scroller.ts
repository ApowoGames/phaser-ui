import { ScrollerConfig } from "../interface/scroller/ScrollerConfig";
import Scroller from "../../plugins/input/scroller/Scroller.js";
import { ISound } from "../interface/baseUI/ISound";
import { ISoundGroup } from "../interface/sound/ISoundConfig";
import { BaseUI } from "../baseUI/BaseUI";
import ResizeGameObject from "../../plugins/utils/size/ResizeGameObject.js";
import MaskToGameObject from "../../plugins/utils/mask/MaskToGameObject.js";
export enum ScrollerEvent {
    downinBound = "downinBound",
    downoutBound = "downoutBound",
    upinBound = "upinBound",
    upoutBound = "upoutBound"
}
const GetValue = Phaser.Utils.Objects.GetValue;
export class GameScroller extends BaseUI implements ISound {
    protected soundGroup: ISoundGroup;
    private mConfig: ScrollerConfig;
    private mDisDelection: number;
    private mCellDownHandler: Function;
    private mCellUpHandler: Function;
    /**
     * 界面内滚动子对象偏移,根据横向和竖向来决定是x向还是y向
     */
    private mChildPad: number = 0;
    /**
     * 是否在移动中
     */
    private mMoveing: boolean = false;
    private mScroller: Scroller;
    private clickContainer: any;
    private mGameObject: any;
    private mRectangle: Phaser.Geom.Rectangle;
    private mInteractiveList: any[];
    constructor(scene: Phaser.Scene, gameObject: any, config: ScrollerConfig) {
        super(scene);
        this.soundMap = new Map();
        this.mConfig = config;
        this.soundGroup = config.music;
        const bg = scene.make.graphics(undefined, false);
        bg.fillStyle(0);
        bg.fillRect(0, 0, config.width, config.height);
        bg.setPosition(config.x, config.y);
        this.width = this.mConfig.width;
        this.height = this.mConfig.height;
        gameObject.setMask(bg.createGeometryMask());
        const container: Phaser.GameObjects.Container = scene.make.container(undefined, false);
        container.setSize(config.width, config.height);
        // const bg1 = scene.make.graphics(undefined, false);
        // bg1.fillStyle(0, .2);
        // bg1.fillRect(0, 0, config.width, config.height);
        // bg1.setPosition(-config.width / 2, -config.height / 2);
        // container.add(bg);
        this.mGameObject = gameObject;
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

    public setEnable(enable: boolean) {
        if (this.mScroller) this.mScroller.setEnable(enable);
    }

    public setValue(value: number) {
        if (this.mScroller) this.mScroller.setValue(value);
    }

    public adjustBackDeceleration(deceler: number) {
        if (this.mScroller) this.mScroller.setBackDeceleration(deceler);
    }

    public adjustSlidingDeceleration(deceler: number) {
        if (this.mScroller) this.mScroller.setSlidingDeceleration(deceler);
    }

    public adjustScrollMode(mode: number) {
        if (!this.mConfig.scrollMode || this.mConfig.scrollMode !== mode) {
            if (this.mScroller) this.mScroller.setOrientationMode(mode);
        }
        this.mConfig.scrollMode = mode;
    }

    public adjustDragThreshol(hold: number) {
        if (this.mScroller) this.mScroller.setDragThreshold(hold);
    }

    /***
    *  调整scroller遮照范围
    * @param width
    * @param height
    * @param x
    * @param y
    */
    public adjustMask(width: number, height: number, x: number = this.mConfig.x, y: number = this.mConfig.y) {
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

    public setBounds(value0: number, value1: number) {
        this.mScroller.setBounds(value0, value1);
    }

    public get bounds(): number[] {
        return this.mConfig.bounds;
    }

    public resize(width?: number, height?: number, value0?: number, value1?: number) {
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

    public clearInteractiveObject() {
        if (!this.mInteractiveList) return;
        this.mInteractiveList.length = 0;
        this.mInteractiveList = [];
    }

    public setInteractiveObject(obj: any) {
        if (!this.mInteractiveList) this.mInteractiveList = [];
        this.mInteractiveList.push(obj);
    }

    public removeInteractiveObject(obj: any) {
        const index = this.mInteractiveList.indexOf(obj);
        if (index > -1) {
            this.mInteractiveList.splice(index, 1);
        }
    }

    public addListen() {
        if (!this.scene) return;
        this.removeListen();
        this.scene.input.on("pointermove", this.pointerMoveHandler, this);
        this.scene.input.on("pointerdown", this.pointerDownHandler, this);
        this.scene.input.on("pointerup", this.pointerUpHandler, this);

    }

    public removeListen() {
        this.mMoveing = false;
        if (!this.scene) return;
        this.scene.input.off("pointerdown", this.pointerDownHandler, this);
        this.scene.input.off("pointerup", this.pointerUpHandler, this);
        this.scene.input.off("pointermove", this.pointerMoveHandler, this);
    }

    public get left(): number {
        return -this.mGameObject.width / 2;
    }

    public get right(): number {
        return this.mGameObject.width / 2;
    }

    public get top(): number {
        return -this.mGameObject.height / 2;
    }

    public get bottom(): number {
        return this.mGameObject.height / 2;
    }

    public destroy() {
        this.mMoveing = false;
        if (this.mGameObject) this.mGameObject.clearMask(true);
        if (this.mScroller) this.mScroller.destroy();
        if (this.clickContainer) this.clickContainer.destroy();
        super.destroy();
    }

    public refreshBound() {
        if (!this.mInteractiveList) return;
        let tmpSize: number = 0;
        this.mInteractiveList.forEach((gameObject) => {
            if (gameObject) {
                tmpSize += this.mConfig.scrollMode ? gameObject.width : gameObject.height;
            }
        });
        //  this.setBounds(-tmpSize, 0);
    }

    private pointerMoveHandler(pointer: Phaser.Input.Pointer) {
        if (this.soundGroup && this.soundGroup.move) this.playSound(this.soundGroup.move);
        this.mMoveing = true;
    }

    private pointerDownHandler(pointer: Phaser.Input.Pointer) {
        // this.scene.input.off("pointermove", this.pointerMoveHandler, this);
        if (this.soundGroup && this.soundGroup.down) this.playSound(this.soundGroup.down);
        const inBound: boolean = this.checkPointerInBounds(this.clickContainer, pointer);
        if (inBound && this.checkPointerDelection(pointer)) {
            if (this.mCellDownHandler && !this.mMoveing) {
                if (!this.mInteractiveList) return;
                for (let i: number = 0, len = this.mInteractiveList.length; i < len; i++) {
                    const interactiveObj = this.mInteractiveList[i];
                    if (this.checkPointerInBounds(interactiveObj, pointer, true)) {
                        this.mCellDownHandler(interactiveObj);
                        break;
                    }
                }
            }
            const eventName: string = inBound ? ScrollerEvent.downinBound : ScrollerEvent.downoutBound;
            (<any>this).emit(eventName, this.clickContainer);
        }
    }
    private pointerUpHandler(pointer: Phaser.Input.Pointer, gameObject) {
        // this.scene.input.on("pointermove", this.pointerMoveHandler, this);
        if (this.soundGroup && this.soundGroup.up) this.playSound(this.soundGroup.up);
        const inBound: boolean = this.checkPointerInBounds(this.clickContainer, pointer);
        if (inBound && this.checkPointerDelection(pointer)) {
            if (this.mCellUpHandler && !this.mMoveing) {
                if (!this.mInteractiveList) return;
                for (let i: number = 0, len = this.mInteractiveList.length; i < len; i++) {
                    const interactiveObj = this.mInteractiveList[i];
                    if (this.checkPointerInBounds(interactiveObj, pointer, true)) {
                        this.mCellUpHandler(interactiveObj);
                        break;
                    }
                }
            }
            const eventName: string = inBound ? ScrollerEvent.upinBound : ScrollerEvent.upoutBound;
            (<any>this).emit(eventName, this.clickContainer);
        }
        this.mMoveing = false;
    }

    private checkPointerInBounds(gameObject: any, pointer: Phaser.Input.Pointer, isCell: Boolean = false): boolean {
        if (!this.mRectangle) {
            this.mRectangle = new Phaser.Geom.Rectangle(0, 0, 0, 0);
        }
        this.mRectangle.left = -gameObject.width / 2;
        this.mRectangle.right = gameObject.width / 2;
        this.mRectangle.top = -gameObject.height / 2;
        this.mRectangle.bottom = gameObject.height / 2;
        if (pointer) {
            const worldMatrix: Phaser.GameObjects.Components.TransformMatrix = gameObject.getWorldTransformMatrix();
            const x: number = pointer.x - worldMatrix.tx;
            const y: number = pointer.y - worldMatrix.ty;
            if (this.mRectangle.left <= x && this.mRectangle.right >= x && this.mRectangle.top <= y && this.mRectangle.bottom >= y) {
                return true;
            }
            return false;
        }
        return false;
    }
}
