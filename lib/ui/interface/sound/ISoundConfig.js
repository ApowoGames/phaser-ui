"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @enum {string}
 * @memberof Tooqingui
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
 * @namespace Tooqingui.ISoundConfig
 */
var ISoundConfig = {
    /**
     * @name Tooqingui.ISoundConfig#key
     * @type {string}
     */
    key,
    /**
     * @name Tooqingui.ISoundConfig#field
     * @type {Tooqingui.SoundField}
     */
    field,
    /**
     * @name Tooqingui.ISoundConfig#soundConfig
     * @type {Phaser.Types.Sound.SoundConfig}
     */
    soundConfig,
}
module.exports = Tooqingui.ISoundConfig;
/**
 * @namespace Tooqingui.ISoundGroup
 */
var ISoundGroup = {
    /**
     * @name Tooqingui.ISoundGroup#open
     * @type {Tooqingui.ISoundConfig}
     */
    open, // 打开时音效
    /**
     * @name Tooqingui.ISoundGroup#close
     * @type {Tooqingui.ISoundConfig}
     */
    close, // 关闭时音效
    /**
    * @name Tooqingui.ISoundGroup#click
    * @type {Tooqingui.ISoundConfig}
    */
    click, // 点击时音效
    /**
    * @name Tooqingui.ISoundGroup#down
    * @type {Tooqingui.ISoundConfig}
    */
    down,// 按下时音效
    /**
    * @name Tooqingui.ISoundGroup#up
    * @type {Tooqingui.ISoundConfig}
    */
    up,// 抬起时音效
    /**
    * @name Tooqingui.ISoundGroup#move
    * @type {Tooqingui.ISoundConfig}
    */
    move, // 按下后移动音效
    /**
    * @name Tooqingui.ISoundGroup#disabled
    * @type {Tooqingui.ISoundConfig}
    */
    disabled, // 失效音效
    /**
    * @name Tooqingui.ISoundGroup#progress
    * @type {Tooqingui.ISoundConfig}
    */
    progress, // 进度条进度发生改变
    /**
    * @name Tooqingui.ISoundGroup#expand
    * @type {Tooqingui.ISoundConfig}
    */
    expand // 展开时音效
}
module.exports = Tooqingui.ISoundGroup;