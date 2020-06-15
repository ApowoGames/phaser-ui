"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @namespace Tooqingui.GridTableConfig
 */
var GridTableConfig = {
    /**
     * @name Tooqingui.GridTableConfig#x
     * @type {number}
     * @default 0
     */
    x,
    /**
     * @name Tooqingui.GridTableConfig#y
     * @type {number}
     * @default 0
     */
    y,
    /**
     * @name Tooqingui.GridTableConfig#type
     * @type {string}
     * @default null
     */
    type,
    /**
     * @name Tooqingui.GridTableConfig#scrollMode
     * @type {number}
     * @default 0
     */
    scrollMode, // 0===>v  1===>h
    /**
     * @name Tooqingui.GridTableConfig#background
     * @type {*}
     * @default null
     */
    background, // (<any>this.scene).Tooqingui.add.roundRectangle(0, 0, 2, 2, 0, 0xFF9900, .2),基本用来调整mask
    /**
     * @name Tooqingui.GridTableConfig#table
     * @type {*}
     * @default null
     */
    table,
    /**
     * @name Tooqingui.GridTableConfig#slider
     * @type {*}
     * @default null
     */
    slider,
    /**
     * @name Tooqingui.GridTableConfig#scroller
     * @type {*}
     * @default null
     */
    scroller,
    /**
     * @name Tooqingui.GridTableConfig#clamplChildOY
     * @type {boolean}
     * @default false
     */
    clamplChildOY, // Set true to clamp scrolling. 默认为false
    /**
     * @name Tooqingui.GridTableConfig#header
     * @type {*}
     * @default null
     */
    header,
    /**
     * @name Tooqingui.GridTableConfig#footer
     * @type {*}
     * @default null
     */
    footer,
    /**
     * @name Tooqingui.GridTableConfig#child
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
     * @name Tooqingui.GridTableConfig#space
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
     * @name Tooqingui.GridTableConfig#expand
     * @type {*}
     * @default null
     */
    expand,
    // : {
    //     header?: boolean;
    //     footer?: boolean;
    // };
    /**
     * @name Tooqingui.GridTableConfig#align
     * @type {*}
     * @default null
     */
    align,
    // : {
    //     header?: AlignType;
    //     footer?: AlignType;
    // };
    /**
     * @name Tooqingui.GridTableConfig#createCellContainerCallback
     * @type {function}
     * @default null
     */
    createCellContainerCallback,
    /**
     * @name Tooqingui.GridTableConfig#items
     * @type {any[]}
     * @default null
     */
    items,
    /**
     * @name Tooqingui.GridTableConfig#name
     * @type {string}
     * @default null
     */
    name,

}
module.exports = GridTableConfig;
/**
 * @namespace Tooqingui.GridTableCoreConfig
 */
var GridTableCoreConfig = {
    /**
     * @name Tooqingui.GridTableCoreConfig#width
     * @type {number}
     * @default 0
     */
    width,
    /**
     * @name Tooqingui.GridTableCoreConfig#height
     * @type {number}
     * @default 0
     */
    height,
    /**
     * @name Tooqingui.GridTableCoreConfig#scrollMode
     * @type {number}
     * @default 0
     */
    scrollMode,
    /**
     * @name Tooqingui.GridTableCoreConfig#cellWidth
     * @type {number}
     * @default 0
     */
    cellWidth,
    /**
     * @name Tooqingui.GridTableCoreConfig#cellHeight
     * @type {number}
     * @default 0
     */
    cellHeight,
    /**
     * @name Tooqingui.GridTableCoreConfig#cellsCount
     * @type {number}
     * @default 0
     */
    cellsCount,
    /**
     * @name Tooqingui.GridTableCoreConfig#columns
     * @type {number}
     * @default 0
     */
    columns,
    /**
     * @name Tooqingui.GridTableCoreConfig#interactive
     * @type {boolean}
     * @default true
     */
    interactive,
    /**
     * @name Tooqingui.GridTableCoreConfig#reuseCellContainer
     * @type {boolean}
     * @default false
     */
    reuseCellContainer,
    /**
     * @name Tooqingui.GridTableCoreConfig#tableOX
     * @type {number}
     * @default 0
     */
    tableOX,
    /**
    * @name Tooqingui.GridTableCoreConfig#tableOY
    * @type {number}
    * @default 0
    */
    tableOY,
    /**
     * @name Tooqingui.GridTableCoreConfig#cellVisibleCallback
     * @type {function}
     * @default null
     */
    cellVisibleCallback,
    /**
     * @name Tooqingui.GridTableCoreConfig#cellVisibleCallbackScope
     * @type {number[]}
     * @default null
     */
    cellVisibleCallbackScope,
    /**
     * @name Tooqingui.GridTableCoreConfig#cellInvisibleCallback
     * @type {function}
     * @default null
     */
    cellInvisibleCallback,
    /**
     * @name Tooqingui.GridTableCoreConfig#cellInvisibleCallbackScope
     * @type {number[]}
     * @default null
     */
    cellInvisibleCallbackScope,
    /**
     * @name Tooqingui.GridTableCoreConfig#cellOriginX
     * @type {number}
     * @default 0.5
     */
    cellOriginX,
    /**
     * @name Tooqingui.GridTableCoreConfig#cellOriginY
     * @type {number}
     * @default 0.5
     */
    cellOriginY,
    /**
     * @name Tooqingui.GridTableCoreConfig#cellPadX
     * @type {number}
     * @default null
     */
    cellPadX,
    /**
     * @name Tooqingui.GridTableCoreConfig#cellPadY
     * @type {number}
     * @default null
     */
    cellPadY,
    /**
     * @name Tooqingui.GridTableCoreConfig#zoom
     * @type {number}
     * @default null
     */
    zoom,
    /**
     * @name Tooqingui.GridTableCoreConfig#dpr
     * @type {number}
     * @default null
     */
    dpr,
    // Set true to clamp tableOX, tableOY when out-of-bound,
    // Set false when dragging by scroller
    /**
     * @name Tooqingui.GridTableCoreConfig#clampTableOY
     * @type {boolean}
     * @default false
     */
    clamplTableOY,
    /**
     * @name Tooqingui.GridTableCoreConfig#mask
     * @type {*}
     * @default null
     */
    mask
}
module.exports = GridTableCoreConfig;
/**
 * @namespace Tooqingui.SliderConfig
 */
var SliderConfig = {
    /**
     * @name Tooqingui.SliderConfig#background
     * @type {*}
     * @default null
     */
    background,
    /**
     * @name Tooqingui.SliderConfig#track
     * @type {*}
     * @default null
     */
    track,
    /**
    * @name Tooqingui.SliderConfig#thumb
    * @type {*}
    * @default null
    */
    thumb,
    /**
    * @name Tooqingui.SliderConfig#input
    * @type {Phaser.Input.InputPlugin}
    * @default null
    */
    input

}
module.exports = SliderConfig;
/**
 * @namespace Tooqingui.ScrollerableConfig
 */
var ScrollerableConfig = {
    /**
     * @name Tooqingui.ScrollerableConfig#threshold
     * @type {number}
     * @default null
     */
    threshold,
    /**
     * @name Tooqingui.ScrollerableConfig#slidingDeceleration
     * @type {number}
     * @default null
     */
    slidingDeceleration,
    /**
     * @name Tooqingui.ScrollerableConfig#backDeceleration
     * @type {number}
     * @default null
     */
    backDeceleration
}
module.exports = ScrollerableConfig;
