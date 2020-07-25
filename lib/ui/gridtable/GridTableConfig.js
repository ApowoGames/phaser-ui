"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @namespace apowophaserui.GridTableConfig
 */
var GridTableConfig = {
    /**
     * @name apowophaserui.GridTableConfig#x
     * @type {number=}
     */
    x,
    /**
     * @name apowophaserui.GridTableConfig#y
     * @type {number=}
     */
    y,
    /**
     * @name apowophaserui.GridTableConfig#type
     * @type {string=}
     */
    type,
    /**
     * @name apowophaserui.GridTableConfig#scrollMode
     * @type {number=}
     */
    scrollMode, // 0===>v  1===>h
    /**
     * @name apowophaserui.GridTableConfig#background
     * @type {*=}
     */
    background, // (<any>this.scene).apowophaserui.add.roundRectangle(0, 0, 2, 2, 0, 0xFF9900, .2),基本用来调整mask
    /**
     * @name apowophaserui.GridTableConfig#table
     * @type {*=}
     */
    table,
    /**
     * @name apowophaserui.GridTableConfig#slider
     * @type {*=}
     */
    slider,
    /**
     * @name apowophaserui.GridTableConfig#scroller
     * @type {*=}
     */
    scroller,
    /**
     * @name apowophaserui.GridTableConfig#clamplChildOY
     * @type {boolean=}
     */
    clamplChildOY, // Set true to clamp scrolling. 默认为false
    /**
     * @name apowophaserui.GridTableConfig#header
     * @type {*=}
     */
    header,
    /**
     * @name apowophaserui.GridTableConfig#footer
     * @type {*=}
     */
    footer,
    /**
     * @name apowophaserui.GridTableConfig#child
     * @type {*=}
     */
    child,
    // : {
    //     gameObject: any;
    //     proportion: number; // 比例
    //     expand: boolean; // 是否展开
    // };
    /**
     * @name apowophaserui.GridTableConfig#space
     * @type {*=}
     */
    space,
    // : {
    //     left: number;
    //     right: number;
    //     top: number;
    //     bottom: number;
    //     header: number;
    //     footer: number;
    //     table: number | IPatchesConfig; // number Space between table object and slider object；
    // };
    // Expand width or height of elemen
    /**
     * @name apowophaserui.GridTableConfig#expand
     * @type {*=}
     */
    expand,
    // : {
    //     header: boolean;
    //     footer: boolean;
    // };
    /**
     * @name apowophaserui.GridTableConfig#align
     * @type {*=}
     */
    align,
    // : {
    //     header: AlignType;
    //     footer: AlignType;
    // };
    /**
     * @name apowophaserui.GridTableConfig#createCellContainerCallback
     * @type {function=}
     */
    createCellContainerCallback,
    /**
     * @name apowophaserui.GridTableConfig#items
     * @type {any=}
     */
    items,
    /**
     * @name apowophaserui.GridTableConfig#name
     * @type {string=}
     */
    name,

}
/**
 * @namespace apowophaserui.GridTableCoreConfig
 */
var GridTableCoreConfig = {
    /**
     * @name apowophaserui.GridTableCoreConfig#width
     * @type {number=}
     */
    width,
    /**
     * @name apowophaserui.GridTableCoreConfig#height
     * @type {number=}
     */
    height,
    /**
     * @name apowophaserui.GridTableCoreConfig#scrollMode
     * @type {number=}
     */
    scrollMode,
    /**
     * @name apowophaserui.GridTableCoreConfig#cellWidth
     * @type {number=}
     */
    cellWidth,
    /**
     * @name apowophaserui.GridTableCoreConfig#cellHeight
     * @type {number=}
     */
    cellHeight,
    /**
     * @name apowophaserui.GridTableCoreConfig#cellsCount
     * @type {number=}
     */
    cellsCount,
    /**
     * @name apowophaserui.GridTableCoreConfig#columns
     * @type {number=}
     */
    columns,
    /**
     * @name apowophaserui.GridTableCoreConfig#interactive
     * @type {boolean=}
     */
    interactive,
    /**
     * @name apowophaserui.GridTableCoreConfig#reuseCellContainer
     * @type {boolean=}
     */
    reuseCellContainer,
    /**
     * @name apowophaserui.GridTableCoreConfig#tableOX
     * @type {number=}

     */
    tableOX,
    /**
    * @name apowophaserui.GridTableCoreConfig#tableOY
    * @type {number=}
    */
    tableOY,
    /**
     * @name apowophaserui.GridTableCoreConfig#cellVisibleCallback
     * @type {function=}
     */
    cellVisibleCallback,
    /**
     * @name apowophaserui.GridTableCoreConfig#cellVisibleCallbackScope
     * @type {any=}
     */
    cellVisibleCallbackScope,
    /**
     * @name apowophaserui.GridTableCoreConfig#cellInvisibleCallback
     * @type {function=}

     */
    cellInvisibleCallback,
    /**
     * @name apowophaserui.GridTableCoreConfig#cellInvisibleCallbackScope
     * @type {any=}
     */
    cellInvisibleCallbackScope,
    /**
     * @name apowophaserui.GridTableCoreConfig#cellOriginX
     * @type {number=}
     */
    cellOriginX,
    /**
     * @name apowophaserui.GridTableCoreConfig#cellOriginY
     * @type {number=}
     */
    cellOriginY,
    /**
     * @name apowophaserui.GridTableCoreConfig#cellPadX
     * @type {number=}
     */
    cellPadX,
    /**
     * @name apowophaserui.GridTableCoreConfig#cellPadY
     * @type {number=}
     */
    cellPadY,
    /**
     * @name apowophaserui.GridTableCoreConfig#zoom
     * @type {number=}

     */
    zoom,
    /**
     * @name apowophaserui.GridTableCoreConfig#dpr
     * @type {number=}
     */
    dpr,
    // Set true to clamp tableOX, tableOY when out-of-bound,
    // Set false when dragging by scroller
    /**
     * @name apowophaserui.GridTableCoreConfig#clampTableOY
     * @type {boolean=}
     */
    clamplTableOY,
    /**
     * @name apowophaserui.GridTableCoreConfig#mask
     * @type {*=}
     */
    mask
}
/**
 * @namespace apowophaserui.SliderConfig
 */
var SliderConfig = {
    /**
     * @name apowophaserui.SliderConfig#background
     * @type {*=}
     */
    background,
    /**
     * @name apowophaserui.SliderConfig#track
     * @type {*=}
     */
    track,
    /**
    * @name apowophaserui.SliderConfig#thumb
    * @type {*=}
    */
    thumb,
    /**
    * @name apowophaserui.SliderConfig#input
    * @type {Phaser.Input.InputPlugin=}
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
     * @type {number=}
     */
    threshold,
    /**
     * @name apowophaserui.ScrollerableConfig#slidingDeceleration
     * @type {number=}
     */
    slidingDeceleration,
    /**
     * @name apowophaserui.ScrollerableConfig#backDeceleration
     * @type {number=}
     */
    backDeceleration
}
export { GridTableConfig, GridTableCoreConfig, ScrollerableConfig };
