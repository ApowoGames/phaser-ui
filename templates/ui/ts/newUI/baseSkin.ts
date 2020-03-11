/*
 * 多帧皮肤
 * @Author: gxm
 * @Date: 2020-03-10 10:51:27
 * @Last Modified by: gxm
 * @Last Modified time: 2020-03-10 11:09:24
 */

import { IFramesSkinData, ResourceData } from "../interface/IUISkin";
import { ButtonState } from "./button";
export enum SkinEvent {
    LoadComplete = "LOAD_COMPLETE",
    LoadError = "LOAD_ERROR",
    FileLoadComplete = "FILELOADCOMPLETE",
    Init = "INIT",
}
export class FramesSkin extends Phaser.Events.EventEmitter {
    protected mSkinData: IFramesSkinData;
    protected mBgSprite: Phaser.GameObjects.Sprite;
    protected mIconSprite: Phaser.GameObjects.Sprite;
    protected mScene: Phaser.Scene;
    protected mInitialized: boolean = false;
    protected mReloadTimes: number = 0;
    /**
     * 资源加载map
     */
    protected mResourceMap: Map<string, ResourceData>;
    /**
     * 资源重加载map
     */
    protected mReLoadResMap: Map<string, ResourceData>;
    constructor(scene: Phaser.Scene, skinData: IFramesSkinData) {
        super();
        this.mScene = scene;
        this.mInitialized = false;
        this.setSkinData(skinData);
    }

    public addResources(resource: ResourceData) {
        if (!this.mResourceMap) {
            this.mResourceMap = new Map();
        }
        this.mResourceMap.set(resource.key, resource);
    }
    /**
     * 切换多帧对象frame
     * @param frameState
     */
    public changeFrame(frameState: string) {
        if (this.mSkinData.background) this.setSpriteRes(frameState, this.mBgSprite);
        if (this.mSkinData.icon) this.setSpriteRes(frameState, this.mIconSprite);
    }

    public get BackGround(): Phaser.GameObjects.Sprite {
        return this.mBgSprite;
    }

    public get Icon(): Phaser.GameObjects.Sprite {
        return this.mIconSprite;
    }

    public destroy() {
        if (this.mBgSprite) {
            this.mBgSprite.destroy();
            this.mBgSprite = null;
        }
        if (this.mIconSprite) {
            this.mIconSprite.destroy();
            this.mIconSprite = null;
        }
        if (this.mSkinData) {
            if (this.mSkinData.background) this.mSkinData.background = null;
            if (this.mSkinData.icon) this.mSkinData.icon = null;
            this.mSkinData = null;
        }
        if (this.mResourceMap) {
            this.mResourceMap.clear();
            this.mResourceMap = null;
        }
        if (this.mReLoadResMap) {
            this.mReLoadResMap.clear();
            this.mReLoadResMap = null;
        }
        this.mInitialized = false;
        this.mReloadTimes = 0;
        super.destroy();
    }

    public preload() {
        if (!this.mScene) {
            return;
        }
        if (this.mSkinData.background) {
            this.addResources(this.mSkinData.background);
        }
        if (this.mSkinData.icon) {
            this.addResources((this.mSkinData.icon));
        }
        this.startLoad();
    }

    public get skin(): Phaser.GameObjects.Sprite {
        return this.mBgSprite;
    }

    public setSkinData(skinData: IFramesSkinData) {
        this.mSkinData = skinData;
    }

    protected loadComplete(loader: Phaser.Loader.LoaderPlugin, totalComplete: integer, totalFailed: integer) {
        if (this.mInitialized) {
            return;
        }
        if (totalFailed > 0) {
            this.reload();
            return;
        }
        this.offLoad();
        this.emit(SkinEvent.LoadComplete);
        this.init();
    }

    protected loadError(file: Phaser.Loader.File) {
        if (!this.mResourceMap) {
            return;
        }
        const resource = this.mResourceMap.get(file.key);
        if (!resource) {
            return;
        }
        // resource.dpr = 2; 加载失败后加载2X资源的特殊处理暂时屏蔽
        if (!this.mReLoadResMap) {
            this.mReLoadResMap = new Map();
        }
        this.mReLoadResMap.set(file.key, resource);
        this.emit(SkinEvent.LoadError);
    }

    protected onFileKeyComplete(key: string) {
        if (!this.mResourceMap) {
            return;
        }
        if (this.mResourceMap.has(key)) {
            this.mResourceMap.delete(key);
            this.emit(SkinEvent.FileLoadComplete, key);
        }
    }
    protected init() {
        this.mInitialized = true;
        if (this.mResourceMap) {
            this.mResourceMap.clear();
            this.mResourceMap = null;
        }
        if (this.mReLoadResMap) {
            this.mReLoadResMap.clear();
            this.mReLoadResMap = null;
        }
        if (this.mSkinData.background) this.setSpriteRes(ButtonState.Normal, this.mBgSprite);
        if (this.mSkinData.icon) this.setSpriteRes(ButtonState.Normal, this.mIconSprite);
        this.emit(SkinEvent.Init);
    }

    protected startLoad() {
        if (!this.mScene) {
            return;
        }
        this.mScene.load.on(Phaser.Loader.Events.FILE_KEY_COMPLETE, this.onFileKeyComplete, this);
        this.mScene.load.once(Phaser.Loader.Events.COMPLETE, this.loadComplete, this);
        this.mScene.load.once(Phaser.Loader.Events.FILE_LOAD_ERROR, this.loadError, this);
        this.mScene.load.start();
    }

    private reload() {
        if (!this.mReLoadResMap || this.mReLoadResMap.size <= 0) {
            return;
        }
        if (++this.mReloadTimes > 1) {
            return;
        }
        this.mReLoadResMap.forEach((resource) => {
            this.addResources(resource);
        }, this);
        this.startLoad();
    }

    private offLoad() {
        if (!this.mScene) {
            return;
        }
        this.mScene.load.off(Phaser.Loader.Events.FILE_KEY_COMPLETE, this.onFileKeyComplete, this);
        this.mScene.load.off(Phaser.Loader.Events.COMPLETE, this.loadComplete, this);
        this.mScene.load.off(Phaser.Loader.Events.FILE_LOAD_ERROR, this.loadError, this);
    }

    private setSpriteRes(frameName: string, sprite: Phaser.GameObjects.Sprite) {
        const texture_Key: string = this.mSkinData.background.key;
        const normal_Frame: string = texture_Key + "_" + frameName;
        const framesObj: {} = this.mScene.textures.get(texture_Key).frames;
        const texture = framesObj[normal_Frame];
        if (!sprite) {
            sprite = this.mScene.make.sprite({ key: undefined }, false);
        }
        if (texture) {
            sprite.setTexture(texture_Key, normal_Frame);
        } else {
            // 如果没有写入frame，默认显示"__BASE"第一帧
            sprite.setTexture(texture_Key);
        }
    }

}
