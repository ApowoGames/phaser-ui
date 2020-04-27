/*
 * 多帧皮肤
 * @Author: gxm
 * @Date: 2020-03-10 10:51:27
 * @Last Modified by: gxm
 * @Last Modified time: 2020-04-27 16:11:29
 */

import { ResourceData } from "../baseUI/ResourceData";
import { ButtonState } from "../../button/NewButton";
export enum SkinEvent {
    LoadComplete = "LOAD_COMPLETE",
    LoadError = "LOAD_ERROR",
    FileLoadComplete = "FILELOADCOMPLETE",
    Init = "INIT",
}
export class FramesSkin extends Phaser.Events.EventEmitter {
    protected mSkinData: ResourceData;
    protected mSkin: Phaser.GameObjects.Sprite | Phaser.GameObjects.Image;
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
            this.setSpriteRes(frameState, this.mSkin);
        }
    }

    public destroy() {
        if (this.mSkin) {
            this.mSkin.destroy();
            this.mSkin = null;
        }
        super.destroy();
    }

    public set x(value: number) {
        if (this.mSkin) {
            this.mSkin.x = value;
        }
    }

    public set y(value: number) {
        if (this.mSkin) {
            this.mSkin.y = value;
        }
    }

    public get skin(): any {
        return this.mSkin;
    }

    public setSkinData(skinData: ResourceData) {
        this.mSkinData = !skinData ? {} : skinData;
        if (this.mSkinData) {
            this.setSpriteRes(ButtonState.Normal, this.mSkin);
        }
    }

    private setSpriteRes(frameName: string, sprite: Phaser.GameObjects.Sprite | Phaser.GameObjects.Image) {
        if (!this.mSkinData) return;
        const texture_Key: string = this.mSkinData.key;
        const texture: Phaser.Textures.Texture = this.mScene.textures.get(texture_Key);
        const framesObj: {} = texture.frames;
        const textureFrame = framesObj ? framesObj[frameName] : null;
        if (!sprite) {
            if (texture.frameTotal > 1) {
                sprite = this.mScene.make.sprite({ key: undefined }, false);
            } else {
                sprite = this.mScene.make.image({ key: undefined }, false);
            }
        }
        if (textureFrame) {
            sprite.setTexture(texture_Key, frameName);
        } else {
            // 如果没有写入frame，默认显示"__BASE"第一帧
            sprite.setTexture(texture_Key);
        }
    }

}
