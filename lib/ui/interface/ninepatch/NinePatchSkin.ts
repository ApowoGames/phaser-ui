import { INinePatchSkinData } from "./INinePatchSkinData";
import { NinePatch } from "../../ninepatch/NinePatch";
import { INinePatchConfig } from "./INinePatchConfig";
import { Transform } from "../pos/Transform";
import { Tool } from "../../tool/Tool";

export class NinePatchSkin extends Phaser.Events.EventEmitter {
    private mScene: Phaser.Scene;
    private mSkinData: INinePatchSkinData;
    private mSkin: NinePatch | Phaser.GameObjects.Sprite | Phaser.GameObjects.Image;
    constructor(scene: Phaser.Scene, skinData: INinePatchSkinData) {
        super();
        this.mScene = scene;
        this.setSkinData(skinData);
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

    public setSkinData(skinData: INinePatchSkinData) {
        this.mSkinData = skinData;
        if (this.mSkinData) {
            this.setNinePatchRes(this.mSkinData, this.mSkin);
        }
    }

    public destroy() {
        if (this.mSkin) {
            this.mSkin.destroy();
            this.mSkin = null;
        }
        super.destroy();
    }

    private setNinePatchRes(nineSkinData: INinePatchSkinData, skin: any) {
        if (!nineSkinData) return;
        const skinTransform: Transform = Tool.getTransfrom(nineSkinData);
        const config: INinePatchConfig = {
            transform: nineSkinData.transform,
            skinData: nineSkinData
        };
        if (skinTransform) {
            if (Tool.checkNinePatch(skinTransform.align)) {
                if (!skin) {
                    skin = new NinePatch(this.mScene, config);
                } else {
                    skin.refreshNinePath(config);
                }
            } else {
                const texture_Key: string = this.mSkinData.key;
                const texture: Phaser.Textures.Texture = this.mScene.textures.get(texture_Key);
                const framesObj: {} = texture.frames;
                const frameName = nineSkinData.frame;
                const textureFrame = framesObj ? framesObj[frameName] : null;
                if (!skin) {
                    if (texture.frameTotal > 1) {
                        skin = this.mScene.make.sprite({ key: undefined }, false);
                    } else {
                        skin = this.mScene.make.image({ key: undefined }, false);
                    }
                }
                if (textureFrame) {
                    skin.setTexture(texture_Key, frameName);
                } else {
                    // 如果没有写入frame，默认显示"__BASE"第一帧
                    skin.setTexture(texture_Key);
                }
            }
        }
    }
}