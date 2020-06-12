import { IAbstractUI } from "../baseUI/IAbstractUI";

export interface IAbstractPanel extends IAbstractUI {
    isShow(): boolean;
    setFollow(gameObject: any, fromScene: Phaser.Scene, callBack?: Function);
    tweenExpand(show: boolean);
    resize(wid?: number, hei?: number);
    show(param?: any);
    update(param: any);
    hide();
    destroy();
}
