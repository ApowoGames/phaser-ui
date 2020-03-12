import { INinePatchSkinData } from "../interface/iNinePatchSkinData";
import { INinePatchConfig } from "../interface/iNinePatchConfig";
import { Align } from "../interface/align";
import { Transform } from "../interface/transform";
import { Tool } from "../tool/tool";

const RenderTexture = Phaser.GameObjects.RenderTexture;
const GetValue = Phaser.Utils.Objects.GetValue;
export enum NinePatchType {
    Top,
    Bottom,
    Middle,
    Right,
    Left,
}
export class NinePatch extends RenderTexture {
    private mSkinData: INinePatchSkinData;
    private mScene: Phaser.Scene;
    constructor(scene: Phaser.Scene, config: INinePatchConfig) {
        const transform: Transform  = !config ? undefined : config.transform;
        const align: Align = transform.align;
        super(scene);
        this.mScene = scene;
        this.x = Tool.getPos(transform).x;
        this.y = Tool.getPos(transform).y;
        this.mSkinData = config.skinsData;
        this.init();
    }

    private init() {
        const texture_Key: string = this.mSkinData.key;
        const framesObj: {} = this.mScene.textures.get(texture_Key).frames;
        for (const key in this.mSkinData.frameObj) {
            const textureFrame = framesObj[key];

        }

        // if (!sprite) {
        //     sprite = this.mScene.make.sprite({ key: undefined }, false);
        // }
        // if (textureFrame) {
        //     sprite.setTexture(texture_Key, frameName);
        // } else {
        //     // 如果没有写入frame，默认显示"__BASE"第一帧
        //     sprite.setTexture(texture_Key);
        // }
        // const framesObject = this.mSkinsData.frameObj;
        // for (const key in framesObject) {

        // }
        // this.drawFrame(this.mSkinsData.key, frames[i], x, y);
        // for (let i: number = 0, len = this.mSkinsDataList.length; i < len; i++) {

        // }
    }
}