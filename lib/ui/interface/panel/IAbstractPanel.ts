import { AbstractUI } from "../baseUI/AbstructUI";

export interface IAbstractPanel extends AbstractUI {
    isShow(): boolean;
    setFollow(gameObject: any, fromScene: Phaser.Scene, callBack?: Function);
    tweenExpand(show: boolean);
    resize(wid?: number, hei?: number);
    show(param?: any);
    update(param: any);
    hide();
    destroy();
}
