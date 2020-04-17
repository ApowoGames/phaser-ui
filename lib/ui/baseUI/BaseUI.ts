/*
 * 基础组件（不带有加载过程，直接设置加载好的皮肤）
 * @Author: gxm
 * @Date: 2020-04-14 17:17:15
 * @Last Modified by: gxm
 * @Last Modified time: 2020-04-17 11:11:45
 */
import { ISound } from "../interface/baseUI/ISound";
import { ISoundConfig } from "../interface/sound/ISoundConfig";
import { ISetInteractive } from "../interface/baseUI/ISetInteractive";
import { Tool } from "../tool/Tool";

export interface UIFollowConfig {
    scene: Phaser.Scene,
    followX: number,
    followY: number,
    baseX: number,
    baseY: number
}

export class BaseUI extends Phaser.Events.EventEmitter implements ISound, ISetInteractive {
    /**
     * 声音map
     */
    public soundMap: Map<string, Phaser.Sound.BaseSound>;
    /**
     * ui显示对象
     */
    protected mContainer: Phaser.GameObjects.Container;
    /**
     * 是否能交互
     */
    protected mEnabled: boolean = false;
    /**
     * ui-scene
     */
    protected mScene: Phaser.Scene;
    /**
     * 是否静音
     */
    protected mMute: boolean = false;
    /**
     * 移动端像素密度
     */
    protected dpr: number = 1;
    /**
     * ui缩放参数（外部world传入）
     */
    protected uiScale: number = 1;
    /**
     * 宽高
     */
    protected width: number = 0;
    protected height: number = 0;
    /**
     * ui数据
     */
    protected mData: any;
    /**
     * 更新ui跟随位置回调
     */
    protected posFunc: Function;
    /**
     * ui跟随对象
     */
    protected mFollow: any;
    /**
     * 跟随对象所处的scene
     */
    protected mFromScene: Phaser.Scene;
    constructor(scene: Phaser.Scene, dpr?: number, scale?: number) {
        super();
        this.mScene = scene;
        this.dpr = dpr || 1;
        this.uiScale = scale || 1;
        this.mContainer = scene.make.container(undefined, false);
        this.soundMap = new Map();
        this.disInteractive();
    }

    public get view(): any {
        return this.mContainer;
    }

    public get x(): number {
        return this.mContainer.x;
    }

    public set x(value: number) {
        this.mContainer.x = value;
    }

    public get y(): number {
        return this.mContainer.y;
    }

    public set y(value: number) {
        this.mContainer.y = value;
    }

    public get scale(): number {
        return this.mContainer.scale;
    }

    public set scale(value: number) {
        this.mContainer.scale = value;
    }

    public get list(): Phaser.GameObjects.GameObject[] {
        return this.mContainer.list;
    }

    public add(gameObject: any) {
        this.mContainer.add(gameObject);
    }

    public addAt(gameObject: any, index: number) {
        this.mContainer.addAt(gameObject, index);
    }

    public setSize(width?: number, height?: number) {
        this.width = width;
        this.height = height;
        this.mContainer.setSize(width, height);
    }

    public setPosition(x: number, y: number) {
        this.mContainer.x = x;
        this.mContainer.y = y;
    }

    public setFollow(gameObject: any, fromScene: Phaser.Scene, posFunc?: Function) {
        this.mFollow = gameObject;
        this.mFromScene = fromScene;
        if (posFunc) this.posFunc = posFunc;
    }

    public updatePos() {
        if (this.posFunc) {
            this.posFunc({
                scene: this.mFromScene,
                followX: this.mFollow.x,
                followY: this.mFollow.y,
                baseX: this.mContainer.x,
                baseY: this.mContainer.y
            })
        } else {
            const camera = this.mFromScene.cameras.main;
            const px = this.mContainer.x - camera.scrollX;
            const py = this.mContainer.y - camera.scrollY;
            this.mContainer.x = px;
            this.mContainer.y = py;
        }
    }

    public setInteractive() {
        this.mEnabled = true;
        this.addListen();
    }

    public disInteractive() {
        this.mEnabled = false;
        this.removeListen();
    }

    get interactive(): boolean {
        return this.mEnabled;
    }

    public addListen() {
        let containerBoo: boolean = true;
        if (this.mContainer || this.mContainer.width === 0 || this.mContainer.height === 0) {
            containerBoo = false;
        }
        if (this.mEnabled) {
            if (containerBoo) {
                this.mContainer.setInteractive();
                this.mContainer.on("pointerup", this.uiClick, this);
            }
            this.mScene.input.off("pointerup", this.sceneClick, this);
        } else {
            if (containerBoo) {
                this.mContainer.disableInteractive();
                this.mContainer.off("pointerup", this.uiClick, this);
            }
            this.mScene.input.on("pointerup", this.sceneClick, this);
        }
    }

    public removeListen() {
        this.mEnabled = false;
        this.mScene.input.off("pointerup", this.sceneClick, this);
        if (this.mContainer) {
            this.mContainer.off("pointerup", this.uiClick, this);
        }
    }

    public playSound(config: ISoundConfig) {
        if (this.mute) return;
        const key = config.key;
        const urls = config.urls;
        if (this.mScene.cache.audio.exists(key)) {
            this.startPlay(config);
        } else {
            this.mScene.load.once(`filecomplete-audio-${key}`, () => {
                this.startPlay(config);
            }, this);
            this.mScene.load.audio(key, urls);
            this.mScene.load.start();
        }
    }

    public startPlay(config: ISoundConfig) {
        if (this.mute) return;
        const key = config.key;
        let sound = this.soundMap.get(key);
        if (!sound) {
            sound = this.mScene.sound.add(key, config.soundConfig);
            this.soundMap.set(key, sound);
        }
        if (sound.isPlaying) {
            return;
        }
        sound.play();
    }

    public stopSound() {
        if (this.mMute) return;
        this.soundMap.forEach((sound) => {
            if (sound.isPlaying) sound.stop();
        });
    }

    public pauseSound() {
        if (this.mMute) return;
        this.soundMap.forEach((sound) => {
            if (!sound.isPaused) sound.pause();
        });
    }

    public resumeSound() {
        if (this.mMute) return;
        this.soundMap.forEach((sound) => {
            if (sound.isPaused) sound.resume();
        });
    }

    public mute(boo: boolean) {
        this.mMute = boo;
    }

    public destroy() {
        this.soundMap.forEach((sound) => {
            if (sound.isPlaying) sound.stop();
        });
        this.mMute = false;
        this.removeListen();
        super.destroy();
    }

    protected sceneClick(pointer: Phaser.Input.Pointer) {
        if (Tool.checkPointerContains(this.mContainer, pointer) && this.checkPointerDelection(pointer)) {
            this.emit("uiClick");
        }
    }

    protected uiClick(pointer: Phaser.Input.Pointer) {
        if (this.checkPointerDelection(pointer)) {
            this.emit("uiClick");
        }
    }

    protected checkPointerDelection(pointer: Phaser.Input.Pointer) {
        if (!this.mScene) return true;
        return Math.abs(pointer.downX - pointer.upX) < 10 ||
            Math.abs(pointer.downY - pointer.upY) < 10;
    }
}
