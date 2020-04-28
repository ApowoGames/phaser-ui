import { GridTableConfig } from "./GridTableConfig";
import GridTable from "./GridTable.js";

export class GameGridTable {
    private mGridTable: GridTable;
    constructor(scene: Phaser.Scene, config?: GridTableConfig) {
        this.mGridTable = new GridTable(scene, config);
    }
    public get gridTable(): GridTable {
        return this.mGridTable;
    }
}
