"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GridTable_js_1 = require("./GridTable.js");
const GetValue = Phaser.Utils.Objects.GetValue;
/**
 * @class GameGridTable
 * @memberof TooqinUI.GameGridTable
 * @constructor
 * @param {Phaser.Scene} scene
 * @param {*} config (GridTableConfig,GridTableCoreConfig)
 */
class GameGridTable extends Phaser.Events.EventEmitter {
    constructor(scene, config) {
        super();
        this.mGridTable = new GridTable_js_1.default(scene, config);
        this.mConfig = config;
        this.addListen();
    }
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
     * @method TooqinUI.GameGridTable#adjustMask
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
     * @name TooqinUI.GameGridTable#gridTable
     * @return {*}
     */
    get gridTable() {
        return this.mGridTable;
    }
    /**
     * @name TooqinUI.GameGridTable#childrenMap
     * @return {*}
     */
    get childrenMap() {
        if (this.mGridTable)
            return this.mGridTable.childrenMap;
        return undefined;
    }
    /**
     * @name TooqinUI.GameGridTable#table
     * @return {*}
     */
    get table() {
        if (this.mGridTable)
            return this.mGridTable.getElement("table");
        return undefined;
    }
    /**
     * Only worked when scrollMode is 0
     * @method TooqinUI.GameGridTable#adjustCellHeight
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
     * @method TooqinUI.GameGridTable#adjusetCellWidth
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
     * @name TooqinUI.GameGridTable#items
     * @return {*}
     */
    get items() {
        if (!this.mGridTable)
            return null;
        return this.mGridTable.items;
    }
    /**
     * @method TooqinUI.GameGridTable#setItems
     * @param {*} items 
     */
    setItems(items) {
        if (this.mGridTable) {
            this.mGridTable.setItems(items);
            this.mGridTable.layout();
        }
    }
    /**
     * @method TooqinUI.GameGridTable#setColumnCount
     * @param {number} cnt 
     */
    setColumnCount(cnt) {
        this.mGridTable.setColumnCount(cnt);
        return this;
    }
    /**
     * @method TooqinUI.GameGridTable#getCells
     * @return {*}
     */
    getCells() {
        return this.mGridTable.getCells();
    }
    /**
     * @method TooqinUI.GameGridTable#getCell
     * @param {number} cellIdx 
     * @return {*}
     */
    getCell(cellIdx) {
        return this.mGridTable.getCell(cellIdx, true);
    }
    /**
     * @method TooqinUI.GameGridTable#setT
     * @param {number} value 
     */
    setT(value) {
        if (this.mGridTable)
            this.mGridTable.setT(value);
    }
    /**
     * @method TooqinUI.GameGridTable#addListen
     */
    addListen() {
        if (this.mGridTable) {
            this.mGridTable.on("cell.1tap", this.cellTapHandler, this);
        }
    }
    /**
     * @method TooqinUI.GameGridTable#removeListen
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
     * @name TooqinUI.GameGridTable#x
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
     * @name TooqinUI.GameGridTable#y
     * @type {number}
     * @return {number}
     */
    get y() {
        if (!this.mGridTable)
            return 0;
        return this.mGridTable.y;
    }
    /**
     * @method TooqinUI.GameGridTable#refresh
     */
    refresh() {
        if (this.mGridTable)
            this.mGridTable.refresh();
    }
    /**
     * @method TooqinUI.GameGridTable#layout
     */
    layout() {
        if (this.mGridTable)
            this.mGridTable.layout();
    }
    /**
     * @method TooqinUI.GameGridTable#refreshPos
     * @param {number} x 
     * @param {number} y 
     * @param {number} conx 
     * @param {number} cony 
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
    }
    /**
     * @method TooqinUI.GameGridTable#destroy
     */
    destroy() {
        if (this.mGridTable) {
            this.removeListen();
            this.mGridTable.destroy();
        }
    }
    /**
     * @method TooqinUI.GameGridTable#cellTapHandler
     * @param {*} cell 
     */
    cellTapHandler(cell) {
        this.emit("cellTap", cell);
    }
}
exports.GameGridTable = GameGridTable;
