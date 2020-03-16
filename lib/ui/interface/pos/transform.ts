import { Align } from "./align";
import { OrientationType } from "./orientationType";

export interface Transform {
    x: number;
    y: number;
    align?: Align;
    width?: number;
    height?: number;
    orientation?: OrientationType; // 0水平 1竖直
}