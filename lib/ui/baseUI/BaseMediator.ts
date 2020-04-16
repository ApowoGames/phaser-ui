import { IAbstractPanel } from "../interface/panel/IAbstractPanel";
import { Panel } from "../panel/panel";
import { UIType } from "../interface/baseUI/UiType";

export interface IMediator {
    isShow(): boolean;
    tweenExpand(show: boolean);
    resize(wid, hei);
    show(param?: any): void;
    update(param?: any): void;
    hide(): void;
    follow();
    destroy();
    isSceneUI(): boolean;
    getView(): IAbstractPanel;
    getUIType(): UIType;
    setParam(param): void;
    getParam(): any;
}

export class BaseMediator implements IMediator {
    protected mView: Panel;
    protected mShow: boolean = false;
    protected mParam: any;
    protected mUIType: UIType;
    constructor() {
        this.mUIType = UIType.NoneUIType;
    }

    follow() {
        if (!this.mView) return;
        this.mView.updatePos();
    }

    tweenExpand(show: boolean) {
        if (this.mView) this.mView.tweenExpand(show);
    }

    getView(): IAbstractPanel {
        return this.mView;
    }

    getUIType(): number {
        return this.mUIType;
    }

    hide(): void {
        this.mShow = false;
        const view = this.getView();
        if (view) view.hide();
    }

    isSceneUI(): boolean {
        return false;
    }

    isShow(): boolean {
        return this.mShow;
    }

    resize(width: number, height: number) {
        const view = this.getView();
        if (view && view.isShow()) view.resize(width, height);
    }

    show(param?: any): void {
        this.mShow = true;
    }

    update(param?: any): void {
        const view = this.getView();
        if (view) view.update(param);
    }

    setParam(param: any) {
        this.mParam = param;
    }

    getParam(): any {
        return this.mParam;
    }

    destroy() {
        this.mShow = false;
        this.mParam = null;
        let view = this.getView();
        if (view) {
            view.destroy();
            view = null;
        }
    }
}
