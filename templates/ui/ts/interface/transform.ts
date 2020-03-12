import { Align } from "./align";

export interface Transform {
    x: number | string;
    y: number | string;
    align?: Align;
    width?: number;
    height?: number;
    orientation?: OrientationType; // 0水平 1竖直
}