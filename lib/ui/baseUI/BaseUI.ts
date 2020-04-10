import { ISound } from "../interface/baseUI/ISound";
import { ISoundConfig } from "../interface/sound/ISoundConfig";
import { ISetInteractive } from "../interface/baseUI/ISetInteractive";
import { Tool } from "../tool/Tool";

export class BaseUI extends Phaser.Events.EventEmitter implements ISound, ISetInteractive {
    public soundMap: Map<string, Phaser.Sound.BaseSound>;
    protected mContainer: Phaser.GameObjects.Container;
    protected mInterActive: boolean = false;
    protected mScene: Phaser.Scene;
    private mMute: boolean = false;
    constructor(scene: Phaser.Scene) {
        super();
        this.mScene = scene;
        this.soundMap = new Map();
        this.disInteractive();
    }

    public setInteractive() {
        this.mInterActive = true;
        if (this.mContainer) {
            this.mContainer.setInteractive();
            this.mScene.input.off("pointerup", this.sceneClick, this);
            this.mContainer.on("pointerup", this.uiClick, this);
        }
    }

    public disInteractive() {
        this.mInterActive = false;
        if (this.mContainer) {
            this.mContainer.disableInteractive();
            this.mScene.input.on("pointerup", this.sceneClick, this);
            this.mContainer.off("pointerup", this.uiClick, this);
        };
    }

    public playSound(config: ISoundConfig) {
        if (this.mute) return;
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
        if (this.mute) return;
        const key = config.key;
        let sound = this.soundMap.get(key);
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
        })
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

    public mute(boo: boolean) {
        this.mMute = boo;
    }

    public destroy() {
        this.soundMap.forEach((sound) => {
            if (sound.isPlaying) sound.stop();
        });
        this.mMute = false;
        this.mInterActive = false;
        this.mContainer.disableInteractive();
        this.mScene.input.off("pointerup", this.sceneClick, this);
        this.mContainer.off("pointerup", this.uiClick, this);
        super.destroy();
    }

    private sceneClick(pointer: Phaser.Input.Pointer) {
        if (Tool.checkPointerContains(this.mContainer, pointer) && this.checkPointerDelection(pointer)) {
            this.emit("panelClick");
        }
    }

    private uiClick(pointer: Phaser.Input.Pointer) {
        if (this.checkPointerDelection(pointer)) {
            this.emit("panelClick");
        }
    }

    private checkPointerDelection(pointer: Phaser.Input.Pointer) {
        if (!this.mScene) return true;
        return Math.abs(pointer.downX - pointer.upX) < 10 ||
            Math.abs(pointer.downY - pointer.upY) < 10;
    }
}
