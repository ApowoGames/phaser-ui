"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
import Patches_config from "../interface/baseUI/Patches.config";
import BaseUI from "../baseUI/BaseUI";
const GetValue = Phaser.Utils.Objects.GetValue;

/**
 * @class NineSlicePatch
 * @memberof apowophaserui
 * @extends apowophaserui.BaseUI
 * @param {Phaser.Scene} scene
 * @param {number} x
 * @param {number} y
 * @param {number} width
 * @param {number} height
 * @param {string} key
 * @param {string} frame
 * @param {*} [config]
 * @param {number} [dpr]
 * @param {number} [scale]
 * @param {number} [correct]
 */
class NineSlicePatch extends BaseUI {
    constructor(scene, x, y, width, height, key, frame, config, dpr, scale, correct) {
        super(scene, dpr, scale);
        this.mCorrection = 4;
        this.dpr = dpr || 1;
        this.scale = scale || 1;
        this.mCorrection = correct === undefined ? 4 : 0;
        this.patchesConfig = { top: 0, left: 0, right: 0, bottom: 0 };
        this.patchKey = Math.random() * 1000 + "";
        this.setConfig(config);
        this.setSize(width, height);
        this.setTexture(key, frame);
        this.setPosition(x, y);
    }
    /**
     * @method apowophaserui.NineSlicePatch#resize
     * @param {number} width 
     * @param {number} height 
     */
    resize(width, height) {
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
    /**
     * @name apowophaserui.NineSlicePatch#correctValue
     * @type {number}
     */
    set correctValue(value) {
        this.mCorrection = value;
    }
    /**
     * @method apowophaserui.NineSlicePatch#getConfig
     * @type {*}
     * @return {*}
     */
    getConfig() {
        return this.patchesConfig;
    }
    setConfig(config) {
        Object.assign(this.patchesConfig, config);
        this.patchesConfig.top = Math.round(this.patchesConfig.top);
        if (this.patchesConfig.right)
            this.patchesConfig.right = Math.round(this.patchesConfig.right);
        if (this.patchesConfig.bottom)
            this.patchesConfig.bottom = Math.round(this.patchesConfig.bottom);
        if (this.patchesConfig.left)
            this.patchesConfig.left = Math.round(this.patchesConfig.left);
        Patches_config.normalizePatchesConfig(config);
    }
    /**
     * @method apowophaserui.NineSlicePatch#setTexture
     * @param {string} key 
     * @param {string} [frame]
     * @return {*}
     */
    setTexture(key, frame) {
        this.originTexture = this.scene.textures.get(key);
        this.originTexture.setFilter(Phaser.Textures.FilterMode.NEAREST);
        this.setFrame(frame);
        return this;
    }
    /**
     * @method apowophaserui.NineSlicePatch#setFrame
     * @param {string} frame 
     * @return {*}
     */
    setFrame(frame) {
        this.originFrame = this.originTexture.frames[frame] || this.originTexture.frames[NineSlicePatch.__BASE];
        this.createPatches();
        this.drawPatches();
        return this;
    }
    /**
     * @method apowophaserui.NineSlicePatch#setSize
     * @param {number} width 
     * @param {number} height 
     * @return {*}
     */
    setSize(width, height) {
        super.setSize(width, height);
        let tempscalex = this.width / (this.patchesConfig.left + this.patchesConfig.right);
        let tempscaley = this.width / (this.patchesConfig.top + this.patchesConfig.bottom);
        tempscalex = tempscalex >= 1 ? 1 : tempscalex;
        tempscaley = tempscaley >= 1 ? 1 : tempscaley;
        const right = this.width - this.patchesConfig.right > 0 ? this.width - this.patchesConfig.right : this.patchesConfig.right;
        const bottom = this.height - this.patchesConfig.bottom > 0 ? this.height - this.patchesConfig.bottom : this.patchesConfig.right;
        this.finalXs = [0, this.patchesConfig.left * tempscalex, right * tempscalex, this.width];
        this.finalYs = [0, this.patchesConfig.top * tempscaley, bottom * tempscaley, this.height];
        return this;
    }
    /**
     * @method apowophaserui.NineSlicePatch#setTint
     * @param {number} tint 
     * @return {*}
     */
    setTint(tint) {
        this.tint = tint;
        return this;
    }
    /**
     * @method apowophaserui.NineSlicePatch#setTintFill
     * @param {number} tint 
     * @return {*}
     */
    setTintFill(tint) {
        this.tint = tint;
        this.tintFill = true;
        return this;
    }
    /**
     * @name apowophaserui.NineSlicePatch#tintFill
     * @type {boolean}
     * @return {boolean}
     */
    get tintFill() {
        return this.first && this.first.tintFill;
    }
    set tintFill(value) {
        this.each((patch) => patch.tintFill = value);
    }
    /**
     * @name apowophaserui.NineSlicePatch#tint
     * @type {number}
     */
    set tint(value) {
        this.each((patch) => patch.setTint(value));
        this.internalTint = value;
    }
    /**
     * @name apowophaserui.NineSlicePatch#isTinted
     * @return {boolean}
     */
    get isTinted() {
        return this.first && this.first.isTinted;
    }
    /**
     * @method apowophaserui.NineSlicePatch#clearTint
     */
    clearTint() {
        this.each((patch) => patch.clearTint());
        this.internalTint = undefined;
        this.tintFill = false;
    }
    /**
     * @method apowophaserui.NineSlicePatch#destroy
     */
    destroy() {
        if (this.originTexture) {
            let patchIndex = 0;
            for (let yi = 0; yi < 3; yi++) {
                for (let xi = 0; xi < 3; xi++) {
                    const patch = this.getPatchNameByIndex(patchIndex);
                    if (this.originTexture.frames.hasOwnProperty(patch)) {
                        this.originTexture.remove(patch);
                    }
                    ++patchIndex;
                }
            }
        }
        super.destroy();
    }
    /**
     * @method apowophaserui.NineSlicePatch#createPatches
     * @protected
     */
    createPatches() {
        // The positions we want from the base texture
        // 保存有x轴和y轴9宫坐标信息，如果存在坐标信息相同，则表示某一部分的图片尺寸为0，需要查看原因
        const textureXs = [0, this.patchesConfig.left, this.originFrame.width - this.patchesConfig.right, this.originFrame.width];
        const textureYs = [0, this.patchesConfig.top, this.originFrame.height - this.patchesConfig.bottom, this.originFrame.height];
        let patchIndex = 0;
        for (let yi = 0; yi < 3; yi++) {
            for (let xi = 0; xi < 3; xi++) {
                this.createPatchFrame(this.getPatchNameByIndex(patchIndex), textureXs[xi], // x
                    textureYs[yi], // y
                    textureXs[xi + 1] - textureXs[xi], // width
                    textureYs[yi + 1] - textureYs[yi] // height
                );
                ++patchIndex;
            }
        }
    }
    /**
     * @method apowophaserui.NineSlicePatch#drawPatches
     * @protected
     */
    drawPatches() {
        const tintFill = this.tintFill;
        this.removeAll(true);
        let patchIndex = 0;
        for (let yi = 0; yi < 3; yi++) {
            // // 当缩放后的尺寸小于初始尺寸，中间缩放部分肯定为0，则对1，2两行不做处理
            // if (this.height < this.patchesConfig.bottom + this.patchesConfig.top && yi === 1) {
            //     continue;
            // }
            for (let xi = 0; xi < 3; xi++) {
                // // 当缩放后的尺寸小于初始尺寸，中间缩放部分肯定为0，则对1，2两列不做处理
                // if (this.width < this.patchesConfig.left + this.patchesConfig.right && xi === 1) {
                //     continue;
                // }
                const patch = this.originTexture.frames[this.getPatchNameByIndex(patchIndex)];
                const patchImg = new Phaser.GameObjects.Image(this.scene, 0, 0, patch.texture.key, patch.name);
                patchImg.setOrigin(0);
                patchImg.setPosition(this.finalXs[xi] - this.width * this.originX, this.finalYs[yi] - this.height * this.originY);
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
                patchImg.displayWidth = this.finalXs[xi + 1] - this.finalXs[xi] + (xi < 2 ? this.mCorrection : 0);
                patchImg.displayHeight = this.finalYs[yi + 1] - this.finalYs[yi] + (yi < 2 ? this.mCorrection : 0);
                patchImg.texture.setFilter(Phaser.Textures.FilterMode.NEAREST);
                this.add(patchImg);
                if (this.internalTint)
                    patchImg.setTint(this.internalTint);
                patchImg.tintFill = tintFill;
                ++patchIndex;
            }
        }
    }
    /**
     * @method apowophaserui.NineSlicePatch#createPatchFrame
     * @param {string} patch 
     * @param {number} x 
     * @param {number} y 
     * @param {number} width 
     * @param {number} height 
     * @protected
     */
    createPatchFrame(patch, x, y, width, height) {
        if (this.originTexture.frames.hasOwnProperty(patch)) {
            return;
        }
        this.originTexture.add(patch, this.originFrame.sourceIndex, this.originFrame.cutX + x, this.originFrame.cutY + y, width, height);
    }
    /**
     * @method apowophaserui.NineSlicePatch#getPatchNameByIndex
     * @param {number} index 
     * @protected
     * @return {string}
     */
    getPatchNameByIndex(index) {
        return this.originFrame.name + NineSlicePatch.patches[index] + this.patchKey;
    }
}

NineSlicePatch.__BASE = "__BASE";
NineSlicePatch.patches = ["[0][0]", "[1][0]", "[2][0]", "[0][1]", "[1][1]", "[2][1]", "[0][2]", "[1][2]", "[2][2]"];
export default NineSlicePatch;
