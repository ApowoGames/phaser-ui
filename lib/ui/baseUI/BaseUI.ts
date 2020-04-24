/*
 * 基础组件（不带有加载过程，直接设置加载好的皮肤）
 * @Author: gxm
 * @Date: 2020-04-14 17:17:15
 * @Last Modified by: gxm
 * @Last Modified time: 2020-04-24 11:43:50
 */
import { ISound } from "../interface/baseUI/ISound";
import { ISoundConfig } from "../interface/sound/ISoundConfig";
import { ISetInteractive } from "../interface/baseUI/ISetInteractive";
import { Tool } from "../tool/Tool";

export interface UIFollowConfig {
    scene: Phaser.Scene;
    followX: number;
    followY: number;
    baseX: number;
    baseY: number;
}

export class BaseUI extends Phaser.Events.EventEmitter implements ISound, ISetInteractive {
    /**
     * 声音map
     */
    public soundMap: Map<string, Phaser.Sound.BaseSound>;
    /**
     * ui显示对象
     */
    protected container: Phaser.GameObjects.Container;
    /**
     * 是否能交互
     */
    protected interactiveBoo: boolean = false;
    /**
     * ui-scene
     */
    protected scene: Phaser.Scene;
    /**
     * 是否静音
     */
    protected silent: boolean = false;
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
    protected data: any;
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
    protected mFroscene: Phaser.Scene;
    /**
     * 是否初始化
     */
    protected mInitialized: boolean = false;
    protected mShow: boolean = false;
    constructor(scene: Phaser.Scene, dpr?: number, scale?: number) {
        super();
        this.scene = scene;
        this.dpr = dpr || 1;
        this.uiScale = scale || 1;
        this.container = scene.make.container(undefined, false);
        this.soundMap = new Map();
        this.disInteractive();
    }

    public get view(): any {
        return this.container;
    }

    public get x(): number {
        return this.container.x;
    }

    public set x(value: number) {
        this.container.x = value;
    }

    public get y(): number {
        return this.container.y;
    }

    public set y(value: number) {
        this.container.y = value;
    }

    public get z(): number {
        return this.container.z;
    }

    public set z(value: number) {
        this.container.z = value;
    }

    public get parentContainer(): Phaser.GameObjects.GameObject {
        return this.container.parentContainer;
    }

    public get scale(): number {
        return this.uiScale;
    }

    public set scale(value: number) {
        this.uiScale = value;
        this.container.scale = value;
    }

    public get list(): Phaser.GameObjects.GameObject[] {
        return this.container.list;
    }

    public add(gameObject: any) {
        this.container.add(gameObject);
    }

    public addAt(gameObject: any, index: number) {
        this.container.addAt(gameObject, index);
    }

    public remove(gameObject: any) {
        this.container.remove(gameObject);
    }

    public setData(key, data) {
        this.container.setData(key, data);
    }

    public getData(key): any {
        return this.container.getData(key);
    }

    /**
     * 调整ui尺寸
     * @param width
     * @param height
     */
    public setSize(width?: number, height?: number) {
        this.width = width;
        this.height = height;
        this.container.setSize(width, height);
        if (this.interactiveBoo) this.container.setInteractive(new Phaser.Geom.Rectangle(0, 0, this.width, this.height), Phaser.Geom.Rectangle.Contains);
    }

    /**
     * 调整ui布局
     * @param width
     * @param height
     */
    public resize(width?: number, height?: number) {
    }

    public setPosition(x: number, y: number) {
        this.container.x = x;
        this.container.y = y;
    }

    public setFollow(gameObject: any, froscene: Phaser.Scene, posFunc?: Function) {
        this.mFollow = gameObject;
        this.mFroscene = froscene;
        if (posFunc) this.posFunc = posFunc;
    }

    public updatePos() {
        if (!this.mShow) return;
        if (this.posFunc) {
            this.posFunc({
                scene: this.mFroscene,
                followX: this.mFollow.x,
                followY: this.mFollow.y,
                baseX: this.container.x,
                baseY: this.container.y
            });
        } else {
            const camera = this.mFroscene.cameras.main;
            const px = this.container.x - camera.scrollX;
            const py = this.container.y - camera.scrollY;
            this.container.x = px;
            this.container.y = py;
        }
    }

    public setInteractive() {
        this.interactiveBoo = true;
        this.addListen();
    }

    public disInteractive() {
        this.interactiveBoo = false;
        this.removeListen();
    }

    get interactive(): boolean {
        return this.interactiveBoo;
    }

    public addListen() {
        if (!this.mInitialized) return;
        let containerBoo: boolean = true;
        if (this.container || this.container.width === 0 || this.container.height === 0) {
            containerBoo = false;
        }
        if (this.interactiveBoo) {
            if (containerBoo) {
                this.container.setInteractive(new Phaser.Geom.Rectangle(0, 0, this.width, this.height), Phaser.Geom.Rectangle.Contains);
                this.container.on("pointerup", this.uiClick, this);
            }
            this.scene.input.off("pointerup", this.sceneClick, this);
        } else {
            if (containerBoo) {
                this.container.disableInteractive();
                this.container.off("pointerup", this.uiClick, this);
            }
            this.scene.input.on("pointerup", this.sceneClick, this);
        }
    }

    public removeListen() {
        if (!this.mInitialized) return;
        this.scene.input.off("pointerup", this.sceneClick, this);
        if (this.container) {
            this.container.off("pointerup", this.uiClick, this);
        }
    }

    public playSound(config: ISoundConfig) {
        if (this.silent) return;
        const key = config.key;
        const urls = config.urls;
        if (this.scene.cache.audio.exists(key)) {
            this.startPlay(config);
        } else {
            this.scene.load.once(`filecomplete-audio-${key}`, () => {
                this.startPlay(config);
            }, this);
            this.scene.load.audio(key, urls);
            this.scene.load.start();
        }
    }

    public startPlay(config: ISoundConfig) {
        if (this.silent) return;
        const key = config.key;
        let sound = this.soundMap.get(key);
        if (!sound) {
            sound = this.scene.sound.add(key, config.soundConfig);
            this.soundMap.set(key, sound);
        }
        if (sound.isPlaying) {
            return;
        }
        sound.play();
    }

    public stopSound() {
        if (this.silent) return;
        this.soundMap.forEach((sound) => {
            if (sound.isPlaying) sound.stop();
        });
    }

    public pauseSound() {
        if (this.silent) return;
        this.soundMap.forEach((sound) => {
            if (!sound.isPaused) sound.pause();
        });
    }

    public resumeSound() {
        if (this.silent) return;
        this.soundMap.forEach((sound) => {
            if (sound.isPaused) sound.resume();
        });
    }

    public setSilent(boo: boolean) {
        this.silent = boo;
    }

    public destroy() {
        this.soundMap.forEach((sound) => {
            if (sound.isPlaying) sound.stop();
        });
        this.mInitialized = false;
        this.interactiveBoo = false;
        this.silent = false;
        this.removeListen();
        super.destroy();
    }

    protected sceneClick(pointer: Phaser.Input.Pointer) {
        if (Tool.checkPointerContains(this.container, pointer) && this.checkPointerDelection(pointer)) {
            this.emit("uiClick");
        }
    }

    protected uiClick(pointer: Phaser.Input.Pointer) {
        if (this.checkPointerDelection(pointer)) {
            this.emit("uiClick");
        }
    }

    protected checkPointerDelection(pointer: Phaser.Input.Pointer) {
        if (!this.scene) return true;
        return Math.abs(pointer.downX - pointer.upX) < 10 ||
            Math.abs(pointer.downY - pointer.upY) < 10;
    }
}
