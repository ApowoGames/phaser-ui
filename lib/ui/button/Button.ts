/*
 * 按钮组件
 * @Author: gxm
 * @Date: 2020-03-10 10:51:48
 * @Last Modified by: gxm
 * @Last Modified time: 2020-04-10 14:57:40
 */

import { FramesSkin } from "../interface/button/FrameSkin";
import { Tool } from "../tool/Tool";
import { Event } from "../interface/event/MouseEvent";
import { TextConfig } from "../interface/text/TextConfig";
import { Transform } from "../interface/pos/Transform";
import { AbstractInteractiveObject } from "../interface/baseUI/AbstructInteractiveObject";
import { ResourceData } from "../interface/baseUI/ResourceData";
import { ISoundConfig } from "../interface/sound/ISoundConfig";
import { ISound } from "../interface/baseUI/ISound";

export enum ButtonState {
    Normal = "normal",
    Over = "over",
    Select = "select",
    Disable = "disable",
}
export interface ButtonConfig {
    bgFrames?: ResourceData;
    iconFrames?: ResourceData;
    transform?: Transform;
    textconfig?: TextConfig;
    text?: string;
    /**
     * 默认 0位是点击音效，1位是不可点击音效，2，3根据具体ui实现
     */
    music?: ISoundConfig[];
}
const GetValue = Phaser.Utils.Objects.GetValue;
export class Button extends Phaser.Events.EventEmitter implements AbstractInteractiveObject, ISound {
    public soundMap: Map<string, Phaser.Sound.BaseSound>;
    protected mSelected: boolean;
    protected mEnabled: boolean;
    protected mContainer: Phaser.GameObjects.Container;
    protected mBgFramesSkin: FramesSkin;
    protected mIconFramesSkin: FramesSkin;
    protected mText: Phaser.GameObjects.Text;
    protected mConfig: ButtonConfig;
    protected mPressTime: number = 2000;
    protected mPressDelay: any;
    protected mDownTime: number = 0;
    protected mIsMove: boolean = false;
    protected mScene;
    private mMute: boolean = false;
    public constructor(scene: Phaser.Scene, btnConfig: ButtonConfig) {
        super();
        this.soundMap = new Map();
        this.mConfig = btnConfig;
        this.mScene = scene;
        const transform: Transform = !btnConfig ? undefined : btnConfig.transform;
        const pos: any = Tool.getPos(transform);
        const posX = pos.x;
        const posY = pos.y;
        const baseWidth = !transform && !transform.width ? 0 : transform.width;
        const baseHeight = !transform && !transform.height ? 0 : transform.height;
        const bgFrames: ResourceData = !btnConfig ? undefined : btnConfig.bgFrames;
        const iconFrames: ResourceData = !btnConfig ? undefined : btnConfig.iconFrames;
        // 按钮容器
        this.mContainer = scene.make.container({ x: posX, y: posY, width: baseWidth, height: baseHeight }, false);
        this.mContainer.setInteractive(new Phaser.Geom.Rectangle(0, 0, baseWidth, baseHeight), Phaser.Geom.Rectangle.Contains);
        // 按钮背景
        this.mBgFramesSkin = new FramesSkin(scene, bgFrames);
        const bgTransform: Transform = bgFrames.transForm;
        this.mBgFramesSkin.x = Tool.getPos(bgTransform).x;
        this.mBgFramesSkin.y = Tool.getPos(bgTransform).y;
        if (this.mBgFramesSkin.skin) this.mContainer.add(this.mBgFramesSkin.skin);
        // 按钮icon
        this.mIconFramesSkin = new FramesSkin(scene, iconFrames);
        const iconTransform: Transform = iconFrames.transForm;
        this.mIconFramesSkin.x = Tool.getPos(iconTransform).x;
        this.mIconFramesSkin.y = Tool.getPos(iconTransform).y;
        if (this.mIconFramesSkin.skin) this.mContainer.add(this.mIconFramesSkin.skin);
        // 按钮文本
        const textconfig = {};
        this.mText = scene.make.text({
            style: Object.assign(textconfig, btnConfig.textconfig)
        }, false);
        this.addListen();
    }

    public playSound(config: ISoundConfig) {
        if (this.mMute) return;
        const key = config.key;
        const urls = config.urls;
        if (this.mScene.cache.audio.exists(key)) {
            this.startPlay(config);
        } else {
            this.mScene.load.once(`filecomplete-audio-${key}`, () => {
                this.startPlay(config);
            }, this);
            this.mScene.load.audio(key, urls);
            this.mScene.load.start();
        }
    }

    public startPlay(config: ISoundConfig) {
        if (this.mMute) return;
        const key = config.key;
        let sound: Phaser.Sound.BaseSound = this.soundMap.get(key);
        if (!sound) {
            sound = this.mScene.sound.add(key, config.soundConfig);
            this.soundMap.set(key, sound);
        }
        if (sound.isPlaying) {
            return;
        }
        sound.play();
    }

    public stopSound() {
        if (this.mMute) return;
        this.soundMap.forEach((sound) => {
            if (sound.isPlaying) sound.stop();
        });
    }

    public pauseSound() {
        if (this.mMute) return;
        this.soundMap.forEach((sound) => {
            if (!sound.isPaused) sound.pause();
        });
    }

    public resumeSound() {
        if (this.mMute) return;
        this.soundMap.forEach((sound) => {
            if (sound.isPaused) sound.resume();
        });
    }

    public set selected(value: boolean) {
        this.mSelected = value;
        // const buttonState = value ? ButtonState.Select : ButtonState.Normal;
        // this.buttonStateChange(buttonState);
    }
    public get selected(): boolean {
        return this.mSelected;
    }

    public set enabled(value: boolean) {
        this.mEnabled = value;
        const buttonState = value ? ButtonState.Normal : ButtonState.Disable;
        this.buttonStateChange(buttonState);
    }

    public get enabled(): boolean {
        return this.mEnabled;
    }

    public setSize(width: number, height: number) {
        this.mContainer.setSize(width, height);
        this.mContainer.setInteractive(new Phaser.Geom.Rectangle(0, 0, width, height), Phaser.Geom.Rectangle.Contains);
    }

    public setBgTexture(resData: ResourceData) {
        this.mBgFramesSkin.setSkinData(resData);
        if (!this.mBgFramesSkin.skin.parentContainer) this.mContainer.add(this.mBgFramesSkin.skin);
    }

    public setIconTexture(resData: ResourceData) {
        this.mIconFramesSkin.setSkinData(resData);
        if (!this.mIconFramesSkin.skin.parentContainer) this.mContainer.add(this.mIconFramesSkin.skin);
    }

    public setText(val: string) {
        if (this.mText) {
            this.mText.text = val;
            if (!this.mText.parentContainer) this.mContainer.add(this.mText);
        }
    }

    public get skin(): Phaser.GameObjects.Container {
        return this.mContainer;
    }

    public addListen() {
        this.mContainer.on("pointerDown", this.onPointerDownHandler, this);
        this.mContainer.on("pointerUp", this.onPointerUpHandler, this);
        this.mContainer.on("pointerMove", this.onPointerMoveHandler, this);
    }

    public removeListen() {
        this.mContainer.off("pointerDown", this.onPointerDownHandler, this);
        this.mContainer.off("pointerUp", this.onPointerUpHandler, this);
        this.mContainer.off("pointerMove", this.onPointerMoveHandler, this);
    }
    /**
     * 是否静音
     * @param boo 
     */
    public mute(boo: boolean) {
        this.mMute = boo;
    }

    public destroy() {
        this.removeAllListeners();
        if (this.mBgFramesSkin) {
            this.mBgFramesSkin.destroy();
            this.mBgFramesSkin = null;
        }
        if (this.mIconFramesSkin) {
            this.mIconFramesSkin.destroy();
            this.mIconFramesSkin = null;
        }
        if (this.mContainer) {
            this.mContainer.destroy();
        }
        if (this.mPressDelay) {
            clearTimeout(this.mPressDelay);
        }
        if (this.soundMap) {
            this.soundMap.forEach((sound) => {
                if (sound.isPlaying) sound.stop();
            });
        }
        this.mDownTime = 0;
        this.mMute = false;
        this.mIsMove = false;
        super.destroy();
    }

    protected onPointerUpHandler(pointer) {
        if (!this.mEnabled) return;
        this.buttonStateChange(ButtonState.Normal);
        if (!this.mIsMove || (Date.now() - this.mDownTime > this.mPressTime)) {
            // events.push(MouseEvent.Tap);
            if (this.mConfig.music && this.mConfig.music[0]) this.playSound(this.mConfig.music[0]);
            this.emit(Event.Tap, pointer, this);
        }

        clearTimeout(this.mPressDelay);
        this.mIsMove = false;
        this.mDownTime = 0;
    }

    protected onPointerDownHandler(pointer) {
        if (!this.mEnabled) {
            if (this.mConfig.music && this.mConfig.music[1]) this.playSound(this.mConfig.music[1]);
            return;
        }
        this.buttonStateChange(ButtonState.Select);
        this.mDownTime = Date.now();
        this.mPressDelay = setTimeout(() => {
            this.emit(Event.Hold, this);
        }, this.mPressTime);
        this.emit(Event.Down, this);
    }

    protected onPointerMoveHandler(pointer) {
        if (!this.mEnabled) return;
        this.mIsMove = true;
        this.emit(Event.Move);
    }

    protected buttonStateChange(state: ButtonState) {
        if (this.mConfig.bgFrames) {
            const frameName: string = this.mConfig.bgFrames.frameObj[state];
            if (this.mBgFramesSkin) {
                this.mBgFramesSkin.changeFrame(frameName);
            }
        }
        if (this.mConfig.iconFrames) {
            const frameName: string = this.mConfig.iconFrames.frameObj[state];
            if (this.mIconFramesSkin) {
                this.mIconFramesSkin.changeFrame(frameName);
            }
        }

    }
}
