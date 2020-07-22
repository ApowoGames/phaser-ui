"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @enum {string}
 * @memberof apowophaserui
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
 * @namespace apowophaserui.ISoundConfig
 */
var ISoundConfig = {
    /**
     * @name apowophaserui.ISoundConfig#key
     * @type {?string}
     */
    key,
    /**
     * @name apowophaserui.ISoundConfig#field
     * @type {?apowophaserui.SoundField}
     */
    field,
    /**
     * @name apowophaserui.ISoundConfig#soundConfig
     * @type {?Phaser.Types.Sound.SoundConfig}
     */
    soundConfig,
}
export { ISoundConfig };
/**
 * @namespace apowophaserui.ISoundGroup
 */
var ISoundGroup = {
    /**
     * @name apowophaserui.ISoundGroup#open
     * @type {?apowophaserui.ISoundConfig}
     */
    open, // 打开时音效
    /**
     * @name apowophaserui.ISoundGroup#close
     * @type {apowophaserui.ISoundConfig}
     */
    close, // 关闭时音效
    /**
    * @name apowophaserui.ISoundGroup#click
    * @type {?apowophaserui.ISoundConfig}
    */
    click, // 点击时音效
    /**
    * @name apowophaserui.ISoundGroup#down
    * @type {?apowophaserui.ISoundConfig}
    */
    down,// 按下时音效
    /**
    * @name apowophaserui.ISoundGroup#up
    * @type {?apowophaserui.ISoundConfig}
    */
    up,// 抬起时音效
    /**
    * @name apowophaserui.ISoundGroup#move
    * @type {?apowophaserui.ISoundConfig}
    */
    move, // 按下后移动音效
    /**
    * @name apowophaserui.ISoundGroup#disabled
    * @type {?apowophaserui.ISoundConfig}
    */
    disabled, // 失效音效
    /**
    * @name apowophaserui.ISoundGroup#progress
    * @type {?apowophaserui.ISoundConfig}
    */
    progress, // 进度条进度发生改变
    /**
    * @name apowophaserui.ISoundGroup#expand
    * @type {?apowophaserui.ISoundConfig}
    */
    expand // 展开时音效
}
export { ISoundGroup }