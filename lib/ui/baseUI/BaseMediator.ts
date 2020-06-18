import { IAbstractPanel } from "../interface/panel/IAbstractPanel";
import { Panel } from "../panel/Panel";
import { UIType } from "../interface/baseUI/UIType";

export interface IMediator {
    type: number;
    isShow(): boolean;
    tweenExpand(show: boolean);
    resize(wid, hei);
    show(param?: any): void;
    update(param?: any): void;
    hide(): void;
    updateViewPos();
    destroy();
    isSceneUI(): boolean;
    getView(): IAbstractPanel;
    setParam(param): void;
    getParam(): any;
}

export class BaseMediator implements IMediator {
    protected mView: Panel;
    /**
     * 面板处于打开状态
     */
    protected mShow: boolean = false;
    protected mParam: any;
    protected mUIType: number;
    constructor() {
        this.mUIType = UIType.None;
    }

    public get type(): number {
        return this.mUIType;
    }

    updateViewPos() {
        if (!this.mView) return;
        this.mView.updatePos();
    }

    tweenExpand(show: boolean) {
        if (this.mView) this.mView.tweenExpand(show);
    }

    getView(): Panel {
        return this.mView;
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

    resize(width?: number, height?: number) {
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
        if (this.mView) {
            this.mView.destroy();
            this.mView = undefined;
        }
    }
}
