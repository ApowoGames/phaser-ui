import { IPatchesConfig, normalizePatchesConfig } from "../interface/baseUI/Patches.config";
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
        config?: IPatchesConfig, dpr?: number, scale?: number) {
        super(scene, dpr, scale);
        this.dpr = dpr || 1;
        this.scale = scale || 1;
        this.patchesConfig = { top: 0, left: 0, right: 0, bottom: 0 };
        this.setConfig(config);
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
        // width = Math.max(width, this.patchesConfig.left + this.patchesConfig.right);
        // height = Math.max(height, this.patchesConfig.top + this.patchesConfig.bottom);
        this.setSize(width, height);
        this.drawPatches();
        return;
    }

    public getConfig(): IPatchesConfig {
        return this.patchesConfig;
    }

    public setConfig(config: IPatchesConfig) {
        Object.assign(this.patchesConfig, config);
        this.patchesConfig.top = Math.round(this.patchesConfig.top);
        if (this.patchesConfig.right) this.patchesConfig.right = Math.round(this.patchesConfig.right);
        if (this.patchesConfig.bottom) this.patchesConfig.bottom = Math.round(this.patchesConfig.bottom);
        if (this.patchesConfig.left) this.patchesConfig.left = Math.round(this.patchesConfig.left);
        normalizePatchesConfig(config);
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
        super.setSize(width, height);
        const right: number = this.width - this.patchesConfig.right > 0 ? this.width - this.patchesConfig.right : this.patchesConfig.right;
        const bottom: number = this.height - this.patchesConfig.bottom > 0 ? this.height - this.patchesConfig.bottom : this.patchesConfig.right;
        this.finalXs = [0, this.patchesConfig.left, right, this.width];
        this.finalYs = [0, this.patchesConfig.top, bottom, this.height];
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
        this.internalTint = undefined;
        this.tintFill = false;
    }

    protected createPatches(): void {
        // The positions we want from the base texture
        // 保存有x轴和y轴9宫坐标信息，如果存在坐标信息相同，则表示某一部分的图片尺寸为0，需要查看原因
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
            // 当缩放后的尺寸小于初始尺寸，中间缩放部分肯定为0，则对1，2两行不做处理
            if (this.height < this.patchesConfig.bottom + this.patchesConfig.top && yi === 1) {
                continue;
            }
            for (let xi = 0; xi < 3; xi++) {
                // 当缩放后的尺寸小于初始尺寸，中间缩放部分肯定为0，则对1，2两列不做处理
                if (this.width < this.patchesConfig.left + this.patchesConfig.right && xi === 1) {
                    continue;
                }
                const patch: Phaser.Textures.Frame = this.originTexture.frames[this.getPatchNameByIndex(patchIndex)];
                const patchImg = new Phaser.GameObjects.Image(this.scene, 0, 0, patch.texture.key, patch.name);
                patchImg.setOrigin(0);
                patchImg.setPosition(
                    (this.finalXs[xi] * 1000 - this.width * this.originX * 1000) / 1000,
                    (this.finalYs[yi] * 1000 - this.height * this.originY * 1000) / 1000
                );
                // let widScale: number = (this.finalXs[xi + 1] - this.finalXs[xi]) / patch.width;
                // let heiScale: number = (this.finalYs[yi + 1] - this.finalYs[yi]) / patch.height;
                // // 如果缩放后尺寸小于某一部分尺寸，则用当前部分对应计算做缩放，现在处理小于单边尺寸的逻辑是，只用左边和上边做比较处理，当缩放尺寸小于单边尺寸，则只会显示左边和上边的切片资源
                // // 九宫不应该出现缩放尺寸小于单边或者左+右，上+下的情况，以上操作只是为了实现需求
                // if (patch.width > this.width) widScale = this.width / patch.width;
                // if (patch.height > this.height) heiScale = this.height / patch.height;
                // patchImg.setScale(
                //     widScale,
                //     heiScale
                // );
                patchImg.displayWidth = this.finalXs[xi + 1] - this.finalXs[xi];
                patchImg.displayHeight = this.finalYs[yi + 1] - this.finalYs[yi];
                this.add(patchImg);
                if (this.internalTint) patchImg.setTint(this.internalTint);
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

    private calculScale(num0, num1): number {
        return (num1 * num0) / (2 * num1 * (num1 + num0));
    }
}
