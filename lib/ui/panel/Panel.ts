import { ISoundGroup } from "../interface/sound/ISoundConfig";
import { IAbstractPanel } from "../interface/panel/IAbstractPanel";
import { Tool } from "../tool/Tool";
import { BaseUI } from "../baseUI/BaseUI";
import { UIType } from "../interface/baseUI/UIType";

export class Panel extends BaseUI implements IAbstractPanel {
    public id: number;
    public UIType: UIType;
    protected soundGroup: ISoundGroup;
    /**
     * 是否正在加载中，加载中的ui不走show流程
     */
    protected mPreLoad: boolean = false;
    protected mTweening: boolean = false;
    protected mWorld: any;
    protected mPanelTween: Phaser.Tweens.Tween;
    protected mResources: Map<string, any>;
    protected mReLoadResources: Map<string, any>;
    protected mReloadTimes: number = 0;
    protected mTweenBoo: boolean = true;
    protected mMute: boolean = false;
    protected mEnabled: boolean = true;
    protected mFollow: any;
    constructor(scene: Phaser.Scene, world: any, music?: ISoundGroup) {
        super(scene, world.dpr, world.uiScaleNew);
        this.soundMap = new Map();
        this.scene = scene;
        this.mWorld = world;
        this.soundGroup = music;
        this.mInitialized = false;
        this.setTween(false);
    }

    public addListen() {
        if (!this.mInitialized) return;
        super.addListen();
    }

    public removeListen() {
        if (!this.mInitialized) return;
        super.removeListen();
    }

    public setFollow(gameObject: any, froscene: Phaser.Scene, posFunc?: Function) {
        this.mFollow = gameObject;
        this.mFroscene = froscene;
        if (posFunc) this.posFunc = posFunc;
    }

    isShow(): boolean {
        return this.mShow;
    }
    hide() {
        if (this.soundGroup && this.soundGroup.close) this.playSound(this.soundGroup.close);
        if (!this.mTweening && this.mTweenBoo) {
            this.showTween(false);
        } else {
            this.destroy();
        }
    }

    destroy() {
        if (this.container && this.container.parentContainer) {
            this.container.parentContainer.remove(this.container, true);
        }
        if (this.mPanelTween) {
            this.mPanelTween.stop();
            this.mPanelTween.remove();
        }
        this.mMute = false;
        this.mInitialized = false;
        this.mShow = false;
        this.width = 0;
        this.height = 0;
        this.mReloadTimes = 0;
        this.mPanelTween = null;
        this.offLoad();
        super.destroy();
    }

    resize(wid?: number, hei?: number) {
    }

    show(param?: any) {
        this.data = param;
        if (this.mPreLoad) return;
        if (!this.mInitialized) {
            this.preload();
            return;
        }
        if (this.mShow) return;
        if (this.soundGroup && this.soundGroup.open) this.playSound(this.soundGroup.open);
        if (!this.mTweening && this.mTweenBoo) {
            this.showTween(true);
        } else {
            this.mShow = true;
        }
        this.addListen();
    }

    update(param?: any) {
        this.data = param;
    }

    tweenExpand(tweenBoo: boolean) {
    }

    setTween(boo: boolean) {
        this.mTweenBoo = boo;
    }

    get interactive(): boolean {
        return this.mEnabled;
    }

    protected showTween(show: boolean) {
        this.mTweening = true;
        const scale: number = show ? this.scale : 0;
        this.container.scale = scale;
        if (this.mPanelTween) {
            this.mPanelTween.stop();
        }
        this.mPanelTween = this.scene.tweens.add({
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
        this.mShow = show;
        if (!show) {
            this.destroy();
        }
    }

    protected init() {
        this.mInitialized = true;
        if (this.mResources) {
            this.mResources.clear();
            this.mResources = null;
        }
        this.show(this.data);
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
        this.mPreLoad = true;
        if (!this.scene) {
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
        this.mPreLoad = false;
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

    protected reload() {
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

    protected startLoad() {
        if (!this.scene) {
            return;
        }
        this.scene.load.on(Phaser.Loader.Events.FILE_KEY_COMPLETE, this.onFileKeyComplete, this);
        this.scene.load.once(Phaser.Loader.Events.COMPLETE, this.loadComplete, this);
        this.scene.load.on(Phaser.Loader.Events.FILE_LOAD_ERROR, this.loadError, this);
        this.scene.load.start();
    }

    protected offLoad() {
        if (!this.scene) {
            return;
        }
        this.scene.load.off(Phaser.Loader.Events.FILE_KEY_COMPLETE, this.onFileKeyComplete, this);
        this.scene.load.off(Phaser.Loader.Events.COMPLETE, this.loadComplete, this);
        this.scene.load.off(Phaser.Loader.Events.FILE_LOAD_ERROR, this.loadError, this);
    }

    protected sceneClick(pointer: Phaser.Input.Pointer) {
        if (Tool.checkPointerContains(this.container, pointer) && this.checkPointerDelection(pointer)) {
            this.emit("panelClick", pointer);
        }
    }

    protected uiClick(pointer: Phaser.Input.Pointer) {
        if (this.checkPointerDelection(pointer)) {
            this.emit("panelClick", pointer);
        }
    }
}
