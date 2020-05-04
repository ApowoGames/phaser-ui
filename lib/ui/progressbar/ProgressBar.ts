/*
 * 进度条ui
 * @Author: gxm
 * @Date: 2020-03-17 20:59:46
 * @Last Modified by: gxm
 * @Last Modified time: 2020-05-05 00:30:20
 */
import { ProgressBarConfig } from "../interface/progressbar/IProgressBarConfig";
import { Transform } from "../interface/pos/Transform";
import { Tool } from "../tool/Tool";
import { IProgressBarSkinData } from "../interface/progressbar/IProgressBarSkinData";
import { NinePatchSkin } from "../interface/ninepatch/NinePatchSkin";
import { INinePatchSkinData } from "../interface/ninepatch/INinePatchSkinData";
import { BaseUI } from "../baseUI/BaseUI";
export enum ProgressBarEvent {
    tweenStart = "tweenStart",
    tweenComplete = "tweenComplete",
    tweenUpdate = "tweenUpdate"
}
export class ProgressBar extends BaseUI {
    private mConfig: ProgressBarConfig;
    private mBgSkin: NinePatchSkin;
    private mBarSkin: NinePatchSkin;
    private mText: Phaser.GameObjects.Text;
    private mBarMaskGraphics: Phaser.GameObjects.Graphics;
    private mTween: Phaser.Tweens.Tween;
    private barWid: number;
    constructor(scene: Phaser.Scene, config: ProgressBarConfig) {
        super(scene);
        this.mConfig = config;
        const transform: Transform = Tool.getTransfrom(config);
        const skinData: IProgressBarSkinData = !config || !config.skinsData ? undefined : config.skinsData;
        const pos: any = Tool.getPos(transform);
        const posX = pos.x;
        const posY = pos.y;
        this.width = !transform && !transform.width ? 0 : transform.width;
        this.height = !transform && !transform.height ? 0 : transform.height;
        this.setPosition(posX, posY);
        this.setSize(this.width, this.height);
        const bgSkinData: INinePatchSkinData = !skinData ? undefined : skinData.background;
        const barSkinData: INinePatchSkinData = !skinData ? undefined : skinData.bar;
        this.mBgSkin = new NinePatchSkin(scene, bgSkinData);
        this.mBarSkin = new NinePatchSkin(scene, barSkinData);
        // 按钮文本
        const textconfig = {};
        this.mText = scene.make.text({
            style: Object.assign(textconfig, config.textConfig)
        }, false);
        this.barWid = this.mConfig.skinsData.bar.transform.width;
        const hei: number = this.mConfig.skinsData.bar.transform.height;
        this.mBarMaskGraphics = this.scene.make.graphics(undefined, false);
        this.mBarMaskGraphics.fillStyle(0, 0);
        this.mBarMaskGraphics.fillRect(0, 0, 0, hei);
        this.setMask(this.mBarMaskGraphics.createGeometryMask());
        this.add([this.mBgSkin.skin, this.mBarSkin, this.mText]);
        this.disInteractive();
    }

    public setProgress(curVal: number, maxVal: number) {
        const curWid: number = curVal / maxVal * this.barWid;
        if (this.mTween) {
            this.mTween.stop();
            this.mTween.remove();
        }
        this.mTween = this.scene.tweens.add({
            targets: this.mBarMaskGraphics,
            duration: 100,
            ease: "Linear",
            props: {
                width: { value: curWid }
            },
            onStart: () => {
                this.onTweenStart();
            },
            onComplete: (tween, targets, element) => {
                this.onTweenComplete();
            },
            onUpdate: (tween, targets, element) => {
                this.onTweenUpdate();
            },
            onCompleteParams: [this]
        });
    }

    public setText(val: string) {
        if (this.mText) {
            this.mText.text = val;
            if (!this.mText.parentContainer) this.add(this.mText);
        }
    }

    public destory() {
        if (this.mTween) {
            this.mTween.stop();
            this.mTween.remove();
            this.mTween = null;
        }
        super.destroy();
    }

    private onTweenStart() {
        if (this.mConfig.music && this.mConfig.music.progress) this.playSound(this.mConfig.music.progress);
        this.emit(ProgressBarEvent.tweenStart);
    }

    private onTweenComplete() {
        this.emit(ProgressBarEvent.tweenComplete);
    }

    private onTweenUpdate() {
        this.emit(ProgressBarEvent.tweenUpdate);
    }
}
