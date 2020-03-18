/*
 * 进度条ui
 * @Author: gxm 
 * @Date: 2020-03-17 20:59:46 
 * @Last Modified by:   gxm 
 * @Last Modified time: 2020-03-17 20:59:46 
 */
import { ProgressBarConfig } from "../interface/progressbar/iProgressBarConfig";
import { Transform } from "../../ui/interface/pos/transform";
import { Tool } from "../tool/tool";
import { IProgressBarSkinData } from "../interface/progressbar/IProgressBarSkinData";
import { NinePatchSkin } from "../interface/ninepatch/ninePatchSkin";
import { INinePatchSkinData } from "../interface/ninepatch/iNinePatchSkinData";
export enum ProgressBarEvent {
    tweenStart = "tweenStart",
    tweenComplete = "tweenComplete",
    tweenUpdate = "tweenUpdate"
}
export class ProgressBar extends Phaser.Events.EventEmitter {
    private mScene: Phaser.Scene;
    private mConfig: ProgressBarConfig;
    private mWorld: any;
    private mBgSkin: NinePatchSkin;
    private mBarSkin: NinePatchSkin;
    private mContainer: Phaser.GameObjects.Container;
    private mText: Phaser.GameObjects.Text;
    private mBarMaskGraphics: Phaser.GameObjects.Graphics;
    private mTween: Phaser.Tweens.Tween;
    private barWid: number;
    constructor(scene: Phaser.Scene, config: ProgressBarConfig, world: any) {
        super();
        this.mScene = scene;
        this.mConfig = config;
        this.mWorld = world;
        const transform: Transform = Tool.getTransfrom(config);
        const skinData: IProgressBarSkinData = !config || !config.skinsData ? undefined : config.skinsData;
        const pos: any = Tool.getPos(transform);
        const posX = pos.x;
        const posY = pos.y;
        const baseWidth = !transform && !transform.width ? 0 : transform.width;
        const baseHeight = !transform && !transform.height ? 0 : transform.height;
        this.mContainer = this.mScene.make.container({ x: posX, y: posY, width: baseWidth, height: baseHeight }, false);
        const bgSkinData: INinePatchSkinData = !skinData ? undefined : skinData.background;
        const barSkinData: INinePatchSkinData = !skinData ? undefined : skinData.bar;
        this.mBgSkin = new NinePatchSkin(scene, bgSkinData);
        this.mBarSkin = new NinePatchSkin(scene, barSkinData);
        //按钮文本
        const textconfig = {};
        this.mText = scene.make.text({
            style: Object.assign(textconfig, config.textConfig)
        }, false);
        this.barWid = this.mConfig.skinsData.bar.transform.width;
        const hei: number = this.mConfig.skinsData.bar.transform.height;
        this.mBarMaskGraphics = this.mScene.make.graphics(undefined, false);
        this.mBarMaskGraphics.fillStyle(0, 0);
        this.mBarMaskGraphics.fillRect(0, 0, 0, hei);
        this.mContainer.setMask(this.mBarMaskGraphics.createGeometryMask());
        this.mContainer.add([this.mBgSkin.skin, this.mBarSkin, this.mText]);
    }

    public setProgress(curVal: number, maxVal: number) {
        const curWid: number = curVal / maxVal * this.barWid;
        if (this.mTween) {
            this.mTween.stop();
            this.mTween.remove();
        }
        this.mTween = this.mScene.tweens.add({
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
            if (!this.mText.parentContainer) this.mContainer.add(this.mText);
        }
    }

    public destory() {
        if (this.mTween) {
            this.mTween.stop();
            this.mTween.remove();
            this.mTween = null;
        }
        if (this.mContainer) {
            this.mContainer.destroy();
        }
        this.mContainer = null;
    }

    public get skin(): Phaser.GameObjects.Container {
        return this.mContainer;
    }

    private onTweenStart() {
        this.emit(ProgressBarEvent.tweenStart);
    }

    private onTweenComplete() {
        this.emit(ProgressBarEvent.tweenComplete);
    }

    private onTweenUpdate() {
        this.emit(ProgressBarEvent.tweenUpdate);
    }
}