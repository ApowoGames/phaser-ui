import { GridTableConfig } from "./GridTableConfig";
import GridTable from "./GridTable.js";
import ResizeGameObject from "../../plugins/utils/size/ResizeGameObject.js";
import MaskToGameObject from "../../plugins/utils/mask/MaskToGameObject.js";
export interface IMaskConfig {
    mask: boolean;
    padding: number;
}
export class GameGridTable extends Phaser.Events.EventEmitter {
    private mGridTable: GridTable;
    private mConfig: GridTableConfig;
    // private mCellParentCon: Phaser.GameObjects.Container;
    constructor(scene: Phaser.Scene, config?: GridTableConfig) {
        super();
        // this.mCellParentCon = scene.make.container(undefined, false);
        this.mGridTable = new GridTable(scene, config);
        this.mConfig = config;
        this.addListen();
    }

    /**
     * 调整gridtable遮照范围
     * @param width
     * @param height
     * @param x
     * @param y
     */
    public adjustMask(width, height, x: number = this.mConfig.x, y: number = this.mConfig.y) {
        if (!this.mGridTable) return;
        this.mGridTable.x = x;
        this.mGridTable.y = y;
        this.mGridTable.resize(width, height);
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
    }
    /**
     * Only worked when scrollMode is 1
     * @param wid
     */
    public adjusetCellWidth(wid: number) {
        if (!this.mGridTable) return;
        // this.mGridTable.
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
