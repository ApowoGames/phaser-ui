import { IAbstractInteractiveObject } from "./IAbstractInteractiveObject";

export interface IAbstractItem extends IAbstractInteractiveObject {
    index: number; // 列表类ui索引
}
