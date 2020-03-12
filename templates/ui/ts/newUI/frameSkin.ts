/*
 * 多帧皮肤
 * @Author: gxm
 * @Date: 2020-03-10 10:51:27
 * @Last Modified by: gxm
 * @Last Modified time: 2020-03-12 16:00:57
 */

import { ButtonState } from "./button";
import { IFramesSkinData } from "../interface/iFramesSkinData";
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
    constructor(scene: Phaser.Scene, skinData: IFramesSkinData) {
        super();
        this.mScene = scene;
        this.setSkinData(skinData);
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
        super.destroy();
    }

    public get skin(): Phaser.GameObjects.Sprite {
        return this.mBgSprite;
    }

    public setSkinData(skinData: IFramesSkinData) {
        this.mSkinData = skinData;
        if (this.mSkinData.background) this.setSpriteRes(ButtonState.Normal, this.mBgSprite);
        if (this.mSkinData.icon) this.setSpriteRes(ButtonState.Normal, this.mIconSprite);
    }
    private setSpriteRes(frameName: string, sprite: Phaser.GameObjects.Sprite) {
        const texture_Key: string = this.mSkinData.background.key;
        const framesObj: {} = this.mScene.textures.get(texture_Key).frames;
        const textureFrame = framesObj[frameName];
        if (!sprite) {
            sprite = this.mScene.make.sprite({ key: undefined }, false);
        }
        if (textureFrame) {
            sprite.setTexture(texture_Key, frameName);
        } else {
            // 如果没有写入frame，默认显示"__BASE"第一帧
            sprite.setTexture(texture_Key);
        }
    }

}
