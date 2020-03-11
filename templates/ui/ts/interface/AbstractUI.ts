/*
 * @Author: gxm
 * @Date: 2020-03-06 13:53:28
 * @Last Modified by: gxm
 * @Last Modified time: 2020-03-12 01:06:08
 */

export enum UIType {
    permanent, // 场景内常驻ui
    Normal, // 普通功能ui
    Pop, // 弹出型ui
    Tips, // tips型ui
    Monopoly, // 独占型ui
    actitity, // 热发布活动类型ui，便于单独刷新活动ui
}
export enum OrientationType {
    hroizontal, // 水平
    vertical, // 竖直
}
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
export interface Transform {
    scene: Phaser.Scene;
    x: number | string;
    y: number | string;
    align: Align;
    width: number;
    height: number;
    orientation?: OrientationType; // 0水平 1竖直
}
export interface AbstractUI {
    id: number;
    UIType: UIType;
    show(data: any);
    hide();
}
export interface AbstractInteractiveObject {
    selected: boolean;
    enabled: boolean;
}
export interface AbstractItem extends AbstractInteractiveObject {
    index: number; // 列表类ui索引
}
export interface UIProvider {
    scene: Phaser.Scene;
    parent?: AbstractUI;
}
export interface IListConfig {
    transform: Transform;
    autoHideBar: boolean;
}
export interface INinePatchConfig {
    key: string; // texture Key
    align: Align;
}
