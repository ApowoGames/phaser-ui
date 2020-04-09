export interface IAbstractPanel {
    isShow(): boolean;
    destroy();
    hide();
    show(param?: any);
    tweenView(show: boolean);
    resize(wid: number, hei: number);
    update(param: any);
}
