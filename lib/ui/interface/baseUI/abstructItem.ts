import { AbstractInteractiveObject } from "./abstructInteractiveObject";

export interface AbstractItem extends AbstractInteractiveObject {
    index: number; // 列表类ui索引
}