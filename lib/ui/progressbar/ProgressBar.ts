/*
 * 进度条ui
 * @Author: gxm
 * @Date: 2020-03-17 20:59:46
 * @Last Modified by: gxm
 * @Last Modified time: 2020-09-17 15:57:18
 */
import { ProgressBarConfig } from "../interface/progressbar/IProgressBarConfig";
import { NineSlicePatch } from "../ninepatch/NineSlicePatch";
import { INinePatchSkinData } from "../interface/ninepatch/INinePatchSkinData";
import { BaseUI } from "../baseUI/BaseUI";
import ResizeGameObject from "../../plugins/utils/size/ResizeGameObject.js";
export enum ProgressBarEvent {
    tweenStart = "tweenStart",
    tweenComplete = "tweenComplete",
    tweenUpdate = "tweenUpdate"
}
const GetValue = Phaser.Utils.Objects.GetValue;
export class ProgressBar extends BaseUI {
    private mConfig: ProgressBarConfig;
    private mBgSkin: NineSlicePatch;
    private mBarSkin: NineSlicePatch;
    private mText: Phaser.GameObjects.Text;
    private mBarMaskGraphics: Phaser.GameObjects.Graphics;
    // private mTween: Phaser.Tweens.Tween;
    private barWid: number;
    private curWid: number;
    constructor(scene: Phaser.Scene, config: ProgressBarConfig) {
        super(scene);
        this.mConfig = config;
        const posX = config.x;
        const posY = config.y;
        this.width = config.width;
        this.height = config.height;
        this.setPosition(posX, posY);
        this.setSize(this.width, this.height);
        this.dpr = GetValue(config, "dpr", 1);
        this.scale = GetValue(config, "scale", 1);
        const bgSkinData: INinePatchSkinData = config.background;
        const barSkinData: INinePatchSkinData = config.bar;
        this.mBgSkin = new NineSlicePatch(scene, bgSkinData.x, bgSkinData.y, bgSkinData.width, bgSkinData.height, bgSkinData.key, bgSkinData.frame, bgSkinData.config, this.dpr, this.scale);
        this.mBarSkin = new NineSlicePatch(scene, barSkinData.x, barSkinData.y, barSkinData.width, barSkinData.height, barSkinData.key, barSkinData.frame, barSkinData.config, this.dpr, this.scale);
        // 按钮文本
        const textconfig = {};
        this.mText = scene.make.text({
            style: Object.assign(textconfig, config.textConfig)
        }, false);
        this.barWid = barSkinData.width;
        const hei: number = this.mBarSkin.height;
        this.mBarMaskGraphics = this.scene.make.graphics(undefined, false);
        this.mBarMaskGraphics.fillStyle(0, 1);
        this.mBarMaskGraphics.beginPath();
        this.mBarMaskGraphics.fillRect(0, 0, 10, hei);
        this.mBarMaskGraphics.setPosition(-this.barWid / 2, -hei / 2);
        // this.mBarSkin.mask = this.mBarMaskGraphics.createGeometryMask();
        this.add([this.mBgSkin, this.mBarSkin, this.mText]);
        this.disInteractive();
    }

    public setProgress(curVal: number, maxVal: number) {
        let value = curVal / maxVal;
        if (value > 1) value = 1;
        else if (value < 0) value = 0;
        this.curWid = (value) * this.barWid;
        const hei: number = this.mBarSkin.height;
        this.mBarSkin.resize(this.curWid, hei);
        this.mBarSkin.x = -this.barWid / 2 + this.curWid / 2;
        // this.mBarMaskGraphics.clear();
        // this.mBarMaskGraphics.fillRect(0, 0, this.curWid, hei);
        // this.mBarMaskGraphics.setPosition(-this.barWid / 2, -hei / 2);
        // if (this.mTween) {
        //     this.mTween.stop();
        //     this.mTween.remove();
        // }
        // this.mTween = this.scene.tweens.add({
        //     targets: this.mBarMaskGraphics,
        //     duration: 1000,
        //     ease: "Linear",
        //     scaleX: { value: curVal / maxVal },
        //     onStart: () => {
        //         this.onTweenStart();
        //     },
        //     onComplete: (tween, targets, element) => {
        //         this.onTweenComplete();
        //     },
        //     onUpdate: (tween, targets, element) => {
        //         this.onTweenUpdate();
        //     },
        //     onCompleteParams: [this]
        // });
    }

    public setText(val: string) {
        if (this.mText) {
            this.mText.text = val;
            if (!this.mText.parentContainer) this.add(this.mText);
        }
    }

    public get text() {
        return this.mText;
    }

    public get bar() {
        return this.mBarSkin;
    }

    public destory() {
        // if (this.mTween) {
        //     this.mTween.stop();
        //     this.mTween.remove();
        //     this.mTween = null;
        // }
        super.destroy();
    }

    // private onTweenStart() {
    //     this.mBarMaskGraphics.clear();
    //     if (this.mConfig.music && this.mConfig.music.progress) this.playSound(this.mConfig.music.progress);
    //     this.emit(ProgressBarEvent.tweenStart);
    // }

    // private onTweenComplete() {
    //     this.emit(ProgressBarEvent.tweenComplete);
    // }

    // private onTweenUpdate() {
    //     this.mBarMaskGraphics.clear();
    //     // tslint:disable-next-line:no-console
    //     console.log(this.mBarSkin.mask);
    //     // this.mBaCSkin.setMask(this.mBarMaskGraphics.createGeometryMask());
    //     this.emit(ProgressBarEvent.tweenUpdate);
    // }
}
