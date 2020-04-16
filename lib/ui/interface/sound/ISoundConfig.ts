
export enum SoundField {
    Background,
    Element,
    Effect
}
export interface ISoundConfig {
    key?: string;
    urls: string | string[];
    field?: SoundField;
    soundConfig?: Phaser.Types.Sound.SoundConfig;
}
