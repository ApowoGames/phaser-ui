/*
 * 多帧皮肤
 * @Author: gxm
 * @Date: 2020-03-10 10:51:27
 * @Last Modified by: gxm
 * @Last Modified time: 2020-03-12 20:09:20
 */

import { ResourceData } from "../baseUI/resourceData";
import { ButtonState } from "../../button/button";
export enum SkinEvent {
    LoadComplete = "LOAD_COMPLETE",
    LoadError = "LOAD_ERROR",
    FileLoadComplete = "FILELOADCOMPLETE",
    Init = "INIT",
}
export class FramesSkin extends Phaser.Events.EventEmitter {
    protected mSkinData: ResourceData;
    protected mSprite: Phaser.GameObjects.Sprite;
    protected mScene: Phaser.Scene;
    constructor(scene: Phaser.Scene, skinData: ResourceData) {
        super();
        this.mScene = scene;
        this.setSkinData(skinData);
    }

    /**
     * 切换多帧对象frame
     * @param frameState
     */
    public changeFrame(frameState: string) {
        if (this.mSkinData) {
            this.setSpriteRes(frameState, this.mSprite);
        }
    }

    public destroy() {
        if (this.mSprite) {
            this.mSprite.destroy();
            this.mSprite = null;
        }
        super.destroy();
    }

    public set x(value: number) {
        if (this.mSprite) {
            this.mSprite.x = value;
        }
    }

    public set y(value: number) {
        if (this.mSprite) {
            this.mSprite.y = value;
        }
    }

    public get skin(): Phaser.GameObjects.Sprite {
        return this.mSprite;
    }

    public setSkinData(skinData: ResourceData) {
        this.mSkinData = !skinData ? {} : skinData;
        if (this.mSkinData) {
            this.setSpriteRes(ButtonState.Normal, this.mSprite);
        }
    }

    private setSpriteRes(frameName: string, sprite: Phaser.GameObjects.Sprite) {
        if (!this.mSkinData) return;
        const texture_Key: string = this.mSkinData.key;
        const framesObj: {} = this.mScene.textures.get(texture_Key).frames;
        const textureFrame = framesObj ? framesObj[frameName] : null;
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
