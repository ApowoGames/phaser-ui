import { ScrollerConfig } from "../interface/scroller/scrollerConfig";
import Scroller from "../../plugins/input/scroller/Scroller.js";
import IsPointerInBounds from '../../plugins/utils/input/IsPointerInBounds.js';
export enum ScrollerEvent {
    downinBound = "downinBound",
    downoutBound = "downoutBound",
    upinBound = "upinBound",
    upoutBound = "upoutBound"
}
const GetValue = Phaser.Utils.Objects.GetValue;
export class GameScroller extends Scroller {
    private mScene: Phaser.Scene;
    private mDisDelection: number;
    private mCellDownHandler: Function;
    private mCellUpHandler: Function;
    /**
     * 是否在移动中
     */
    private mMoveing: boolean = false;
    private mGameObect: Phaser.GameObjects.Components.ScrollFactor;
    constructor(scene: Phaser.Scene, gameObject: Phaser.GameObjects.Components.ScrollFactor, config: ScrollerConfig) {
        super(gameObject, config);
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
        super.destroy();
    }

    private pointerMoveHandler(pointer: Phaser.Input.Pointer) {
        this.mMoveing = true;
    }

    private pointerDownHandler(pointer: Phaser.Input.Pointer) {
        const inBound: boolean = IsPointerInBounds(this.mGameObect, pointer);
        if (inBound && this.checkPointerDelection(pointer)) {
            if (this.mCellDownHandler) {
                this.mCellDownHandler(this.mGameObect);
            }
            const eventName: string = inBound ? ScrollerEvent.downinBound : ScrollerEvent.downoutBound;
            (<any>this).emit(eventName, this.mGameObect);
        }
    }
    private pointerUpHandler(pointer: Phaser.Input.Pointer) {
        const inBound: boolean = IsPointerInBounds(this.mGameObect, pointer);
        if (inBound && this.checkPointerDelection(pointer)) {
            if (this.mCellUpHandler && !this.mMoveing) {
                this.mCellUpHandler(this.mGameObect);
            }
            const eventName: string = IsPointerInBounds(this.mGameObect, pointer) ? ScrollerEvent.upinBound : ScrollerEvent.upoutBound;
            (<any>this).emit(eventName, this.mGameObect);
        }
        this.mMoveing = false;
    }

    private checkPointerDelection(pointer: Phaser.Input.Pointer) {
        return Math.abs(pointer.downX - pointer.upX) < this.mDisDelection &&
            Math.abs(pointer.downY - pointer.upY) < this.mDisDelection;
    }
}