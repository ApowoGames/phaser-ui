"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UIType_1 = require("../interface/baseUI/UIType");
/**
 * @class BaseMediator
 * @memberof TooqinUI.BaseMediator
 * @constructor
 */
class BaseMediator {
    constructor() {
        /**
         * @name TooqinUI.BaseMediator#mShow
         * @type {boolean}
         * @protected
         */
        this.mShow = false;
        /**
         * @name TooqinUI.BaseMediator#mUIType
         * @type {*}
         */
        this.mUIType = UIType_1.UIType.None;
    }
    /**
     * @name TooqinUI.BaseMediator#UIType
     * @return {*}
     */
    get UIType() {
        return this.mUIType;
    }
    /**
     * @method TooqinUI.BaseMediator#updateViewPos
     */
    updateViewPos() {
        if (!this.mView)
            return;
        this.mView.updatePos();
    }
    /**
     * @method TooqinUI.BaseMediator#tweenExpand
     * @param {boolean} show 
     */
    tweenExpand(show) {
        if (this.mView)
            this.mView.tweenExpand(show);
    }
    /**
     * @method TooqinUI.BaseMediator#getView
     */
    getView() {
        return this.mView;
    }
    /**
     * @method TooqinUI.BaseMediator#hide
     */
    hide() {
        this.mShow = false;
        const view = this.getView();
        if (view)
            view.hide();
    }
    /**
     * @method TooqinUI.BaseMediator#isSceneUI
     * @return {boolean}
     */
    isSceneUI() {
        return false;
    }
    /**
     * @method TooqinUI.BaseMediator#isShow
     * @return {boolean}
     */
    isShow() {
        return this.mShow;
    }
    /**
     * @method TooqinUI.BaseMediator#resize
     * @param {number} width 
     * @param {number} height 
     */
    resize(width, height) {
        const view = this.getView();
        if (view && view.isShow())
            view.resize(width, height);
    }
    /**
     * @method TooqinUI.BaseMediator#show
     * @param {*} param 
     */
    show(param) {
        this.mShow = true;
    }
    /**
     * @method TooqinUI.BaseMediator#update
     * @param {*} param 
     */
    update(param) {
        const view = this.getView();
        if (view)
            view.update(param);
    }
    /**
     * @method TooqinUI.BaseMediator#setParam
     * @param {*} param 
     */
    setParam(param) {
        this.mParam = param;
    }
    /**
     * @method TooqinUI.BaseMediator#getParam
     * @return {*}
     */
    getParam() {
        return this.mParam;
    }
    /**
     * @method TooqinUI.BaseMediator#destroy
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
