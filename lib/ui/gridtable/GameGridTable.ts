import { GridTableConfig, GridTableCoreConfig } from "./GridTableConfig";
import GridTable from "./GridTable.js";
export interface IMaskConfig {
    mask: boolean;
    padding: number;
}
const GetValue = Phaser.Utils.Objects.GetValue;
export class GameGridTable extends Phaser.GameObjects.Container {
    private mGridTable: GridTable;
    private maskGraphic: Phaser.GameObjects.Graphics;
    private zoom: number = 1;
    constructor(scene: Phaser.Scene, config: GridTableConfig) {
        super(scene);
        const x = config.x, y = config.y, width = config.table.width, height = config.table.height;
        this.setPosition(x, y);
        this.setSize(width, height);
        config.x = 0; config.y = 0;
        const createCellContainerCallback = config.createCellContainerCallback;
        config.createCellContainerCallback = (cell, cellContainer) => {
            const isAdd = !cellContainer ? true : false;
            cellContainer = createCellContainerCallback(cell, cellContainer);
            if (isAdd) this.add(cellContainer);
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
        return this.mGridTable.getCells();
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

    public refresh() {
        if (this.mGridTable) this.mGridTable.refresh();
    }

    resetMask() {
        if (this.mGridTable) this.mGridTable.resetMask();
        if (this.maskGraphic) {
            const worldpos = this.getWorldTransformMatrix();
            this.maskGraphic.setPosition(worldpos.tx, worldpos.ty);
        }

    }

    public layout() {
        if (this.mGridTable) this.mGridTable.layout();
    }

    public refreshPos(x: number, y: number, conx?: number, cony?: number) {
        if (!this.mGridTable) return;
        this.x = x;
        this.y = y;
        if (this.table && conx !== undefined && cony !== undefined) {
            this.table.tableOX = conx;
            this.table.tableOY = cony;
        }
        this.mGridTable.layout();
        this.resetMask();
    }
    public setSize(width: number, height: number) {
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
