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
export class GameScrollerTest extends BaseUI implements ISound {
    protected soundGroup: ISoundGroup;
    private mConfig: TestScrollerConfig;
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
    private mGameObject: Phaser.GameObjects.Container;
    private maskGraphic: Phaser.GameObjects.Graphics;
    private mRectangle: Phaser.Geom.Rectangle;
    private mInteractiveList: any[];
    constructor(scene: Phaser.Scene, config: TestScrollerConfig) {
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
        this.mGameObject = scene.make.container(undefined, false);
        this.mGameObject.setMask(this.maskGraphic.createGeometryMask());
        this.add(this.mGameObject);
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

    /***
    *  调整scroller遮照范围
    * @param width
    * @param height
    * @param x
    * @param y
    */
    public adjustMask(width: number, height: number, x: number = this.mConfig.x, y: number = this.mConfig.y) {
        // let mask = this.mGameObject.mask;
        // if (!mask) {
        //     const config = this.mConfig;
        //     mask = this.scene.make.graphics(undefined, false);
        //     mask.fillStyle(0);
        //     mask.fillRect(0, 0, width, height);
        //     mask.setPosition(config.x, config.y);
        //     this.width = width;
        //     this.height = height;
        //     this.mGameObject.setMask(mask.createGeometryMask());
        // }
        // mask.x = x;
        // mask.y = y;
        // ResizeGameObject(mask, width, height);
    }

    public addItem(item: any) {
        this.mGameObject.add(item);
        this.setInteractiveObject(item);
    }

    public setBounds(value0: number, value1: number) {
        this.mScroller.setBounds(value0, value1);
    }
    /**
     * 
     * @param align 0 居左 1居中 2居右
     */
    public setAlign(align: number) {
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
        this.setBounds(leftBound, rightBound);
        this.setValue(bound);
    }

    public clearItems() {
        this.mGameObject.list.length = 0;
        this.clearInteractiveObject();
    }
    public get bounds(): number[] {
        // return this.mConfig.bounds;
        return [];
    }

    public clearInteractiveObject() {
        if (!this.mInteractiveList) return;
        this.mInteractiveList.length = 0;
        this.mInteractiveList = [];
        this.mScroller.setBounds(0, 0);
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

    public get boundPad0(): number {
        return this.mScroller.boundPad0;
    }

    public get boundPad1(): number {
        return this.mScroller.boundPad1;
    }

    public destroy() {
        this.mMoveing = false;
        if (this.mGameObject) this.mGameObject.clearMask(true);
        if (this.mScroller) this.mScroller.destroy();
        super.destroy();
    }

    /**
     * 手动刷新滚动范围
     * @param refreshSize刷新滚动范围数值，由于在某些场景下ui的宽高尺寸比较难用单一公式计算，所以可以直接外部传入刷新的数值
     */
    public refreshBound(refreshSize?: number) {
        if (!this.mInteractiveList) return;
        // 滚动容器尺寸
        let totalSize: number = 0;
        if (refreshSize !== undefined) {
            totalSize = refreshSize;
        } else {
            this.mInteractiveList.forEach((cell) => {
                if (cell) {
                    totalSize += this.mConfig.orientation ? cell.width : cell.height;
                }
            });
        }
        // // 滚动容器尺寸
        // const tmpSize: number = this.mConfig.orientation ? this.mGameObject.width : this.mGameObject.height;
        // 父容器初始位置
        const baseSize: number = this.mConfig.orientation ? this.mGameObject.parentContainer.x : this.mGameObject.parentContainer.y;
        // 视口范围尺寸（滚动不能小于改尺寸）
        const baseShowSize: number = this.mConfig.orientation ? this.mConfig.width : this.mConfig.height;
        if (totalSize < baseShowSize) totalSize = baseShowSize;
        this.setBounds(baseSize, baseSize - totalSize + baseShowSize);
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
class TestScrollerConfig {
    x: number;
    y: number;
    width: number;
    height: number;
    zoom?: number = 1;
    /**
     * 0 居左 1居中 2居右
     */
    align?: number = 0;
    /**
     * 0 vertical / 1 horizontal
     */
    orientation?: number;
    threshold?: number; // 滚动延时 0为立刻滚动
    interactivedisDetection?: number; // 子对象交互事件派发 最大检测范围，如果up和down两次的pointer超过该距离就不会发送子对象事件
    slidingDeceleration?: number; // 拖动释放时是否减慢速度时间
    backDeceleration?: number; //  拖出视口范围的弹性效果时间
    enable?: boolean; // 是否能拖动
    /**
     * 0 点击音效  1滚动音效
     */
    music?: ISoundGroup;
    valuechangeCallback?: Function; // 滚动条位置发生变化返回事件
    valuechangeCallbackScope?: Function; //
    celldownCallBack?: Function; // 子对象pointerdown 事件 可以把点击的对象抛出
    cellupCallBack?: Function; // 子对象pointerup 事件 可以把点击的对象抛出
}