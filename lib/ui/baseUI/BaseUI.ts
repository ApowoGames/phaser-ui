/*
 * 基础组件（不带有加载过程，直接设置加载好的皮肤）
 * @Author: gxm
 * @Date: 2020-04-14 17:17:15
 * @Last Modified by: gxm
 * @Last Modified time: 2020-06-11 09:32:24
 */
import { ISound } from "../interface/baseUI/ISound";
import { ISoundConfig } from "../interface/sound/ISoundConfig";
export interface UIFollowConfig {
    scene: Phaser.Scene;
    followX: number;
    followY: number;
    baseX: number;
    baseY: number;
}

/**
 * @class BaseUI
 * @memberof tooqingui
 * @extends Phaser.GameObjects.Container
 */
export class BaseUI extends Phaser.GameObjects.Container implements ISound {
    /**
     * 声音map
     */
    public soundMap: Map<string, Phaser.Sound.BaseSound>;
    /**
     * 是否静音
     */
    protected silent: boolean = false;
    /**
     * 移动端像素密度
     */
    protected dpr: number = 1;
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
    protected interactiveBoo: boolean = false;
    protected mShow: boolean = false;
    constructor(scene: Phaser.Scene, dpr?: number, scale?: number) {
        super(scene);
        this.dpr = dpr || 1;
        this.scale = scale || 1;
        this.soundMap = new Map();
        this.disInteractive();
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
                baseX: this.x,
                baseY: this.y
            });
        } else {
            const camera = this.mFroscene.cameras.main;
            const px = this.x - camera.scrollX;
            const py = this.y - camera.scrollY;
            this.x = px;
            this.y = py;
        }
    }

    public setInteractive(shape?: Phaser.Types.Input.InputConfiguration | any, callback?: Phaser.Types.Input.HitAreaCallback, dropZone?: boolean): this {
        this.interactiveBoo = true;
        super.setInteractive(shape, callback, dropZone);
        return this;
    }

    public disInteractive() {
        this.interactiveBoo = false;
        super.disableInteractive();
    }

    public addListen() {
        // if (!this.mInitialized) return;
        // let sizeBoo: boolean = true;
        // if (this.width === 0 || this.height === 0) {
        //     sizeBoo = false;
        // }
        // if (this.interactiveBoo) {
        //     if (sizeBoo) {
        //         this.setInteractive(new Phaser.Geom.Rectangle(0, 0, this.width, this.height), Phaser.Geom.Rectangle.Contains);
        //         this.on("pointerup", this.uiClick, this);
        //     }
        //     this.scene.input.off("pointerup", this.sceneClick, this);
        // } else {
        //     if (sizeBoo) {
        //         this.disableInteractive();
        //         this.off("pointerup", this.uiClick, this);
        //     }
        //     this.scene.input.on("pointerup", this.sceneClick, this);
        // }
    }

    public removeListen() {
        // if (!this.mInitialized) return;
        // this.scene.input.off("pointerup", this.sceneClick, this);
        // this.off("pointerup", this.uiClick, this);
    }
    public playSound(config: ISoundConfig) {
        if (this.silent) return;
        // if (config.key === undefined) {
        //     if (typeof config.urls === "string") {
        //         config.key = config.urls;
        //     } else {
        //         config.key = config.urls[0];
        //     }
        // }
        const key = config.key;
        // const urls = config.urls;
        if (this.scene.cache.audio.exists(key)) {
            this.startPlay(config);
        } else {
            // this.scene.load.once(`filecomplete-audio-${key}`, () => {
            //     this.startPlay(config);
            // }, this);
            // this.scene.load.audio(key, urls);
            // this.scene.load.start();
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

    // protected sceneClick(pointer: Phaser.Input.Pointer) {
    //     if (Tool.checkPointerContains(this, pointer) && this.checkPointerDelection(pointer)) {
    //         this.emit("uiClick");
    //     }
    // }

    // protected uiClick(pointer: Phaser.Input.Pointer) {
    //     if (this.checkPointerDelection(pointer)) {
    //         this.emit("uiClick");
    //     }
    // }

    protected checkPointerDelection(pointer: Phaser.Input.Pointer) {
        if (!this.scene) return true;
        return Math.abs(pointer.downX - pointer.upX) < 10 * this.dpr * this.scale ||
            Math.abs(pointer.downY - pointer.upY) < 10 * this.dpr * this.scale;
    }
}
