"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @enum {string}
 * @memberof phaserui
 * @readonly
 * @property {string} Background "Background"
 * @property {string} Element "Element"
 * @property {string} Effect "Effect"
 */
var SoundField = {
    "Background": 1,
    "Element": 2,
    "Effect": 3,
};
/**
 * @namespace phaserui.ISoundConfig
 */
var ISoundConfig = {
    /**
     * @name phaserui.ISoundConfig#key
     * @type {string}
     */
    key,
    /**
     * @name phaserui.ISoundConfig#field
     * @type {phaserui.SoundField}
     */
    field,
    /**
     * @name phaserui.ISoundConfig#soundConfig
     * @type {Phaser.Types.Sound.SoundConfig}
     */
    soundConfig,
}
export { ISoundConfig };
/**
 * @namespace phaserui.ISoundGroup
 */
var ISoundGroup = {
    /**
     * @name phaserui.ISoundGroup#open
     * @type {phaserui.ISoundConfig}
     */
    open, // 打开时音效
    /**
     * @name phaserui.ISoundGroup#close
     * @type {phaserui.ISoundConfig}
     */
    close, // 关闭时音效
    /**
    * @name phaserui.ISoundGroup#click
    * @type {phaserui.ISoundConfig}
    */
    click, // 点击时音效
    /**
    * @name phaserui.ISoundGroup#down
    * @type {phaserui.ISoundConfig}
    */
    down,// 按下时音效
    /**
    * @name phaserui.ISoundGroup#up
    * @type {phaserui.ISoundConfig}
    */
    up,// 抬起时音效
    /**
    * @name phaserui.ISoundGroup#move
    * @type {phaserui.ISoundConfig}
    */
    move, // 按下后移动音效
    /**
    * @name phaserui.ISoundGroup#disabled
    * @type {phaserui.ISoundConfig}
    */
    disabled, // 失效音效
    /**
    * @name phaserui.ISoundGroup#progress
    * @type {phaserui.ISoundConfig}
    */
    progress, // 进度条进度发生改变
    /**
    * @name phaserui.ISoundGroup#expand
    * @type {phaserui.ISoundConfig}
    */
    expand // 展开时音效
}
export { ISoundGroup }