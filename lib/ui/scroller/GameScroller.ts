import { ScrollerConfig } from "../interface/scroller/ScrollerConfig";
import Scroller from "../../plugins/input/scroller/Scroller.js";
import { ISound } from "../interface/baseUI/ISound";
import { ISoundGroup } from "../interface/sound/ISoundConfig";
import { BaseUI } from "../baseUI/BaseUI";
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
     * 是否在移动中
     */
    private mMoveing: boolean = false;
    private mScroller: Scroller;
    private mGameObject: Phaser.GameObjects.Container;
    private maskGraphic: Phaser.GameObjects.Graphics;
    private mRectangle: Phaser.Geom.Rectangle;
    private mInteractiveList: any[];
    private mLeftBound: number;
    private mRightBound: number;
    constructor(scene: Phaser.Scene, config: ScrollerConfig, gameObject?: Phaser.GameObjects.Container) {
        super(scene);
        this.soundMap = new Map();
        this.mConfig = config;
        this.soundGroup = config.music;
        this.x = config.x; this.y = config.y;
        this.width = this.mConfig.width;
        this.height = this.mConfig.height;
        const zoom = config.zoom;
        this.maskGraphic = scene.make.graphics(undefined, false);
        this.maskGraphic.fillStyle(0);
        this.maskGraphic.fillRect(-this.width * 0.5 * zoom, -this.height * 0.5 * zoom, this.width * zoom, this.height * zoom);
        this.maskGraphic.setPosition(this.x * zoom, this.y * zoom);
        this.add(this.maskGraphic);
        if (gameObject) {
            this.mGameObject = gameObject;
        } else {
            this.mGameObject = scene.make.container(undefined, false);
            this.add(this.mGameObject);
        }
        // this.mGameObject.setMask(this.maskGraphic.createGeometryMask());
        // const bg1 = scene.make.graphics(undefined, false);
        // bg1.fillStyle(0, .2);
        // bg1.fillRect(0, 0, config.width, config.height);
        // bg1.setPosition(-config.width / 2, -config.height / 2);
        // this.add(bg1);
        if (!config.valuechangeCallback) config.valuechangeCallback = (value) => {
            this.onScrollValueChange(value);
        };
        this.mScroller = new Scroller(this, config);
        this.mDisDelection = GetValue(config, "interactivedisDetection", 10);
        this.mCellDownHandler = GetValue(config, "celldownCallBack", undefined);
        this.mCellUpHandler = GetValue(config, "cellupCallBack", undefined);
        this.setInteractive();
        this.addListen();
    }

    public get view(): Phaser.GameObjects.Container {
        return this.mGameObject;
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
        if (!this.mConfig.orientation || this.mConfig.orientation !== mode) {
            if (this.mScroller) this.mScroller.setOrientationMode(mode);
        }
        this.mConfig.orientation = mode;
    }

    public adjustDragThreshol(hold: number) {
        if (this.mScroller) this.mScroller.setDragThreshold(hold);
    }

    public updateScrollPos(pos: number) {
        if (this.mConfig.orientation) {
            this.mGameObject.x = pos;
        } else {
            this.mGameObject.y = pos;
        }
    }

    /***
    *  调整scroller遮照范围
    * @param width
    * @param height
    * @param x
    * @param y
    */
    public adjustMask(width: number, height: number, x: number = this.mConfig.x, y: number = this.mConfig.y) {
        this.mGameObject.clearMask();
        const mask = this.scene.make.graphics(undefined, false);
        mask.fillStyle(0);
        mask.fillRect(0, 0, width, height);
        mask.setPosition(x, y);
        this.mGameObject.setMask(mask.createGeometryMask());
    }

    public addItem(item: Phaser.GameObjects.GameObject) {
        this.mGameObject.add(item);
        this.setInteractiveObject(item);
    }

    public addItemAt(item: Phaser.GameObjects.GameObject, index: number) {
        this.mGameObject.addAt(item, index);
        // this.setInteractiveObject(item);
    }

    public getItemList(): Phaser.GameObjects.GameObject[] {
        return this.mGameObject.list;
    }

    public setBounds(value0: number, value1: number) {
        this.mScroller.setBounds(value0, value1);
    }
    /**
     *
     * @param align 2 居左 1居中 0居右 默认居左
     */
    public setAlign(align: number = 2) {
        this.mConfig.align = align;
        this.Sort();
    }
    public Sort() {
        let value = 0;
        const list: any = this.mGameObject.list;
        for (const item of list) {
            if (this.mConfig.orientation === 1) {
                item.x = item.width * item.originX + value;
                value += item.width;
            } else {
                item.y = item.height * item.originY + value;
                value += item.height;
            }
        }
        if (this.mConfig.orientation === 1) {
            this.mGameObject.width = value;
            for (const item of list) {
                item.x -= value * 0.5;
            }
            value -= this.width;
        } else {
            this.mGameObject.height = value;
            for (const item of list) {
                item.y -= value * 0.5;
            }
            value -= this.height;
        }

        let leftBound = 0, rightBound = 0, bound = 0;
        if (value < 0) {
            if (this.mConfig.align === 0) {
                leftBound = rightBound = -value / 2;
            } else if (this.mConfig.align === 1) {
                leftBound = rightBound = 0;
            } else {
                leftBound = rightBound = value / 2;
            }
            bound = leftBound;
        } else {
            leftBound = -value / 2;
            rightBound = value / 2;
            if (this.mConfig.align === 0) {
                bound = leftBound;
            } else if (this.mConfig.align === 1) {
                bound = 0;
            } else {
                bound = rightBound;
            }
        }
        this.mLeftBound = leftBound;
        this.mRightBound = rightBound;
        this.setBounds(leftBound, rightBound);
        this.setValue(bound);
    }

    public clearItems() {
        const list = this.mGameObject.list;
        for (const item of list) {
            item.destroy();
        }
        this.mGameObject.list.length = 0;
        this.clearInteractiveObject();
    }

    public get bounds(): number[] {
        return [this.mLeftBound, this.mRightBound];
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

    public setInteractiveObject(obj: any) {
        if (!this.mInteractiveList) this.mInteractiveList = [];
        this.mInteractiveList.push(obj);
    }

    public destroy() {
        this.mMoveing = false;
        if (this.mGameObject) this.mGameObject.clearMask(true);
        if (this.mScroller) this.mScroller.destroy();
        super.destroy();
    }

    // /**
    //  * 手动刷新滚动范围
    //  * @param refreshSize刷新滚动范围数值，由于在某些场景下ui的宽高尺寸比较难用单一公式计算，所以可以直接外部传入刷新的数值
    //  */
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
    private clearInteractiveObject() {
        if (!this.mInteractiveList) return;
        this.mInteractiveList.length = 0;
        this.mInteractiveList = [];
        this.mScroller.setBounds(0, 0);
    }

    private pointerMoveHandler(pointer: Phaser.Input.Pointer) {
        if (this.soundGroup && this.soundGroup.move) this.playSound(this.soundGroup.move);
        this.mMoveing = true;
    }

    private pointerDownHandler(pointer: Phaser.Input.Pointer) {
        // this.scene.input.off("pointermove", this.pointerMoveHandler, this);
        if (this.soundGroup && this.soundGroup.down) this.playSound(this.soundGroup.down);
        const inBound: boolean = this.checkPointerInBounds(this, pointer);
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
            (<any>this).emit(eventName, this);
        }
    }
    private pointerUpHandler(pointer: Phaser.Input.Pointer, gameObject) {
        // this.scene.input.on("pointermove", this.pointerMoveHandler, this);
        if (this.soundGroup && this.soundGroup.up) this.playSound(this.soundGroup.up);
        const inBound: boolean = this.checkPointerInBounds(this, pointer);
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
            (<any>this).emit(eventName, this);
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
    private onScrollValueChange(value) {
        if (this.mConfig.orientation === 1) {
            this.mGameObject.x = value;
        } else {
            this.mGameObject.y = value;
        }
    }
}
