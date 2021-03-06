import ContainerLite from "../containerlite/ContainerLite.js";
import Table from "./Table.js";
import DefaultMask from "../../utils/mask/DefaultMask.js";
import ResizeGameObject from "../../utils/size/ResizeGameObject.js";
import MaskToGameObject from "../../utils/mask/MaskToGameObject.js";
import Methods from "./methods/Methods.js";

const Container = ContainerLite;
const Components = Phaser.GameObjects.Components;
const Set = Phaser.Structs.Set;
const GetValue = Phaser.Utils.Objects.GetValue;
class GridTable extends Container {
    constructor(scene, x, y, width, height, config) {
        if (config === undefined) {
            config = {};
        }
        super(scene, x, y, width, height);
        this.type = "TooqingGridTable";
        this._tableOX = GetValue(config, "tableOX", 0);
        this._tableOY = GetValue(config, "tableOY", 0);
        this.visibleCells = new Set();
        this.preVisibleCells = new Set();
        this.visibleStartX = null;
        this.visibleEndX = null;
        this.visibleStartY = null;
        this.visibleEndY = null;
        this.lastVisibleCellIdx = null;
        this.execeedTopState = false;
        this.execeedBottomState = false;
        this.execeedLeftState = false;
        this.execeedRightState = false;

        var reuseCellContainer = GetValue(config, "reuseCellContainer", false);
        this.cellContainersPool = reuseCellContainer
            ? scene.add.group()
            : undefined;
        var callback = GetValue(config, "cellVisibleCallback", null);
        if (callback !== null) {
            var scope = GetValue(config, "cellVisibleCallbackScope", undefined);
            this.on("cellvisible", callback, scope);
        }
        callback = GetValue(config, "cellInvisibleCallback", null);
        if (callback !== null) {
            var scope = GetValue(
                config,
                "cellInvisibleCallbackScope",
                undefined
            );
            this.on("cellinvisible", callback, scope);
        }
        this.zoom = GetValue(config, "zoom", 1);
        this.cellsMask = undefined;
        this.setCellsMask(GetValue(config, "mask", true));
        // this.cellsMaskGameObject = undefined;

        this.setScrollMode(GetValue(config, "scrollMode", 0));
        this.setClampMode(GetValue(config, "clamplTableOXY", true));
        // var cellOriginX = GetValue(config, "cellOriginX", 0.5);
        // var cellOriginY = GetValue(config, "cellOriginY", 0.5);
        // var padX = 0;
        // var padY = 0;
        // Pre-process cell size
        if (this.scrollMode === 0) {
            // scroll y 垂直滚动
            var cellWidth = GetValue(config, "cellWidth", undefined);
            this.expandCellSize = cellWidth === undefined;
            if (cellWidth === undefined) {
                var columns = GetValue(config, "columns", 1);
                config.cellWidth = this.width / columns;
            }
            // padY = cellOriginY * cellHeight;
        } else {
            // scroll x 水平滚动
            // Swap cell width and cell height
            var cellWidth = GetValue(config, "cellHeight", undefined);
            var cellHeight = GetValue(config, "cellWidth", undefined);
            this.expandCellSize = cellWidth === undefined;
            config.cellWidth = cellWidth;
            config.cellHeight = cellHeight;
            // padX = cellOriginX * cellWidth;
        }

        const cellOriginX = GetValue(config, "cellOriginX", 0.5);
        // if (cellOriginX > 0 && this.scrollMode) {
        //     // 水平：宽高取值相反； 垂直：宽高取值正常
        //     config.cellOriginX = 0;
        // }
        const cellOriginY = GetValue(config, "cellOriginY", 0.5);
        // if (cellOriginY > 0 && !this.scrollMode) {
        //     // 水平：宽高取值相反； 垂直：宽高取值正常
        //     config.cellOriginY = 0;
        // }
        this.table = new Table(this, config);

        this.updateTableData();
    }

    destroy(fromScene) {
        //  This Game Object has already been destroyed
        if (!this.scene) {
            return;
        }

        this.table.destroy(fromScene);
        this.table = undefined;
        if (this.cellContainersPool) {
            this.cellContainersPool.destroy(true);
            this.cellContainersPool = undefined;
        }
        super.destroy(fromScene);
    }
    updateTableData(bool) {
        this.updateTable(bool);
        this.updateScrollValueChange();
    }
    setScrollValueChange(callback, scope) {
        this.valueChange = callback;
        this.valueChangeScope = scope;
        return this;
    }
    updateScrollValueChange() {
        if (this.valueChange) {
            this.valueChange.call(this.valueChangeScope, this.t);
        }
    }
    setScrollMode(mode) {
        if (typeof mode === "string") {
            mode = SCROLLMODE[mode.toLowerCase()];
        }
        this.scrollMode = mode;
        return this;
    }

    setClampMode(mode) {
        this.clampTableOXYMode = mode;
        return this;
    }
    setColumnCount(cnt) {
        this.table.setColumnCount(cnt);
        return this;
    }
    get tableOY() {
        return this._tableOY;
    }

    get tableOX() {
        return this._tableOX;
    }

    set tableOY(oy) {
        this.setTableOY(oy).updateTableData();
    }

    set tableOX(ox) {
        this.setTableOX(ox).updateTableData();
    }

    setTableOXY(ox, oy) {
        this.setTableOY(oy).setTableOX(ox);
        return this;
    }

    addTableOY(dy) {
        this.setTableOY(this.tableOY + dy);
        return this;
    }

    addTableOX(dx) {
        this.setTableOX(this.tableOX + dx);
        return this;
    }

    addTableOXY(dx, dy) {
        this.addTableOY(dy).addTableOX(dx);
        return this;
    }

    setTableOYByPercentage(percentage) {
        this.setTableOY(-this.tableVisibleHeight * percentage);
        return this;
    }

    getTableOYPercentage() {
        var tableVisibleHeight = this.tableVisibleHeight;
        if (tableVisibleHeight === 0) {
            return 0;
        }
        return this.tableOY / -tableVisibleHeight;
    }

    set t(value) {
        this.setTableOYByPercentage(value).updateTableData();
    }

    get t() {
        return this.getTableOYPercentage();
    }

    getCells() {
        return this.table.cells;
    }

    getCell(cellIdx) {
        return this.table.getCell(cellIdx, true);
    }

    getCellContainer(cellIdx) {
        var cell = this.table.getCell(cellIdx, false);
        var container;
        if (cell) {
            container = cell.getContainer();
        }
        return container;
    }

    get cellsCount() {
        return this.table.cellsCount;
    }

    get columnCount() {
        return this.table.colCount;
    }

    setCellHeight(cellIdx, height) {
        var cell;
        if (typeof cellIdx === "number") {
            cell = this.table.getCell(cellIdx, true);
        } else {
            cell = cellIdx;
        }
        cell.height = height; // Only worked when scrollMode is 0
        return this;
    }

    setCellWidth(cellIdx, width) {
        var cell;
        if (typeof cellIdx === "number") {
            cell = this.table.getCell(cellIdx, true);
        } else {
            cell = cellIdx;
        }
        cell.width = width; // Only worked when scrollMode is 1
        return this;
    }

    setCellsMask(maskConfig) {
        var maskEnable, maskPadding;
        if (maskConfig === true) {
            maskEnable = true;
            maskPadding = 0;
        } else if (maskConfig === false) {
            maskEnable = false;
        } else {
            maskEnable = GetValue(maskConfig, "mask", true);
            maskPadding = GetValue(maskConfig, "padding", 0);
        }
        if (maskEnable) {
            this.cellsMaskGameObject = new DefaultMask(this, 0, maskPadding);
            this.cellsMask = this.cellsMaskGameObject.createGeometryMask();
            //  this.add(this.cellsMaskGameObject);
        }
        return this;
    }

    getCellsMaskGameObject() {
        return this.cellsMaskGameObject;
    }

    get instHeight() {
        return this.scrollMode === 0 ? this.height : this.width;
    }

    get instWidth() {
        return this.scrollMode === 0 ? this.width : this.height;
    }

    get tableHeight() {
        return this.table.totalRowsHeight;
    }

    get tableWidth() {
        return this.table.totalColumnWidth;
    }

    get topTableOY() {
        return 0;
    }

    get bottomTableOY() {
        return -this.tableVisibleHeight;
    }

    get leftTableOX() {
        return 0;
    }

    get rightTableOX() {
        return -this.tableVisibleWidth;
    }

    get tableVisibleHeight() {
        var h;
        var tableHeight = this.tableHeight;
        var instHeight = this.instHeight;
        if (tableHeight > instHeight) {
            h = tableHeight - instHeight;
        } else {
            h = 0;
        }

        return h;
    }

    get tableVisibleWidth() {
        var w;
        var tableWidth = this.tableWidth;
        var instWidth = this.instWidth;
        if (tableWidth > instWidth) {
            w = tableWidth - instWidth;
        } else {
            w = 0;
        }
        return w;
    }

    get bottomLeftY() {
        return -(this.displayHeight * this.originY) + this.displayHeight;
    }

    get topRightX() {
        return -(this.displayWidth * this.originX) + this.displayWidth;
    }

    get topLeftX() {
        return -(this.displayWidth * this.originX);
    }

    get topLeftY() {
        return -(this.displayHeight * this.originY);
    }

    get bottomBound() {
        if (this.scrollMode === 0) {
            return this.bottomLeftY + this.originOffsetY;
        } else {
            return this.topRightX + this.originOffsetX;
        }
    }

    get rightBound() {
        if (this.scrollMode === 0) {
            return this.topRightX + this.originOffsetX;
        } else {
            return this.bottomLeftY + this.originOffsetY;
        }
    }

    get originOffsetX() {
        var table = this.table;
        var len = table.defaultCellWidth * table.cellOriginX + table.padX;
        return len;
    }

    get originOffsetY() {
        var table = this.table;
        var len = table.defaultCellHeight * table.cellOriginY + table.padY;
        return len;
    }
    resize(width, height) {
        if (this.width === width && this.height === height) {
            return this;
        }

        super.resize(width, height);
        if (this.cellsMask) {
            ResizeGameObject(MaskToGameObject(this.cellsMask), width * this.zoom, height * this.zoom);
        }

        if (this.expandCellSize) {
            this.table.setDefaultCellWidth(
                this.instWidth / this.table.colCount
            );
        }
        this.updateTableData(true);
        return this;
    }

}

// mixin
Object.assign(GridTable.prototype, Components.GetBounds, Methods);

const SCROLLMODE = {
    v: 0,
    vertical: 0,
    h: 1,
    horizontal: 1,
};

export default GridTable;
