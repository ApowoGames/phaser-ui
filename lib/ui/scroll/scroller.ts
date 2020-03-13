import GridTable from "../../plugins/gameobjects/gridtable/GridTable";
import { IListConfig } from "../interface/list/iListConfig";
import { Tool } from "../tool/tool";
import { Transform } from "../interface/pos/transform";
export class ScrollTable extends GridTable {
    constructor(scene: Phaser.Scene, config: IListConfig) {
        const scrollMode: OrientationType = config.transform.orientation;
        const transform: Transform = !config ? undefined : config.transform;
        const pos: any = Tool.getPos(transform);
        const posX: number = pos.x;
        const posY: number = pos.y;
        const baseWidth = !transform && !transform.width ? 0 : transform.width;
        const baseHeight = !transform && !transform.height ? 0 : transform.height;
        super(scene, posX, posY, baseWidth, baseHeight);
    }
}