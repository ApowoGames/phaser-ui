import { ISound } from "../interface/baseUI/ISound";
import { ISoundConfig } from "../interface/sound/ISoundConfig";

export class BaseUI extends Phaser.Events.EventEmitter implements ISound {
    public soundMap: Map<string, Phaser.Sound.BaseSound>;
    protected mScene: Phaser.Scene;
    constructor(scene: Phaser.Scene) {
        super();
        this.mScene = scene;
        this.soundMap = new Map();
    }

    public playSound(config: ISoundConfig) {
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

    public destroy() {
        this.soundMap.forEach((sound) => {
            if (sound.isPlaying) sound.stop();
        });
        super.destroy();
    }
}