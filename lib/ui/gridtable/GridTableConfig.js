"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @namespace apowophaserui.GridTableConfig
 */
var GridTableConfig = {
    /**
     * @name apowophaserui.GridTableConfig#x
     * @type {number}
     * @default 0
     */
    x,
    /**
     * @name apowophaserui.GridTableConfig#y
     * @type {number}
     * @default 0
     */
    y,
    /**
     * @name apowophaserui.GridTableConfig#type
     * @type {string}
     * @default null
     */
    type,
    /**
     * @name apowophaserui.GridTableConfig#scrollMode
     * @type {number}
     * @default 0
     */
    scrollMode, // 0===>v  1===>h
    /**
     * @name apowophaserui.GridTableConfig#background
     * @type {*}
     * @default null
     */
    background, // (<any>this.scene).apowophaserui.add.roundRectangle(0, 0, 2, 2, 0, 0xFF9900, .2),基本用来调整mask
    /**
     * @name apowophaserui.GridTableConfig#table
     * @type {*}
     * @default null
     */
    table,
    /**
     * @name apowophaserui.GridTableConfig#slider
     * @type {*}
     * @default null
     */
    slider,
    /**
     * @name apowophaserui.GridTableConfig#scroller
     * @type {*}
     * @default null
     */
    scroller,
    /**
     * @name apowophaserui.GridTableConfig#clamplChildOY
     * @type {boolean}
     * @default false
     */
    clamplChildOY, // Set true to clamp scrolling. 默认为false
    /**
     * @name apowophaserui.GridTableConfig#header
     * @type {*}
     * @default null
     */
    header,
    /**
     * @name apowophaserui.GridTableConfig#footer
     * @type {*}
     * @default null
     */
    footer,
    /**
     * @name apowophaserui.GridTableConfig#child
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
     * @name apowophaserui.GridTableConfig#space
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
     * @name apowophaserui.GridTableConfig#expand
     * @type {*}
     * @default null
     */
    expand,
    // : {
    //     header?: boolean;
    //     footer?: boolean;
    // };
    /**
     * @name apowophaserui.GridTableConfig#align
     * @type {*}
     * @default null
     */
    align,
    // : {
    //     header?: AlignType;
    //     footer?: AlignType;
    // };
    /**
     * @name apowophaserui.GridTableConfig#createCellContainerCallback
     * @type {function}
     * @default null
     */
    createCellContainerCallback,
    /**
     * @name apowophaserui.GridTableConfig#items
     * @type {any[]}
     * @default null
     */
    items,
    /**
     * @name apowophaserui.GridTableConfig#name
     * @type {string}
     * @default null
     */
    name,

}
/**
 * @namespace apowophaserui.GridTableCoreConfig
 */
var GridTableCoreConfig = {
    /**
     * @name apowophaserui.GridTableCoreConfig#width
     * @type {number}
     * @default 0
     */
    width,
    /**
     * @name apowophaserui.GridTableCoreConfig#height
     * @type {number}
     * @default 0
     */
    height,
    /**
     * @name apowophaserui.GridTableCoreConfig#scrollMode
     * @type {number}
     * @default 0
     */
    scrollMode,
    /**
     * @name apowophaserui.GridTableCoreConfig#cellWidth
     * @type {number}
     * @default 0
     */
    cellWidth,
    /**
     * @name apowophaserui.GridTableCoreConfig#cellHeight
     * @type {number}
     * @default 0
     */
    cellHeight,
    /**
     * @name apowophaserui.GridTableCoreConfig#cellsCount
     * @type {number}
     * @default 0
     */
    cellsCount,
    /**
     * @name apowophaserui.GridTableCoreConfig#columns
     * @type {number}
     * @default 0
     */
    columns,
    /**
     * @name apowophaserui.GridTableCoreConfig#interactive
     * @type {boolean}
     * @default true
     */
    interactive,
    /**
     * @name apowophaserui.GridTableCoreConfig#reuseCellContainer
     * @type {boolean}
     * @default false
     */
    reuseCellContainer,
    /**
     * @name apowophaserui.GridTableCoreConfig#tableOX
     * @type {number}
     * @default 0
     */
    tableOX,
    /**
    * @name apowophaserui.GridTableCoreConfig#tableOY
    * @type {number}
    * @default 0
    */
    tableOY,
    /**
     * @name apowophaserui.GridTableCoreConfig#cellVisibleCallback
     * @type {function}
     * @default null
     */
    cellVisibleCallback,
    /**
     * @name apowophaserui.GridTableCoreConfig#cellVisibleCallbackScope
     * @type {number[]}
     * @default null
     */
    cellVisibleCallbackScope,
    /**
     * @name apowophaserui.GridTableCoreConfig#cellInvisibleCallback
     * @type {function}
     * @default null
     */
    cellInvisibleCallback,
    /**
     * @name apowophaserui.GridTableCoreConfig#cellInvisibleCallbackScope
     * @type {number[]}
     * @default null
     */
    cellInvisibleCallbackScope,
    /**
     * @name apowophaserui.GridTableCoreConfig#cellOriginX
     * @type {number}
     * @default 0.5
     */
    cellOriginX,
    /**
     * @name apowophaserui.GridTableCoreConfig#cellOriginY
     * @type {number}
     * @default 0.5
     */
    cellOriginY,
    /**
     * @name apowophaserui.GridTableCoreConfig#cellPadX
     * @type {number}
     * @default null
     */
    cellPadX,
    /**
     * @name apowophaserui.GridTableCoreConfig#cellPadY
     * @type {number}
     * @default null
     */
    cellPadY,
    /**
     * @name apowophaserui.GridTableCoreConfig#zoom
     * @type {number}
     * @default null
     */
    zoom,
    /**
     * @name apowophaserui.GridTableCoreConfig#dpr
     * @type {number}
     * @default null
     */
    dpr,
    // Set true to clamp tableOX, tableOY when out-of-bound,
    // Set false when dragging by scroller
    /**
     * @name apowophaserui.GridTableCoreConfig#clampTableOY
     * @type {boolean}
     * @default false
     */
    clamplTableOY,
    /**
     * @name apowophaserui.GridTableCoreConfig#mask
     * @type {*}
     * @default null
     */
    mask
}
/**
 * @namespace apowophaserui.SliderConfig
 */
var SliderConfig = {
    /**
     * @name apowophaserui.SliderConfig#background
     * @type {*}
     * @default null
     */
    background,
    /**
     * @name apowophaserui.SliderConfig#track
     * @type {*}
     * @default null
     */
    track,
    /**
    * @name apowophaserui.SliderConfig#thumb
    * @type {*}
    * @default null
    */
    thumb,
    /**
    * @name apowophaserui.SliderConfig#input
    * @type {Phaser.Input.InputPlugin}
    * @default null
    */
    input

}
export { SliderConfig }
/**
 * @namespace apowophaserui.ScrollerableConfig
 */
var ScrollerableConfig = {
    /**
     * @name apowophaserui.ScrollerableConfig#threshold
     * @type {number}
     * @default null
     */
    threshold,
    /**
     * @name apowophaserui.ScrollerableConfig#slidingDeceleration
     * @type {number}
     * @default null
     */
    slidingDeceleration,
    /**
     * @name apowophaserui.ScrollerableConfig#backDeceleration
     * @type {number}
     * @default null
     */
    backDeceleration
}
export { GridTableConfig, GridTableCoreConfig, ScrollerableConfig };
