import { ISoundConfig } from "../sound/ISoundConfig";

export interface ISound {
    soundMap: Map<string, Phaser.Sound.BaseSound>;
    playSound(config: ISoundConfig);
    startPlay(config: ISoundConfig);
    stopSound();
    pauseSound();
    resumeSound();
    setSilent(boo);
}
