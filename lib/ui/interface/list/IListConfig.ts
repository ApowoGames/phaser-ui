import { Transform } from "../pos/Transform";
import { ITableConfig } from "./ITableConfig";
import { IScrollerConfig } from "./IScrollerConfig";
import { ISliderConfig } from "./ISliderConfig";
import { ITreeNode } from "./ITreeNode";

export interface IListConfig {
    transform: Transform;
    table: ITableConfig;
    createCellContainerCallback: Function;
    background?: Phaser.GameObjects.GameObject;
    slider?: ISliderConfig; // 没有则不显示滚动条
    scroller?: IScrollerConfig;
    clamplChildOY: false; // 弹性效果
    header?: ITreeNode;
    footer?: ITreeNode;
    items?: any[]; // list的数据

}
