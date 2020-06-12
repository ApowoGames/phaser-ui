"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @enum {string}
 * @memberof tooqingui
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
 * @namespace tooqingui.ISoundConfig
 */
var ISoundConfig = {
    /**
     * @name tooqingui.ISoundConfig#key
     * @type {string}
     */
    key,
    /**
     * @name tooqingui.ISoundConfig#field
     * @type {tooqingui.SoundField}
     */
    field,
    /**
     * @name tooqingui.ISoundConfig#soundConfig
     * @type {Phaser.Types.Sound.SoundConfig}
     */
    soundConfig,
}
module.exports = tooqingui.ISoundConfig;
/**
 * @namespace tooqingui.ISoundGroup
 */
var ISoundGroup = {
    /**
     * @name tooqingui.ISoundGroup#open
     * @type {tooqingui.ISoundConfig}
     */
    open, // 打开时音效
    /**
     * @name tooqingui.ISoundGroup#close
     * @type {tooqingui.ISoundConfig}
     */
    close, // 关闭时音效
    /**
    * @name tooqingui.ISoundGroup#click
    * @type {tooqingui.ISoundConfig}
    */
    click, // 点击时音效
    /**
    * @name tooqingui.ISoundGroup#down
    * @type {tooqingui.ISoundConfig}
    */
    down,// 按下时音效
    /**
    * @name tooqingui.ISoundGroup#up
    * @type {tooqingui.ISoundConfig}
    */
    up,// 抬起时音效
    /**
    * @name tooqingui.ISoundGroup#move
    * @type {tooqingui.ISoundConfig}
    */
    move, // 按下后移动音效
    /**
    * @name tooqingui.ISoundGroup#disabled
    * @type {tooqingui.ISoundConfig}
    */
    disabled, // 失效音效
    /**
    * @name tooqingui.ISoundGroup#progress
    * @type {tooqingui.ISoundConfig}
    */
    progress, // 进度条进度发生改变
    /**
    * @name tooqingui.ISoundGroup#expand
    * @type {tooqingui.ISoundConfig}
    */
    expand // 展开时音效
}
module.exports = tooqingui.ISoundGroup;