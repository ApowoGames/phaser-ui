import { GridTableConfig } from "./GridTableConfig";
import GridTable from "./GridTable.js";

export class GameGridTable extends Phaser.Events.EventEmitter {
    private mGridTable: GridTable;
    private mConfig: GridTableConfig;
    constructor(scene: Phaser.Scene, config?: GridTableConfig) {
        super();
        this.mGridTable = new GridTable(scene, config);
        this.mConfig = config;
        this.addListen();
    }
    public get gridTable(): GridTable {
        return this.mGridTable;
    }
    public get items(): any[] {
        if (!this.mGridTable) return null;
        return this.mGridTable.items;
    }
    public setItems(items: any[]) {
        if (this.mGridTable) this.mGridTable.setItems(items);
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
