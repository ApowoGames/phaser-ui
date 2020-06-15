import { AlignType } from "../interface/pos/Align";
import { IPatchesConfig } from "../interface/baseUI/Patches.config";

export interface GridTableConfig {
  x?: number;
  y?: number;
  type?: string;
  scrollMode?: number; // 0===>v  1===>h
  background?: any; // (<any>this.scene).TooqingUI.add.roundRectangle(0, 0, 2, 2, 0, 0xFF9900, .2),基本用来调整mask
  table?: GridTableCoreConfig;
  slider?: SliderConfig;
  scroller?: ScrollerableConfig;
  clamplChildOY?: boolean; // Set true to clamp scrolling. 默认为false
  header?: any;
  footer?: any;
  child?: {
    gameObject: any;
    proportion: number; // 比例
    expand: boolean; // 是否展开
  };
  space?: {
    left?: number;
    right?: number;
    top?: number;
    bottom?: number;
    header?: number;
    footer?: number;
    table?: number | IPatchesConfig; // number Space between table object and slider object；
  };
  // Expand width or height of elemen
  expand?: {
    header?: boolean;
    footer?: boolean;
  };
  align?: {
    header?: AlignType;
    footer?: AlignType;
  };
  createCellContainerCallback?: Function;
  items?: []; // Array of item data for each cell.
  name?: string; // Set name of this gridTable.
}
export interface GridTableCoreConfig {
  width?: number;
  height?: number;
  scrollMode?: number; // 0===>v  1===>h
  cellWidth?: number;
  cellHeight?: number;
  cellsCount?: number; // Total cells count.不能用于动态改变数据的ui中
  columns?: number; // Columns count of each row.
  interactive?: boolean; // 默认true
  reuseCellContainer?: boolean; // 是否重用子对象 默认false
  tableOX?: number; // table的x 偏移
  tableOY?: number; // table的y 偏移
  cellVisibleCallback?: Function;
  cellVisibleCallbackScope?: number[];
  cellInvisibleCallback?: Function;
  cellInvisibleCallbackScope?: number[];
  // 子对象的originX 默认为0.5
  cellOriginX?: number;
  // 子对象的originY 默认为0.5
  cellOriginY?: number;
  // 子对象x偏移
  cellPadX?: number;
  // 子对象y偏移
  cellPadY?: number;
  zoom?: number;
  dpr?: number;
  // Set true to clamp tableOX, tableOY when out-of-bound,
  // Set false when dragging by scroller
  clamplTableOY?: boolean;
  // Set false no mask
  mask?: any;
}
export interface SliderConfig {
  background?: any;
  track?: any;
  thumb?: any;
  input?: Phaser.Input.InputPlugin; // drag,click,none
}
export interface ScrollerableConfig {
  threshold?: number; // Minimal movement to scroll. Set 0 to scroll immediately.
  slidingDeceleration?: number; // Deceleration of slow down when dragging released set false to disable it
  backDeceleration?: number; // Deceleration of pull back when out of bounds set false to disable it
}
