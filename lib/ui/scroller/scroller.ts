import { ScrollerConfig } from "../interface/scroller/scrollerConfig";
import Scroller from "../../plugins/input/scroller/Scroller.js";
export enum ScrollerEvent {
    downinBound = "downinBound",
    downoutBound = "downoutBound",
    upinBound = "upinBound",
    upoutBound = "upoutBound"
}
const GetValue = Phaser.Utils.Objects.GetValue;
export class GameScroller extends Phaser.Events.EventEmitter {
    private mScene: Phaser.Scene;
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
        super();
        this.mConfig = config;
        const bg = scene.add.graphics(undefined);
        bg.fillStyle(0, 0);
        bg.fillRect(0, 0, config.width, config.height);
        bg.setPosition(config.x, config.y);
        gameObject.setMask(bg.createGeometryMask());
        const container: Phaser.GameObjects.Container = scene.add.container(config.x + config.width / 2, config.y + config.height / 2);
        container.setSize(config.width, config.height);
        this.mGameObject = gameObject;
        this.mScroller = new Scroller(container, config);
        this.clickContainer = container;
        this.mScene = scene;
        this.mDisDelection = GetValue(config, "interactivedisDetection", 10);
        this.mCellDownHandler = GetValue(config, "celldownCallBack", undefined);
        this.mCellUpHandler = GetValue(config, "cellupCallBack", undefined);
        this.addListen();
    }

    public clearInteractiveObject() {
        if (!this.mInteractiveList) return;
        this.mInteractiveList.length = 0;
        this.mInteractiveList = [];
    }

    public setInteractiveObject(obj: any) {
        if (!this.mInteractiveList) this.mInteractiveList = [];
        this.mInteractiveList.push(obj);
    }

    public addListen() {
        this.mScene.input.on("pointermove", this.pointerMoveHandler, this);
        this.mScene.input.on("pointerdown", this.pointerDownHandler, this);
        this.mScene.input.on("pointerup", this.pointerUpHandler, this);

    }

    public removeListen() {
        this.mMoveing = false;
        this.mScene.input.off("pointerdown", this.pointerDownHandler, this);
        this.mScene.input.off("pointerup", this.pointerUpHandler, this);
        this.mScene.input.off("pointermove", this.pointerMoveHandler, this);
    }

    public destroy() {
        this.mMoveing = false;
        this.removeListen();
        this.mScroller.destroy();
    }

    private pointerMoveHandler(pointer: Phaser.Input.Pointer) {
        this.mMoveing = true;
    }

    private pointerDownHandler(pointer: Phaser.Input.Pointer) {
        // this.mScene.input.off("pointermove", this.pointerMoveHandler, this);
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
    private pointerUpHandler(pointer: Phaser.Input.Pointer) {
        // this.mScene.input.on("pointermove", this.pointerMoveHandler, this);
        this.mMoveing = false;
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
    }

    private checkPointerDelection(pointer: Phaser.Input.Pointer) {
        return Math.abs(pointer.downX - pointer.upX) < this.mDisDelection &&
            Math.abs(pointer.downY - pointer.upY) < this.mDisDelection;
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
