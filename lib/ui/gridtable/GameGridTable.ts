import { GridTableConfig, GridTableCoreConfig } from "./GridTableConfig";
import GridTable from "./GridTable.js";
import ResizeGameObject from "../../plugins/utils/size/ResizeGameObject.js";
import MaskToGameObject from "../../plugins/utils/mask/MaskToGameObject.js";
export interface IMaskConfig {
    mask: boolean;
    padding: number;
}
const GetValue = Phaser.Utils.Objects.GetValue;
export class GameGridTable extends Phaser.Events.EventEmitter {
    private mGridTable: GridTable;
    private mConfig: GridTableConfig;
    constructor(scene: Phaser.Scene, config?: GridTableConfig) {
        super();
        this.mGridTable = new GridTable(scene, config);
        this.mConfig = config;
        this.addListen();
    }

    public adjustScrollMode(mode: number) {
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
     * @param width
     * @param height
     * @param x
     * @param y
     */
    public adjustMask(x: number = this.mConfig.x, y: number = this.mConfig.y, width?: number, height?: number) {
        if (!this.mGridTable) return;
        this.mGridTable.x = x;
        this.mGridTable.y = y;
        if (width !== this.mGridTable.width || height !== this.mGridTable.height) {
            this.mGridTable.resize(width, height);
        }
    }

    public get gridTable(): GridTable {
        return this.mGridTable;
    }
    public get childrenMap(): any {
        if (this.mGridTable) return this.mGridTable.childrenMap;
        return undefined;
    }
    public get table(): any {
        if (this.mGridTable) return this.mGridTable.getElement("table");
        return undefined;
    }
    /**
     * Only worked when scrollMode is 0
     * @param hei
     */
    public adjustCellHeight(hei: number) {
        if (!this.mGridTable) return;
        const cells = this.mGridTable.getCells();
        for (let i: number = 0, len = cells.length; i < len; i++) {
            this.mGridTable.setCellHeight(i, hei);
        }
    }
    /**
     * Only worked when scrollMode is 1
     * @param wid
     */
    public adjusetCellWidth(wid: number) {
        if (!this.mGridTable) return;
        const cells = this.mGridTable.getCells();
        for (let i: number = 0, len = cells.length; i < len; i++) {
            this.mGridTable.setCellWidth(i, wid);
        }
    }
    public get items(): any[] {
        if (!this.mGridTable) return null;
        return this.mGridTable.items;
    }
    public setItems(items: any[]) {
        if (this.mGridTable) {
            this.mGridTable.setItems(items);
            this.mGridTable.layout();
        }
    }
    setColumnCount(cnt) {
        this.mGridTable.setColumnCount(cnt);
        return this;
    }
    getCells() {
        return this.mGridTable.cells;
    }

    getCell(cellIdx) {
        return this.mGridTable.getCell(cellIdx, true);
    }
    public setT(value: number) {
        if (this.mGridTable) this.mGridTable.setT(value);
    }

    public addListen() {
        if (this.mGridTable) {
            this.mGridTable.on("cell.1tap", this.cellTapHandler, this);
        }
    }
    public removeListen() {
        if (this.mGridTable) {
            this.mGridTable.off("cell.1tap", this.cellTapHandler, this);
        }
    }
    public set x(value: number) {
        if (this.mGridTable) this.mGridTable.x = value;
    }

    public get x(): number {
        if (!this.mGridTable) return 0;
        return this.mGridTable.x;
    }

    public set y(value: number) {
        if (this.mGridTable) this.mGridTable.y = value;
    }

    public get y(): number {
        if (!this.mGridTable) return 0;
        return this.mGridTable.y;
    }

    public refresh() {
        if (this.mGridTable) this.mGridTable.refresh();
    }

    public layout() {
        if (this.mGridTable) this.mGridTable.layout();
    }

    public refreshPos(x: number, y: number, conx?: number, cony?: number) {
        if (!this.mGridTable) return;
        this.mGridTable.x = x;
        this.mGridTable.y = y;
        if (this.table && conx !== undefined && cony !== undefined) {
            this.table.tableOX = conx;
            this.table.tableOY = cony;
        }
        this.adjustMask(x, y);
        this.mGridTable.layout();
    }

    public destroy() {
        if (this.mGridTable) {
            this.removeListen();
            this.mGridTable.destroy();
        }
    }
    protected cellTapHandler(cell) {
        this.emit("cellTap", cell);
    }
}
