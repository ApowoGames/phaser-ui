"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @namespace apowophaserui.ISoundConfig
 */
var ISoundConfig = {
    /**
     * @name apowophaserui.ISoundConfig#key
     * @type {string}
     */
    key: "",
    /**
     * @name apowophaserui.ISoundConfig#field
     * @type {number}
     */
    field: 0,
    /**
     * @name apowophaserui.ISoundConfig#soundConfig
     * @type {Phaser.Types.Sound.SoundConfig}
     */
    soundConfig: undefined,
}
/**
 * @namespace apowophaserui.ISoundGroup
 */
var ISoundGroup = {
    /**
     * @name apowophaserui.ISoundGroup#open
     * @type {apowophaserui.ISoundConfig}
     */
    open: undefined, // 打开时音效
    /**
     * @name apowophaserui.ISoundGroup#close
     * @type {apowophaserui.ISoundConfig}
     */
    close: undefined, // 关闭时音效
    /**
    * @name apowophaserui.ISoundGroup#click
    * @type {apowophaserui.ISoundConfig}
    */
    click: undefined, // 点击时音效
    /**
    * @name apowophaserui.ISoundGroup#down
    * @type {apowophaserui.ISoundConfig}
    */
    down: undefined,// 按下时音效
    /**
    * @name apowophaserui.ISoundGroup#up
    * @type {apowophaserui.ISoundConfig}
    */
    up: undefined,// 抬起时音效
    /**
    * @name apowophaserui.ISoundGroup#move
    * @type {apowophaserui.ISoundConfig}
    */
    move: undefined, // 按下后移动音效
    /**
    * @name apowophaserui.ISoundGroup#disabled
    * @type {apowophaserui.ISoundConfig}
    */
    disabled: undefined, // 失效音效
    /**
    * @name apowophaserui.ISoundGroup#progress
    * @type {apowophaserui.ISoundConfig}
    */
    progress: undefined, // 进度条进度发生改变
    /**
    * @name apowophaserui.ISoundGroup#expand
    * @type {apowophaserui.ISoundConfig}
    */
    expand: undefined // 展开时音效
}
export { ISoundGroup, ISoundConfig }