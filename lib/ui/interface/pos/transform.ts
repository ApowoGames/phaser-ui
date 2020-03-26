import { Align } from "./Align";
import { OrientationType } from "./OrientationType";

export interface Transform {
    x: number;
    y: number;
    align?: Align;
    width?: number;
    height?: number;
    orientation?: OrientationType; // 0水平 1竖直
}
