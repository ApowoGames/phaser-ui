import { NineSlicePatch } from "../ninepatch/NineSlicePatch";
import { IButtonState } from "../interface/button/IButtonState";
import { IPatchesConfig } from "../interface/baseUI/Patches.config";
import { ISoundGroup } from "../interface/sound/ISoundConfig";
import { Button } from "./Button";

export class NineSliceButton extends Button implements IButtonState {
    protected btnData: any;
    protected config: IPatchesConfig;
    constructor(scene: Phaser.Scene, x: number, y: number, width: number, height: number, key: string, frame: string, text?: string, dpr?: number, scale?: number, config?: IPatchesConfig, music?: ISoundGroup, data?: any) {
        super(scene, key, frame, frame, text, music, dpr, scale, {
            width,
            height,
            configlist: [config]
        });
        this.x = x;
        this.y = y;
        if (data) {
            this.btnData = data;
        }
    }

    public set enable(value) {
        if (value) {
            this.mBackground.clearTint();
            if (this.mText) this.mText.clearTint();
            this.setInteractive();
        } else {
            this.mBackground.setTintFill(0x666666);
            if (this.mText) this.mText.setTintFill(0x777777);
            this.removeInteractive();
        }
    }

    public getBtnData(): any {
        return this.btnData;
    }
    protected createBackground() {
        this.mFrame = this.mFrame ? this.mFrame : "__BASE";
        this.initFrame();
        const config: IPatchesConfig = this.ninePatchConfig.configlist[0];
        const width = this.ninePatchConfig.width;
        const height = this.ninePatchConfig.height;
        this.mBackground = new NineSlicePatch(this.scene, 0, 0, width, height, this.mKey, this.mFrame, { left: config.left, top: config.top, right: config.right, bottom: config.bottom }, this.dpr, 1);
        this.add(this.mBackground);
        this.setSize(width, height);
    }

    protected isExists(frame: string) {
        const originTexture = this.scene.textures.get(this.mKey);
        if (originTexture && originTexture.has(frame)) return true;
        return false;
    }

    private initFrame() {
        const frame = this.mFrame ? this.mFrame : this.mKey;
        this.mFrame = `${frame}_normal`;
        if (!this.isExists(this.mFrame)) {
            this.mFrame = frame;
        }
        this.mDownFrame = `${frame}_down`;
        if (!this.isExists(this.mDownFrame)) {
            this.mDownFrame = this.mFrame;
        }
        return this.mFrame;
    }
}
