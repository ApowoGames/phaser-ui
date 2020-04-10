import { ISoundConfig } from "../interface/sound/ISoundConfig";
import { IAbstractPanel } from "../interface/panel/IAbstractPanel";
import { ISound } from "../interface/baseUI/ISound";

export class Panel extends Phaser.GameObjects.Container implements IAbstractPanel, ISound {
    public soundMap: Map<string, Phaser.Sound.BaseSound>;
    protected configList: ISoundConfig[];
    protected mShowing: boolean = false;
    protected mInitialized: boolean;
    protected mTweening: boolean = false;
    protected mScene: Phaser.Scene;
    protected mWorld: any;
    protected mWidth: number = 0;
    protected mHeight: number = 0;
    protected mData: any;
    protected mPanelTween: Phaser.Tweens.Tween;
    protected dpr: number;
    private mResources: Map<string, any>;
    private mReLoadResources: Map<string, any>;
    private mReloadTimes: number = 0;
    private mTweenBoo: boolean = true;
    private mMute: boolean = false;
    constructor(scene: Phaser.Scene, world: any, music?: ISoundConfig[]) {
        super(scene);
        this.soundMap = new Map();
        this.mScene = scene;
        this.mWorld = world;
        this.configList = music;
        this.mInitialized = false;
        if (world) {
            this.dpr = Math.round(world.uiRatio || 1);
            this.scale = this.mWorld.uiScaleNew;
        }
    }

    isShow(): boolean {
        return this.mShowing;
    }
    hide() {
        if (!this.mTweening && this.mTweenBoo) {
            this.showTween(false);
        } else {
            this.destroy();
        }
    }

    destroy() {
        if (this.soundMap) {
            this.soundMap.forEach((sound) => {
                if (sound.isPlaying) sound.stop();
            });
        }
        if (this.parentContainer) {
            this.parentContainer.remove(this, true);
        }
        if (this.mPanelTween) {
            this.mPanelTween.stop();
            this.mPanelTween.remove();
        }
        this.mMute = false;
        this.mInitialized = false;
        this.mShowing = false;
        this.mWidth = 0;
        this.mHeight = 0;
        this.mReloadTimes = 0;
        this.mPanelTween = null;
        this.offLoad();
        super.destroy();
    }

    resize(wid: number, hei: number) {
    }

    show(param?: any) {
        this.mData = param;
        if (!this.mInitialized) {
            this.preload();
            return;
        }
        if (this.mShowing) return;
        if (this.configList && this.configList[0]) this.playSound(this.configList[0]);
        if (!this.mTweening && this.mTweenBoo) {
            this.showTween(true);
        } else {
            this.mShowing = true;
        }
    }

    tweenView(show: boolean) {
    }

    setTween(boo: boolean) {
        this.mTweenBoo = boo;
    }

    update(param: any) {
    }

    public playSound(config: ISoundConfig) {
        if (this.mMute) return;
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
        if (this.mMute) return;
        const key = config.key;
        let sound: Phaser.Sound.BaseSound = this.soundMap.get(key);
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

    protected showTween(show: boolean) {
        this.mTweening = true;
        this.scaleX = show ? 0 : this.mWorld.uiScale;
        this.scaleY = show ? 0 : this.mWorld.uiScale;
        const scale: number = show ? this.mWorld.uiScale : 0;
        if (this.mPanelTween) {
            this.mPanelTween.stop();
        }
        this.mPanelTween = this.mScene.tweens.add({
            targets: this,
            duration: 200,
            ease: "Linear",
            props: {
                scaleX: { value: scale },
                scaleY: { value: scale },
            },
            onComplete: () => {
                this.tweenComplete(show);
            },
            onCompleteParams: [this]
        });
    }

    protected tweenComplete(show: boolean) {
        this.mTweening = false;
        this.mPanelTween.stop();
        if (!show) {
            this.mShowing = false;
            this.destroy();
        } else {
            this.mShowing = true;
        }
    }

    protected init() {
        this.mInitialized = true;
        if (this.mResources) {
            this.mResources.clear();
            this.mResources = null;
        }
        this.show(this.mData);
    }

    protected addAtlas(key: string, texture: string, data: string) {
        if (!this.mResources) {
            this.mResources = new Map();
        }
        this.mResources.set(key, {
            dpr: this.dpr,
            type: "atlas",
            texture,
            data
        });
    }

    protected preload() {
        if (!this.mScene) {
            // Logger.getInstance().error("scene does not exist");
            return;
        }
        if (this.mResources) {
            this.mResources.forEach((resource, key) => {
                this.addResources(key, resource);
            }, this);
        }
        this.startLoad();
    }

    protected loadComplete(loader: Phaser.Loader.LoaderPlugin, totalComplete: integer, totalFailed: integer) {
        if (this.mInitialized) {
            return;
        }
        if (totalFailed > 0 && this.mResources && this.mResources.size > 0) {
            this.reload();
            return;
        }
        this.offLoad();
        this.init();
    }

    protected loadError(file: Phaser.Loader.File) {
        if (!this.mResources) {
            return;
        }
        const resource = this.mResources.get(file.key);
        if (!resource) {
            return;
        }
        resource.dpr = 2;
        if (!this.mReLoadResources) {
            this.mReLoadResources = new Map();
        }
        this.mReLoadResources.set(file.key, resource);
    }

    protected onFileKeyComplete(key: string) {
        if (!this.mResources) {
            return;
        }
        if (this.mResources.has(key)) {
            this.mResources.delete(key);
        }
    }

    protected addResources(key: string, resource: any) {
        // TODO Add IResource interface
        if (!this.scene) {
            return;
        }
        // TODO add load type
        // if (resource.data) this.scene.load.atlas(key, Url.getUIRes(resource.dpr, resource.texture), Url.getUIRes(resource.dpr, resource.data));
    }

    private reload() {
        if (!this.mReLoadResources || this.mReLoadResources.size <= 0) {
            return;
        }
        if (++this.mReloadTimes > 1) {
            return;
        }
        this.mReLoadResources.forEach((resource, key) => {
            this.addResources(key, resource);
        }, this);
        this.startLoad();
    }

    private startLoad() {
        if (!this.scene) {
            return;
        }
        this.scene.load.on(Phaser.Loader.Events.FILE_KEY_COMPLETE, this.onFileKeyComplete, this);
        this.scene.load.once(Phaser.Loader.Events.COMPLETE, this.loadComplete, this);
        this.scene.load.on(Phaser.Loader.Events.FILE_LOAD_ERROR, this.loadError, this);
        this.scene.load.start();
    }

    private offLoad() {
        if (!this.scene) {
            return;
        }
        this.scene.load.off(Phaser.Loader.Events.FILE_KEY_COMPLETE, this.onFileKeyComplete, this);
        this.scene.load.off(Phaser.Loader.Events.COMPLETE, this.loadComplete, this);
        this.scene.load.off(Phaser.Loader.Events.FILE_LOAD_ERROR, this.loadError, this);
    }
}
