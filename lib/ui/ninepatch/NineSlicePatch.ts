import { IPatchesConfig, normalizePatchesConfig } from "../interface/baseUI/Patches.config";
import { INinePatchConfig } from "../interface/ninepatch/INinePatchConfig";
import { Tool } from "../tool/Tool";
import { Transform } from "../interface/pos/Transform";
import { INinePatchSkinData } from "../interface/ninepatch/INinePatchSkinData";
import { Align } from "../interface/pos/Align";
import { BaseUI } from "../baseUI/BaseUI";

const GetValue = Phaser.Utils.Objects.GetValue;
export class NineSlicePatch extends BaseUI {
    private static readonly __BASE: string = "__BASE";
    private static patches: string[] = ["[0][0]", "[1][0]", "[2][0]", "[0][1]", "[1][1]", "[2][1]", "[0][2]", "[1][2]", "[2][2]"];
    protected originTexture: Phaser.Textures.Texture;
    protected originFrame: Phaser.Textures.Frame;
    protected patchesConfig: IPatchesConfig;
    protected finalXs: number[];
    protected finalYs: number[];
    protected internalTint: number;
    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        width: number,
        height: number,
        key: string, frame: string | number,
        config?: IPatchesConfig) {
        super(scene);
        this.patchesConfig = config;
        config = config || this.scene.cache.custom.ninePatch.get(frame ? `${frame}` : key);
        normalizePatchesConfig(config);
        this.setSize(width, height);
        this.setTexture(key, frame);
    }

    public resize(width: number, height: number) {
        width = Math.round(width);
        height = Math.round(height);
        if (!this.patchesConfig) {
            return this;
        }
        if (this.width === width && this.height === height) {
            return this;
        }
        width = Math.max(width, this.patchesConfig.left + this.patchesConfig.right);
        height = Math.max(height, this.patchesConfig.top + this.patchesConfig.bottom);
        this.setSize(width, height);
        this.drawPatches();
        return;
    }

    public setTexture(key: string, frame?: string | integer): this {
        this.originTexture = this.scene.textures.get(key);
        this.setFrame(frame);
        return this;
    }

    public setFrame(frame: string | integer): this {
        this.originFrame = (this.originTexture.frames as any)[frame] || (this.originTexture.frames as any)[NineSlicePatch.__BASE];
        this.createPatches();
        this.drawPatches();
        return this;
    }

    public setSize(width: number, height: number): this {
        this.width = width;
        this.height = height;
        super.setSize(width, height);
        this.finalXs = [0, this.patchesConfig.left, this.width - this.patchesConfig.right, this.width];
        this.finalYs = [0, this.patchesConfig.top, this.height - this.patchesConfig.bottom, this.height];
        return this;
    }

    public setTint(tint: number): this {
        this.tint = tint;
        return this;
    }

    public setTintFill(tint: number): this {
        this.tint = tint;
        this.tintFill = true;
        return this;
    }

    public get tintFill(): boolean {
        return this.first && (this.first as Phaser.GameObjects.Image).tintFill;
    }

    public set tintFill(value: boolean) {
        this.each((patch: Phaser.GameObjects.Image) => patch.tintFill = value);
    }

    public set tint(value: number) {
        this.each((patch: Phaser.GameObjects.Image) => patch.setTint(value));
        this.internalTint = value;
    }

    public get isTinted(): boolean {
        return this.first && (this.first as Phaser.GameObjects.Image).isTinted;
    }

    public clearTint() {
        this.each((patch: Phaser.GameObjects.Image) => patch.clearTint());
    }

    protected createPatches(): void {
        // The positions we want from the base texture
        const textureXs: number[] = [0, this.patchesConfig.left, this.originFrame.width - this.patchesConfig.right, this.originFrame.width];
        const textureYs: number[] = [0, this.patchesConfig.top, this.originFrame.height - this.patchesConfig.bottom, this.originFrame.height];
        let patchIndex: number = 0;
        for (let yi: number = 0; yi < 3; yi++) {
            for (let xi: number = 0; xi < 3; xi++) {
                this.createPatchFrame(
                    this.getPatchNameByIndex(patchIndex),
                    textureXs[xi], // x
                    textureYs[yi], // y
                    textureXs[xi + 1] - textureXs[xi], // width
                    textureYs[yi + 1] - textureYs[yi] // height
                );
                ++patchIndex;
            }
        }
    }

    protected drawPatches(): void {
        const tintFill = this.tintFill;
        this.removeAll(true);
        let patchIndex = 0;
        for (let yi = 0; yi < 3; yi++) {
            for (let xi = 0; xi < 3; xi++) {
                const patch: Phaser.Textures.Frame = this.originTexture.frames[this.getPatchNameByIndex(patchIndex)];
                const patchImg = new Phaser.GameObjects.Image(this.scene, 0, 0, patch.texture.key, patch.name);
                patchImg.setOrigin(0);
                patchImg.setPosition(this.finalXs[xi] - this.width * this.originX, this.finalYs[yi] - this.height * this.originY);
                patchImg.setScale(
                    (this.finalXs[xi + 1] - this.finalXs[xi]) / patch.width,
                    (this.finalYs[yi + 1] - this.finalYs[yi]) / patch.height
                );
                this.add(patchImg);
                patchImg.setTint(this.internalTint);
                patchImg.tintFill = tintFill;
                ++patchIndex;
            }
        }
    }

    protected createPatchFrame(patch: string, x: number, y: number, width: number, height: number) {
        if (this.originTexture.frames.hasOwnProperty(patch)) {
            return;
        }
        this.originTexture.add(patch, this.originFrame.sourceIndex, this.originFrame.cutX + x, this.originFrame.cutY + y, width, height);
    }

    protected getPatchNameByIndex(index: number): string {
        return `${this.originFrame.name}|${NineSlicePatch.patches[index]}`;
    }
}
