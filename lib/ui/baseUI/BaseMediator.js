"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UIType_1 = require("../interface/baseUI/UIType");
/**
 * @class BaseMediator
 * @memberof TooqinUI.BaseUI
 * @constructor
 */
class BaseMediator {
    constructor() {
        /**
         * @name TooqinUI.BaseUI.BaseMediator#mShow
         * @type {boolean}
         * @protected
         */
        this.mShow = false;
        /**
         * @name TooqinUI.BaseUI.BaseMediator#mUIType
         * @type {UIType}
         * @protected
         */
        this.mUIType = UIType_1.UIType.None;
    }
    get UIType() {
        return this.mUIType;
    }
    /**
     * @method TooqinUI.BaseUI.BaseMediator#updateViewPos
     * 
     */
    updateViewPos() {
        if (!this.mView)
            return;
        this.mView.updatePos();
    }
    /**
     * @method TooqinUI.BaseUI.BaseMediator#tweenExpand
     * @param {boolean} show 
     */
    tweenExpand(show) {
        if (this.mView)
            this.mView.tweenExpand(show);
    }
    /**
     * @method TooqinUI.BaseUI.BaseMediator#getView
     * @return {TooqinUI.Panel.Panel}
     */
    getView() {
        return this.mView;
    }
    /**
     * @method TooqinUI.BaseUI.BaseMediator#hide
     */
    hide() {
        this.mShow = false;
        const view = this.getView();
        if (view)
            view.hide();
    }
    /**
     * @method TooqinUI.BaseUI.BaseMediator#isSceneUI
     * @return {boolean}
     */
    isSceneUI() {
        return false;
    }
    /**
     * @method TooqinUI.BaseUI.BaseMediator#isShow
     * @return {boolean}
     */
    isShow() {
        return this.mShow;
    }
    /**
     * @method TooqinUI.BaseUI.BaseMediator#resize
     * @param {number} width 
     * @param {number} height 
     */
    resize(width, height) {
        const view = this.getView();
        if (view && view.isShow())
            view.resize(width, height);
    }
    /**
     * @method TooqinUI.BaseUI.BaseMediator#show
     * @param {*} param 
     */
    show(param) {
        this.mShow = true;
    }
    /**
     * @method TooqinUI.BaseUI.BaseMediator#update
     * @param {*} param 
     */
    update(param) {
        const view = this.getView();
        if (view)
            view.update(param);
    }
    /**
     * @method TooqinUI.BaseUI.BaseMediator#setParam
     * @param {*} param 
     */
    setParam(param) {
        this.mParam = param;
    }
    /**
     * @method  TooqinUI.BaseUI.BaseMediator#getParam
     * @return {*}
     */
    getParam() {
        return this.mParam;
    }
    /**
     * @method TooqinUI.BaseUI.BaseMediator#destroy
     */
    destroy() {
        this.mShow = false;
        this.mParam = null;
        let view = this.getView();
        if (view) {
            view.destroy();
            view = undefined;
        }
    }
}
exports.BaseMediator = BaseMediator;
