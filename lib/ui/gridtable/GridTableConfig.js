"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @namespace phaserui.GridTableConfig
 */
var GridTableConfig = {
    /**
     * @name phaserui.GridTableConfig#x
     * @type {number}
     * @default 0
     */
    x,
    /**
     * @name phaserui.GridTableConfig#y
     * @type {number}
     * @default 0
     */
    y,
    /**
     * @name phaserui.GridTableConfig#type
     * @type {string}
     * @default null
     */
    type,
    /**
     * @name phaserui.GridTableConfig#scrollMode
     * @type {number}
     * @default 0
     */
    scrollMode, // 0===>v  1===>h
    /**
     * @name phaserui.GridTableConfig#background
     * @type {*}
     * @default null
     */
    background, // (<any>this.scene).phaserui.add.roundRectangle(0, 0, 2, 2, 0, 0xFF9900, .2),基本用来调整mask
    /**
     * @name phaserui.GridTableConfig#table
     * @type {*}
     * @default null
     */
    table,
    /**
     * @name phaserui.GridTableConfig#slider
     * @type {*}
     * @default null
     */
    slider,
    /**
     * @name phaserui.GridTableConfig#scroller
     * @type {*}
     * @default null
     */
    scroller,
    /**
     * @name phaserui.GridTableConfig#clamplChildOY
     * @type {boolean}
     * @default false
     */
    clamplChildOY, // Set true to clamp scrolling. 默认为false
    /**
     * @name phaserui.GridTableConfig#header
     * @type {*}
     * @default null
     */
    header,
    /**
     * @name phaserui.GridTableConfig#footer
     * @type {*}
     * @default null
     */
    footer,
    /**
     * @name phaserui.GridTableConfig#child
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
     * @name phaserui.GridTableConfig#space
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
     * @name phaserui.GridTableConfig#expand
     * @type {*}
     * @default null
     */
    expand,
    // : {
    //     header?: boolean;
    //     footer?: boolean;
    // };
    /**
     * @name phaserui.GridTableConfig#align
     * @type {*}
     * @default null
     */
    align,
    // : {
    //     header?: AlignType;
    //     footer?: AlignType;
    // };
    /**
     * @name phaserui.GridTableConfig#createCellContainerCallback
     * @type {function}
     * @default null
     */
    createCellContainerCallback,
    /**
     * @name phaserui.GridTableConfig#items
     * @type {any[]}
     * @default null
     */
    items,
    /**
     * @name phaserui.GridTableConfig#name
     * @type {string}
     * @default null
     */
    name,

}
/**
 * @namespace phaserui.GridTableCoreConfig
 */
var GridTableCoreConfig = {
    /**
     * @name phaserui.GridTableCoreConfig#width
     * @type {number}
     * @default 0
     */
    width,
    /**
     * @name phaserui.GridTableCoreConfig#height
     * @type {number}
     * @default 0
     */
    height,
    /**
     * @name phaserui.GridTableCoreConfig#scrollMode
     * @type {number}
     * @default 0
     */
    scrollMode,
    /**
     * @name phaserui.GridTableCoreConfig#cellWidth
     * @type {number}
     * @default 0
     */
    cellWidth,
    /**
     * @name phaserui.GridTableCoreConfig#cellHeight
     * @type {number}
     * @default 0
     */
    cellHeight,
    /**
     * @name phaserui.GridTableCoreConfig#cellsCount
     * @type {number}
     * @default 0
     */
    cellsCount,
    /**
     * @name phaserui.GridTableCoreConfig#columns
     * @type {number}
     * @default 0
     */
    columns,
    /**
     * @name phaserui.GridTableCoreConfig#interactive
     * @type {boolean}
     * @default true
     */
    interactive,
    /**
     * @name phaserui.GridTableCoreConfig#reuseCellContainer
     * @type {boolean}
     * @default false
     */
    reuseCellContainer,
    /**
     * @name phaserui.GridTableCoreConfig#tableOX
     * @type {number}
     * @default 0
     */
    tableOX,
    /**
    * @name phaserui.GridTableCoreConfig#tableOY
    * @type {number}
    * @default 0
    */
    tableOY,
    /**
     * @name phaserui.GridTableCoreConfig#cellVisibleCallback
     * @type {function}
     * @default null
     */
    cellVisibleCallback,
    /**
     * @name phaserui.GridTableCoreConfig#cellVisibleCallbackScope
     * @type {number[]}
     * @default null
     */
    cellVisibleCallbackScope,
    /**
     * @name phaserui.GridTableCoreConfig#cellInvisibleCallback
     * @type {function}
     * @default null
     */
    cellInvisibleCallback,
    /**
     * @name phaserui.GridTableCoreConfig#cellInvisibleCallbackScope
     * @type {number[]}
     * @default null
     */
    cellInvisibleCallbackScope,
    /**
     * @name phaserui.GridTableCoreConfig#cellOriginX
     * @type {number}
     * @default 0.5
     */
    cellOriginX,
    /**
     * @name phaserui.GridTableCoreConfig#cellOriginY
     * @type {number}
     * @default 0.5
     */
    cellOriginY,
    /**
     * @name phaserui.GridTableCoreConfig#cellPadX
     * @type {number}
     * @default null
     */
    cellPadX,
    /**
     * @name phaserui.GridTableCoreConfig#cellPadY
     * @type {number}
     * @default null
     */
    cellPadY,
    /**
     * @name phaserui.GridTableCoreConfig#zoom
     * @type {number}
     * @default null
     */
    zoom,
    /**
     * @name phaserui.GridTableCoreConfig#dpr
     * @type {number}
     * @default null
     */
    dpr,
    // Set true to clamp tableOX, tableOY when out-of-bound,
    // Set false when dragging by scroller
    /**
     * @name phaserui.GridTableCoreConfig#clampTableOY
     * @type {boolean}
     * @default false
     */
    clamplTableOY,
    /**
     * @name phaserui.GridTableCoreConfig#mask
     * @type {*}
     * @default null
     */
    mask
}
/**
 * @namespace phaserui.SliderConfig
 */
var SliderConfig = {
    /**
     * @name phaserui.SliderConfig#background
     * @type {*}
     * @default null
     */
    background,
    /**
     * @name phaserui.SliderConfig#track
     * @type {*}
     * @default null
     */
    track,
    /**
    * @name phaserui.SliderConfig#thumb
    * @type {*}
    * @default null
    */
    thumb,
    /**
    * @name phaserui.SliderConfig#input
    * @type {Phaser.Input.InputPlugin}
    * @default null
    */
    input

}
export { SliderConfig }
/**
 * @namespace phaserui.ScrollerableConfig
 */
var ScrollerableConfig = {
    /**
     * @name phaserui.ScrollerableConfig#threshold
     * @type {number}
     * @default null
     */
    threshold,
    /**
     * @name phaserui.ScrollerableConfig#slidingDeceleration
     * @type {number}
     * @default null
     */
    slidingDeceleration,
    /**
     * @name phaserui.ScrollerableConfig#backDeceleration
     * @type {number}
     * @default null
     */
    backDeceleration
}
export { GridTableConfig, GridTableCoreConfig, ScrollerableConfig };
