"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NinePatchSkin extends Phaser.Events.EventEmitter {
    constructor(scene, skinData) {
        super();
        this.mScene = scene;
        this.setSkinData(skinData);
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
        this.mSkinData = skinData;
        if (this.mSkinData) {
            this.setNinePatchRes(this.mSkinData, this.mSkin);
        }
    }
    destroy() {
        if (this.mSkin) {
            this.mSkin.destroy();
            this.mSkin = null;
        }
        super.destroy();
    }
    setNinePatchRes(nineSkinData, skin) {
        // if (!nineSkinData) return;
        // const skinTransform: Transform = Tool.getTransfrom(nineSkinData);
        // const config: INinePatchConfig = {
        //     // transform: nineSkinData.transform,
        //     skinData: nineSkinData
        // };
        // if (skinTransform) {
        //     if (Tool.checkNinePatch(skinTransform.align)) {
        //         if (!skin) {
        //             skin = new NinePatch(this.mScene, config);
        //         } else {
        //             skin.refreshNinePath(config);
        //         }
        //     } else {
        //         const texture_Key: string = this.mSkinData.key;
        //         const texture: Phaser.Textures.Texture = this.mScene.textures.get(texture_Key);
        //         const framesObj: {} = texture.frames;
        //         const frameName = nineSkinData.frame;
        //         const textureFrame = framesObj ? framesObj[frameName] : null;
        //         if (!skin) {
        //             if (texture.frameTotal > 1) {
        //                 skin = this.mScene.make.sprite({ key: undefined }, false);
        //             } else {
        //                 skin = this.mScene.make.image({ key: undefined }, false);
        //             }
        //         }
        //         if (textureFrame) {
        //             skin.setTexture(texture_Key, frameName);
        //         } else {
        //             // 如果没有写入frame，默认显示"__BASE"第一帧
        //             skin.setTexture(texture_Key);
        //         }
        //     }
        // }
    }
}
exports.NinePatchSkin = NinePatchSkin;
