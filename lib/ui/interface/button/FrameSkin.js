"use strict";
/*
 * 多帧皮肤
 * @Author: gxm
 * @Date: 2020-03-10 10:51:27
 * @Last Modified by: gxm
 * @Last Modified time: 2020-05-04 23:26:01
 */
Object.defineProperty(exports, "__esModule", { value: true });
const Button_1 = require("../../button/Button");
var SkinEvent;
(function (SkinEvent) {
    SkinEvent["LoadComplete"] = "LOAD_COMPLETE";
    SkinEvent["LoadError"] = "LOAD_ERROR";
    SkinEvent["FileLoadComplete"] = "FILELOADCOMPLETE";
    SkinEvent["Init"] = "INIT";
})(SkinEvent = exports.SkinEvent || (exports.SkinEvent = {}));
class FramesSkin extends Phaser.Events.EventEmitter {
    constructor(scene, skinData) {
        super();
        this.mScene = scene;
        this.setSkinData(skinData);
    }
    /**
     * 切换多帧对象frame
     * @param frameState
     */
    changeFrame(frameState) {
        if (this.mSkinData) {
            this.setSpriteRes(frameState, this.mSkin);
        }
    }
    destroy() {
        if (this.mSkin) {
            this.mSkin.destroy();
            this.mSkin = null;
        }
        super.destroy();
    }
    set x(value) {
        if (this.mSkin) {
            this.mSkin.x = value;
        }
    }
    set y(value) {
        if (this.mSkin) {
            this.mSkin.y = value;
        }
    }
    get skin() {
        return this.mSkin;
    }
    setSkinData(skinData) {
        this.mSkinData = !skinData ? {} : skinData;
        if (this.mSkinData) {
            this.setSpriteRes(Button_1.ButtonState.Normal, this.mSkin);
        }
    }
    setSpriteRes(frameName, sprite) {
        if (!this.mSkinData)
            return;
        const texture_Key = this.mSkinData.key;
        const texture = this.mScene.textures.get(texture_Key);
        const framesObj = texture.frames;
        const textureFrame = framesObj ? framesObj[frameName] : null;
        if (!sprite) {
            if (texture.frameTotal > 1) {
                sprite = this.mScene.make.sprite({ key: undefined }, false);
            }
            else {
                sprite = this.mScene.make.image({ key: undefined }, false);
            }
        }
        if (textureFrame) {
            sprite.setTexture(texture_Key, frameName);
        }
        else {
            // 如果没有写入frame，默认显示"__BASE"第一帧
            sprite.setTexture(texture_Key);
        }
    }
}
exports.FramesSkin = FramesSkin;
