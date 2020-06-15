"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @namespace tooqingui.GridTableConfig
 */
var GridTableConfig = {
    /**
     * @name tooqingui.GridTableConfig#x
     * @type {number}
     * @default 0
     */
    x,
    /**
     * @name tooqingui.GridTableConfig#y
     * @type {number}
     * @default 0
     */
    y,
    /**
     * @name tooqingui.GridTableConfig#type
     * @type {string}
     * @default null
     */
    type,
    /**
     * @name tooqingui.GridTableConfig#scrollMode
     * @type {number}
     * @default 0
     */
    scrollMode, // 0===>v  1===>h
    /**
     * @name tooqingui.GridTableConfig#background
     * @type {*}
     * @default null
     */
    background, // (<any>this.scene).TooqingUI.add.roundRectangle(0, 0, 2, 2, 0, 0xFF9900, .2),基本用来调整mask
    /**
     * @name tooqingui.GridTableConfig#table
     * @type {*}
     * @default null
     */
    table,
    /**
     * @name tooqingui.GridTableConfig#slider
     * @type {*}
     * @default null
     */
    slider,
    /**
     * @name tooqingui.GridTableConfig#scroller
     * @type {*}
     * @default null
     */
    scroller,
    /**
     * @name tooqingui.GridTableConfig#clamplChildOY
     * @type {boolean}
     * @default false
     */
    clamplChildOY, // Set true to clamp scrolling. 默认为false
    /**
     * @name tooqingui.GridTableConfig#header
     * @type {*}
     * @default null
     */
    header,
    /**
     * @name tooqingui.GridTableConfig#footer
     * @type {*}
     * @default null
     */
    footer,
    /**
     * @name tooqingui.GridTableConfig#child
     * @type {*}
     * @default null
     */
    child,
    // : {
    //     gameObject: any;
    //     proportion: number; // 比例
    //     expand: boolean; // 是否展开
    // };
    /**
     * @name tooqingui.GridTableConfig#space
     * @type {*}
     * @default null
     */
    space,
    // : {
    //     left?: number;
    //     right?: number;
    //     top?: number;
    //     bottom?: number;
    //     header?: number;
    //     footer?: number;
    //     table?: number | IPatchesConfig; // number Space between table object and slider object；
    // };
    // Expand width or height of elemen
    /**
     * @name tooqingui.GridTableConfig#expand
     * @type {*}
     * @default null
     */
    expand,
    // : {
    //     header?: boolean;
    //     footer?: boolean;
    // };
    /**
     * @name tooqingui.GridTableConfig#align
     * @type {*}
     * @default null
     */
    align,
    // : {
    //     header?: AlignType;
    //     footer?: AlignType;
    // };
    /**
     * @name tooqingui.GridTableConfig#createCellContainerCallback
     * @type {function}
     * @default null
     */
    createCellContainerCallback,
    /**
     * @name tooqingui.GridTableConfig#items
     * @type {any[]}
     * @default null
     */
    items,
    /**
     * @name tooqingui.GridTableConfig#name
     * @type {string}
     * @default null
     */
    name,

}
module.exports = GridTableConfig;
/**
 * @namespace tooqingui.GridTableCoreConfig
 */
var GridTableCoreConfig = {
    /**
     * @name tooqingui.GridTableCoreConfig#width
     * @type {number}
     * @default 0
     */
    width,
    /**
     * @name tooqingui.GridTableCoreConfig#height
     * @type {number}
     * @default 0
     */
    height,
    /**
     * @name tooqingui.GridTableCoreConfig#scrollMode
     * @type {number}
     * @default 0
     */
    scrollMode,
    /**
     * @name tooqingui.GridTableCoreConfig#cellWidth
     * @type {number}
     * @default 0
     */
    cellWidth,
    /**
     * @name tooqingui.GridTableCoreConfig#cellHeight
     * @type {number}
     * @default 0
     */
    cellHeight,
    /**
     * @name tooqingui.GridTableCoreConfig#cellsCount
     * @type {number}
     * @default 0
     */
    cellsCount,
    /**
     * @name tooqingui.GridTableCoreConfig#columns
     * @type {number}
     * @default 0
     */
    columns,
    /**
     * @name tooqingui.GridTableCoreConfig#interactive
     * @type {boolean}
     * @default true
     */
    interactive,
    /**
     * @name tooqingui.GridTableCoreConfig#reuseCellContainer
     * @type {boolean}
     * @default false
     */
    reuseCellContainer,
    /**
     * @name tooqingui.GridTableCoreConfig#tableOX
     * @type {number}
     * @default 0
     */
    tableOX,
    /**
    * @name tooqingui.GridTableCoreConfig#tableOY
    * @type {number}
    * @default 0
    */
    tableOY,
    /**
     * @name tooqingui.GridTableCoreConfig#cellVisibleCallback
     * @type {function}
     * @default null
     */
    cellVisibleCallback,
    /**
     * @name tooqingui.GridTableCoreConfig#cellVisibleCallbackScope
     * @type {number[]}
     * @default null
     */
    cellVisibleCallbackScope,
    /**
     * @name tooqingui.GridTableCoreConfig#cellInvisibleCallback
     * @type {function}
     * @default null
     */
    cellInvisibleCallback,
    /**
     * @name tooqingui.GridTableCoreConfig#cellInvisibleCallbackScope
     * @type {number[]}
     * @default null
     */
    cellInvisibleCallbackScope,
    /**
     * @name tooqingui.GridTableCoreConfig#cellOriginX
     * @type {number}
     * @default 0.5
     */
    cellOriginX,
    /**
     * @name tooqingui.GridTableCoreConfig#cellOriginY
     * @type {number}
     * @default 0.5
     */
    cellOriginY,
    /**
     * @name tooqingui.GridTableCoreConfig#cellPadX
     * @type {number}
     * @default null
     */
    cellPadX,
    /**
     * @name tooqingui.GridTableCoreConfig#cellPadY
     * @type {number}
     * @default null
     */
    cellPadY,
    /**
     * @name tooqingui.GridTableCoreConfig#zoom
     * @type {number}
     * @default null
     */
    zoom,
    /**
     * @name tooqingui.GridTableCoreConfig#dpr
     * @type {number}
     * @default null
     */
    dpr,
    // Set true to clamp tableOX, tableOY when out-of-bound,
    // Set false when dragging by scroller
    /**
     * @name tooqingui.GridTableCoreConfig#clampTableOY
     * @type {boolean}
     * @default false
     */
    clamplTableOY,
    /**
     * @name tooqingui.GridTableCoreConfig#mask
     * @type {*}
     * @default null
     */
    mask
}
module.exports = GridTableCoreConfig;
/**
 * @namespace tooqingui.SliderConfig
 */
var SliderConfig = {
    /**
     * @name tooqingui.SliderConfig#background
     * @type {*}
     * @default null
     */
    background,
    /**
     * @name tooqingui.SliderConfig#track
     * @type {*}
     * @default null
     */
    track,
    /**
    * @name tooqingui.SliderConfig#thumb
    * @type {*}
    * @default null
    */
    thumb,
    /**
    * @name tooqingui.SliderConfig#input
    * @type {Phaser.Input.InputPlugin}
    * @default null
    */
    input

}
module.exports = SliderConfig;
/**
 * @namespace tooqingui.ScrollerableConfig
 */
var ScrollerableConfig = {
    /**
     * @name tooqingui.ScrollerableConfig#threshold
     * @type {number}
     * @default null
     */
    threshold,
    /**
     * @name tooqingui.ScrollerableConfig#slidingDeceleration
     * @type {number}
     * @default null
     */
    slidingDeceleration,
    /**
     * @name tooqingui.ScrollerableConfig#backDeceleration
     * @type {number}
     * @default null
     */
    backDeceleration
}
module.exports = ScrollerableConfig;
