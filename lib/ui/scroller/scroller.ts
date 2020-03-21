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
     * 是否在移动中
     */
    private mMoveing: boolean = false;
    private mScroller: Scroller;
    private clickContainer: any;
    private mGameObject: any;
    private mRectangle: Phaser.Geom.Rectangle;
    constructor(scene: Phaser.Scene, gameObject: any, config: ScrollerConfig) {
        super();
        this.mConfig = config;
        const bg = scene.add.graphics(undefined);
        bg.fillStyle(0, 0.2);
        bg.fillRect(0, 0, config.width, config.height);
        bg.setPosition(config.x, config.y);
        gameObject.setMask(bg.createGeometryMask());
        const container: Phaser.GameObjects.Container = scene.add.container(config.x + config.width / 2, config.y + config.height / 2);
        container.setSize(config.width, config.height);
        container.setInteractive(new Phaser.Geom.Rectangle(0, 0, config.width, config.height), Phaser.Geom.Rectangle.Contains);
        // const bg1 = scene.make.graphics(undefined);
        // bg1.fillStyle(0x123, 0.2);
        // bg1.fillRect(-config.width / 2, -config.height / 2, config.width, config.height);
        // container.add(bg1);
        this.mGameObject = gameObject;
        this.mScroller = new Scroller(container, config);
        this.clickContainer = container;
        this.mScene = scene;
        this.mDisDelection = GetValue(config, "interactivedisDetection", 10);
        this.mCellDownHandler = GetValue(config, "celldownCallBack", undefined);
        this.mCellUpHandler = GetValue(config, "cellupCallBack", undefined);
        this.addListen();
    }

    public addListen() {
        this.mScene.input.on("pointerdown", this.pointerDownHandler, this);
        this.mScene.input.on("pointerup", this.pointerUpHandler, this);
        this.mScene.input.on("pointermove", this.pointerMoveHandler, this);
    }

    public removeListen() {
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
        const inBound: boolean = this.checkPointerInBounds(this.clickContainer, pointer);
        if (inBound && this.checkPointerDelection(pointer)) {
            if (this.mCellDownHandler && !this.mMoveing) {
                this.mCellDownHandler(pointer);
            }
            const eventName: string = inBound ? ScrollerEvent.downinBound : ScrollerEvent.downoutBound;
            (<any>this).emit(eventName, this.clickContainer);
        }
    }
    private pointerUpHandler(pointer: Phaser.Input.Pointer) {
        const inBound: boolean = this.checkPointerInBounds(this.clickContainer, pointer);
        if (inBound && this.checkPointerDelection(pointer)) {
            if (this.mCellUpHandler && !this.mMoveing) {
                this.mCellUpHandler(pointer);
            }
            const eventName: string = inBound ? ScrollerEvent.upinBound : ScrollerEvent.upoutBound;
            (<any>this).emit(eventName, this.clickContainer);
        }
        this.mMoveing = false;
    }

    private checkPointerDelection(pointer: Phaser.Input.Pointer) {
        return Math.abs(pointer.downX - pointer.upX) < this.mDisDelection &&
            Math.abs(pointer.downY - pointer.upY) < this.mDisDelection;
    }

    private checkPointerInBounds(gameObject, pointer): boolean {
        if (!this.mRectangle) {
            this.mRectangle = new Phaser.Geom.Rectangle(0, 0, 0, 0);
        }
        this.mRectangle.left = -gameObject.width / 2;
        this.mRectangle.right = gameObject.width / 2;
        this.mRectangle.top = -gameObject.height / 2;
        this.mRectangle.bottom = gameObject.height / 2;
        if (pointer) {
            if (!this.mRectangle.contains(pointer.x - gameObject.x, pointer.y - gameObject.y)) {
                return false;
            }
            return true;
        }
        return false;
    }
}
