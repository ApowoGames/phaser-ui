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
    x:0,
    /**
     * @name apowophaserui.GridTableConfig#y
     * @type {number=}
     */
    y:0,
    /**
     * @name apowophaserui.GridTableConfig#type
     * @type {string=}
     */
    type:undefined,
    /**
     * @name apowophaserui.GridTableConfig#scrollMode
     * @type {number=}
     */
    scrollMode:0, // 0===>v  1===>h
    /**
     * @name apowophaserui.GridTableConfig#background
     * @type {*=}
     */
    background:undefined, // (<any>this.scene).apowophaserui.add.roundRectangle(0, 0, 2, 2, 0, 0xFF9900, .2),基本用来调整mask
    /**
     * @name apowophaserui.GridTableConfig#table
     * @type {*=}
     */
    table:undefined,
    /**
     * @name apowophaserui.GridTableConfig#slider
     * @type {*=}
     */
    slider:undefined,
    /**
     * @name apowophaserui.GridTableConfig#scroller
     * @type {*=}
     */
    scroller:undefined,
    /**
     * @name apowophaserui.GridTableConfig#clamplChildOY
     * @type {boolean=}
     */
    clamplChildOY:false, // Set true to clamp scrolling. 默认为false
    /**
     * @name apowophaserui.GridTableConfig#header
     * @type {*=}
     */
    header:undefined,
    /**
     * @name apowophaserui.GridTableConfig#footer
     * @type {*=}
     */
    footer:undefined,
    /**
     * @name apowophaserui.GridTableConfig#child
     * @type {*=}
     */
    child:undefined,
    // : {
    //     gameObject: any;
    //     proportion: number; // 比例
    //     expand: boolean; // 是否展开
    // };
    /**
     * @name apowophaserui.GridTableConfig#space
     * @type {*=}
     */
    space:undefined,
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
    expand:undefined,
    // : {
    //     header: boolean;
    //     footer: boolean;
    // };
    /**
     * @name apowophaserui.GridTableConfig#align
     * @type {*=}
     */
    align:undefined,
    // : {
    //     header: AlignType;
    //     footer: AlignType;
    // };
    /**
     * @name apowophaserui.GridTableConfig#createCellContainerCallback
     * @type {function=}
     */
    createCellContainerCallback:undefined,
    /**
     * @name apowophaserui.GridTableConfig#items
     * @type {any=}
     */
    items:undefined,
    /**
     * @name apowophaserui.GridTableConfig#name
     * @type {string=}
     */
    name:undefined,

}
/**
 * @namespace apowophaserui.GridTableCoreConfig
 */
var GridTableCoreConfig = {
    /**
     * @name apowophaserui.GridTableCoreConfig#width
     * @type {number=}
     */
    width:0,
    /**
     * @name apowophaserui.GridTableCoreConfig#height
     * @type {number=}
     */
    height:0,
    /**
     * @name apowophaserui.GridTableCoreConfig#scrollMode
     * @type {number=}
     */
    scrollMode:0,
    /**
     * @name apowophaserui.GridTableCoreConfig#cellWidth
     * @type {number=}
     */
    cellWidth:0,
    /**
     * @name apowophaserui.GridTableCoreConfig#cellHeight
     * @type {number=}
     */
    cellHeight:0,
    /**
     * @name apowophaserui.GridTableCoreConfig#cellsCount
     * @type {number=}
     */
    cellsCount:undefined,
    /**
     * @name apowophaserui.GridTableCoreConfig#columns
     * @type {number=}
     */
    columns:undefined,
    /**
     * @name apowophaserui.GridTableCoreConfig#interactive
     * @type {boolean=}
     */
    interactive:false,
    /**
     * @name apowophaserui.GridTableCoreConfig#reuseCellContainer
     * @type {boolean=}
     */
    reuseCellContainer:false,
    /**
     * @name apowophaserui.GridTableCoreConfig#tableOX
     * @type {number=}

     */
    tableOX:0,
    /**
    * @name apowophaserui.GridTableCoreConfig#tableOY
    * @type {number=}
    */
    tableOY:0,
    /**
     * @name apowophaserui.GridTableCoreConfig#cellVisibleCallback
     * @type {function=}
     */
    cellVisibleCallback:undefined,
    /**
     * @name apowophaserui.GridTableCoreConfig#cellVisibleCallbackScope
     * @type {any=}
     */
    cellVisibleCallbackScope:undefined,
    /**
     * @name apowophaserui.GridTableCoreConfig#cellInvisibleCallback
     * @type {function=}

     */
    cellInvisibleCallback:undefined,
    /**
     * @name apowophaserui.GridTableCoreConfig#cellInvisibleCallbackScope
     * @type {any=}
     */
    cellInvisibleCallbackScope:undefined,
    /**
     * @name apowophaserui.GridTableCoreConfig#cellOriginX
     * @type {number=}
     */
    cellOriginX:undefined,
    /**
     * @name apowophaserui.GridTableCoreConfig#cellOriginY
     * @type {number=}
     */
    cellOriginY:undefined,
    /**
     * @name apowophaserui.GridTableCoreConfig#cellPadX
     * @type {number=}
     */
    cellPadX:undefined,
    /**
     * @name apowophaserui.GridTableCoreConfig#cellPadY
     * @type {number=}
     */
    cellPadY:undefined,
    /**
     * @name apowophaserui.GridTableCoreConfig#zoom
     * @type {number=}

     */
    zoom:undefined,
    /**
     * @name apowophaserui.GridTableCoreConfig#dpr
     * @type {number=}
     */
    dpr:1,
    // Set true to clamp tableOX, tableOY when out-of-bound,
    // Set false when dragging by scroller
    /**
     * @name apowophaserui.GridTableCoreConfig#clampTableOY
     * @type {boolean=}
     */
    clamplTableOY:undefined,
    /**
     * @name apowophaserui.GridTableCoreConfig#mask
     * @type {*=}
     */
    mask:undefined
}
/**
 * @namespace apowophaserui.SliderConfig
 */
var SliderConfig = {
    /**
     * @name apowophaserui.SliderConfig#background
     * @type {*=}
     */
    background:undefined,
    /**
     * @name apowophaserui.SliderConfig#track
     * @type {*=}
     */
    track:undefined,
    /**
    * @name apowophaserui.SliderConfig#thumb
    * @type {*=}
    */
    thumb:undefined,
    /**
    * @name apowophaserui.SliderConfig#input
    * @type {Phaser.Input.InputPlugin=}
    */
    input:undefined

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
    threshold:undefined,
    /**
     * @name apowophaserui.ScrollerableConfig#slidingDeceleration
     * @type {number=}
     */
    slidingDeceleration:undefined,
    /**
     * @name apowophaserui.ScrollerableConfig#backDeceleration
     * @type {number=}
     */
    backDeceleration:undefined
}
export { GridTableConfig, GridTableCoreConfig, ScrollerableConfig };
