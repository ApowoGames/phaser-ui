"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
import GridTable from "./GridTable.js";
const GetValue = Phaser.Utils.Objects.GetValue;
/**
 * @class GameGridTable
 * @memberof apowophaserui
 * @constructor
 * @extends Phaser.GameObjects.Container
 * @param {Phaser.Scene} scene
 * @param {*} [config]
 */
class GameGridTable extends Phaser.GameObjects.Container {
    constructor(scene, config) {
        super(scene);
        this.zoom = 1;
        const x = config.x, y = config.y, width = config.table.width, height = config.table.height;
        this.setPosition(x, y);
        this.setSize(width, height);
        config.x = 0;
        config.y = 0;
        const createCellContainerCallback = config.createCellContainerCallback;
        config.createCellContainerCallback = (cell, cellContainer) => {
            const isAdd = !cellContainer ? true : false;
            cellContainer = createCellContainerCallback(cell, cellContainer);
            if (isAdd)
                this.add(cellContainer);
            return cellContainer;
        };
        const mask = config.table.mask;
        config.table.mask = false;
        if (mask === undefined || mask === true) {
            const zoom = config.table.zoom ? config.table.zoom : 1;
            this.zoom = zoom;
            this.maskGraphic = scene.make.graphics(undefined, false);
            this.maskGraphic.fillStyle(0);
            const maskWidth = this.width * this.zoom;
            const maskHeight = this.height * this.zoom;
            this.maskGraphic.fillRect(-maskWidth * 0.5, -maskHeight * 0.5, maskWidth, maskHeight);
            const worldpos = this.getWorldTransformMatrix();
            this.maskGraphic.setPosition(worldpos.tx, worldpos.ty);
            this.setMask(this.maskGraphic.createGeometryMask());
        }
        this.mGridTable = new GridTable(scene, config);
        // this.add(this.maskGraphic);
        this.add(this.table);
        this.addListen();
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
        if (this.mGridTable)
            this.mGridTable.resetMask();
        if (this.maskGraphic) {
            const worldpos = this.getWorldTransformMatrix();
            this.maskGraphic.setPosition(worldpos.tx, worldpos.ty);
        }
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
        this.x = x;
        this.y = y;
        if (this.table && conx !== undefined && cony !== undefined) {
            this.table.tableOX = conx;
            this.table.tableOY = cony;
        }
        this.mGridTable.layout();
        this.resetMask();
    }
    /**
     * @method apowophaserui.GameGridTable#setSize
     * @param {number} width 
     * @param {number} height 
     * @return {*}
     */
    setSize(width, height) {
        super.setSize(width, height);
        if (this.maskGraphic) {
            const maskWidth = this.width * this.zoom;
            const maskHeight = this.height * this.zoom;
            this.maskGraphic.fillRect(-maskWidth * 0.5, -maskHeight * 0.5, maskWidth, maskHeight);
        }
        if (this.mGridTable) {
            this.mGridTable.resetSize(width, height);
        }
        this.resetMask();
        return this;
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
export default GameGridTable;
