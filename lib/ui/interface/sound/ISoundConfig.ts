
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

export interface ISoundGroup {
    open?: ISoundConfig, // 打开时音效
    close?: ISoundConfig, // 关闭时音效
    click?: ISoundConfig, // 点击时音效
    down?: ISoundConfig,// 按下时音效
    up?: ISoundConfig,// 抬起时音效
    move?: ISoundConfig, // 按下后移动音效
    disabled?: ISoundConfig, // 失效音效
    // dragStart?: ISoundConfig, // 开始拖动时音效
    // dragMove?: ISoundConfig, // 拖动时音效
    // dragEnd?: ISoundConfig,// 拖动结束时音效
    progress?: ISoundConfig, // 进度条进度发生改变
    expand?: ISoundConfig, // 展开时音效
}
