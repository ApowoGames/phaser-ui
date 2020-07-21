"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
import GridTable from "./GridTable.js";
const GetValue = Phaser.Utils.Objects.GetValue;

/**
 * @class GameGridTable
 * @memberof apowophaserui
 * @constructor
 * @extends Phaser.Events.EventEmitter
 * @param {Phaser.Scene} scene
 * @param {*} [config]
 */
class GameGridTable extends Phaser.Events.EventEmitter {
    constructor(scene, config) {
        super();
        this.mGridTable = new GridTable(scene, config);
        this.mConfig = config;
        this.addListen();
    }
    /**
     * @method apowophaserui.GameGridTable#adjustScrollMode
     * @param {*} mode 
     */
    adjustScrollMode(mode) {
        // // Pre-process cell size
        // this.mConfig.scrollMode = mode;
        // const tableCoreConfig: GridTableCoreConfig;
        // let cellWidth: number;
        // let cellHeight: number;
        // if (mode === 0) { // scroll y
        //     cellWidth = GetValue(tableCoreConfig, "cellWidth", undefined);
        //     this.expandCellSize = (cellWidth === undefined);
        //     if (cellWidth === undefined) {
        //         var columns = GetValue(tableCoreConfig, "columns", 1);
        //         this.mConfig.cellWidth = this.width / columns;
        //     }
        // } else { // scroll x
        //     // Swap cell width and cell height
        //     cellWidth = GetValue(tableCoreConfig, "cellHeight", undefined);
        //     cellHeight = GetValue(tableCoreConfig, 'cellWidth', undefined);
        //     this.expandCellSize = (cellWidth === undefined);
        //     config.cellWidth = cellWidth;
        //     config.cellHeight = cellHeight;
        // }
        // this.table = new Table(this, config);
    }
    /**
     * 调整gridtable遮照范围
     * @method apowophaserui.GameGridTable#adjustMask
     * @param {number} width
     * @param {number} height
     * @param {number} x
     * @param {number} y
     */
    adjustMask(x = this.mConfig.x, y = this.mConfig.y, width, height) {
        if (!this.mGridTable)
            return;
        this.mGridTable.x = x;
        this.mGridTable.y = y;
        if (width !== this.mGridTable.width || height !== this.mGridTable.height) {
            this.mGridTable.resize(width, height);
        }
    }
    /**
     * @name apowophaserui.GameGridTable#gridTable
     * @return {*}
     */
    get gridTable() {
        return this.mGridTable;
    }
    /**
     * @name apowophaserui.GameGridTable#childrenMap
     * @return {*}
     */
    get childrenMap() {
        if (this.mGridTable)
            return this.mGridTable.childrenMap;
        return undefined;
    }
    /**
     * @name apowophaserui.GameGridTable#table
     * @return {*}
     */
    get table() {
        if (this.mGridTable)
            return this.mGridTable.getElement("table");
        return undefined;
    }
    /**
     * Only worked when scrollMode is 0
     * @method apowophaserui.GameGridTable#adjustCellHeight
     * @param {number} hei
     */
    adjustCellHeight(hei) {
        if (!this.mGridTable)
            return;
        const cells = this.mGridTable.getCells();
        for (let i = 0, len = cells.length; i < len; i++) {
            this.mGridTable.setCellHeight(i, hei);
        }
    }
    /**
     * Only worked when scrollMode is 1
     * @method apowophaserui.GameGridTable#adjusetCellWidth
     * @param {number} wid
     */
    adjusetCellWidth(wid) {
        if (!this.mGridTable)
            return;
        const cells = this.mGridTable.getCells();
        for (let i = 0, len = cells.length; i < len; i++) {
            this.mGridTable.setCellWidth(i, wid);
        }
    }
    /**
     * @name apowophaserui.GameGridTable#items
     * @return {*}
     */
    get items() {
        if (!this.mGridTable)
            return null;
        return this.mGridTable.items;
    }
    /**
     * @method apowophaserui.GameGridTable#setItems
     * @param {*} items 
     */
    setItems(items) {
        if (this.mGridTable) {
            this.mGridTable.setItems(items);
            this.mGridTable.layout();
        }
    }
    /**
     * @method apowophaserui.GameGridTable#setColumnCount
     * @param {number} cnt 
     */
    setColumnCount(cnt) {
        this.mGridTable.setColumnCount(cnt);
        return this;
    }
    /**
     * @method apowophaserui.GameGridTable#getCells
     * @return {*}
     */
    getCells() {
        return this.mGridTable.getCells();
    }
    /**
     * @method apowophaserui.GameGridTable#getCell
     * @param {number} cellIdx 
     * @return {*}
     */
    getCell(cellIdx) {
        return this.mGridTable.getCell(cellIdx, true);
    }
    /**
     * @method apowophaserui.GameGridTable#setT
     * @param {number} value 
     */
    setT(value) {
        if (this.mGridTable)
            this.mGridTable.setT(value);
    }
    /**
     * @method apowophaserui.GameGridTable#addListen
     */
    addListen() {
        if (this.mGridTable) {
            this.mGridTable.on("cell.1tap", this.cellTapHandler, this);
        }
    }
    /**
     * @method apowophaserui.GameGridTable#removeListen
     */
    removeListen() {
        if (this.mGridTable) {
            this.mGridTable.off("cell.1tap", this.cellTapHandler, this);
        }
    }
    set x(value) {
        if (this.mGridTable)
            this.mGridTable.x = value;
    }
    /**
     * @name apowophaserui.GameGridTable#x
     * @type {number}
     * @return {number}
     */
    get x() {
        if (!this.mGridTable)
            return 0;
        return this.mGridTable.x;
    }
    set y(value) {
        if (this.mGridTable)
            this.mGridTable.y = value;
    }
    /**
     * @name apowophaserui.GameGridTable#y
     * @type {number}
     * @return {number}
     */
    get y() {
        if (!this.mGridTable)
            return 0;
        return this.mGridTable.y;
    }
    /**
     * @method apowophaserui.GameGridTable#refresh
     */
    refresh() {
        if (this.mGridTable)
            this.mGridTable.refresh();
    }
    /**
     * @method apowophaserui.GameGridTable#resetMask
     * @param {number} [x] 
     * @param {number} [y] 
     * @param {number} [width] 
     * @param {number} [height] 
     */
    resetMask(x, y, width, height) {
        if (this.mGridTable) this.mGridTable.resetMask(x, y, width, height);
    }
    /**
     * @method apowophaserui.GameGridTable#layout
     */
    layout() {
        if (this.mGridTable)
            this.mGridTable.layout();
    }
    /**
     * @method apowophaserui.GameGridTable#refreshPos
     * @param {number} x 
     * @param {number} y 
     * @param {number} [conx] 
     * @param {number} [cony] 
     */
    refreshPos(x, y, conx, cony) {
        if (!this.mGridTable)
            return;
        this.mGridTable.x = x;
        this.mGridTable.y = y;
        if (this.table && conx !== undefined && cony !== undefined) {
            this.table.tableOX = conx;
            this.table.tableOY = cony;
        }
        this.adjustMask(x, y);
        this.mGridTable.layout();
        this.resetMask();
    }
    /**
     * @method apowophaserui.GameGridTable#destroy
     */
    destroy() {
        if (this.mGridTable) {
            this.removeListen();
            this.mGridTable.destroy();
        }
    }
    /**
     * @method apowophaserui.GameGridTable#cellTapHandler
     * @param {*} cell 
     */
    cellTapHandler(cell) {
        this.emit("cellTap", cell);
    }
}
export { GameGridTable };
