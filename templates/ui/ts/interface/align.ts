export interface Align {
    x: number | string; // number ｜ string 两种数据类型 number精确的像素位置，string表示百分比，对应父容器位置
    y: number | string; // number ｜ string 两种数据类型 number精确的像素位置，string表示百分比，对应父容器位置
    top: number | string;
    bottom: number | string;
    right: number | string;
    left: number | string;
    centerX: number;
    centerY: number;
}