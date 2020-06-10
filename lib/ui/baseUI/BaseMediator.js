"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UIType_1 = require("../interface/baseUI/UIType");
/**
 * @class BaseMediator
 * @memberof tooqinui
 * @constructor
 */
class BaseMediator {
    constructor() {
        /**
         * @name tooqinui.BaseMediator#mShow
         * @type {boolean}
         * @protected
         */
        this.mShow = false;
        /**
         * @name tooqinui.BaseMediator#mUIType
         * @type {*}
         */
        this.mUIType = UIType_1.UIType.None;
    }
    /**
     * @name tooqinui.BaseMediator#UIType
     * @return {*}
     */
    get UIType() {
        return this.mUIType;
    }
    /**
     * @method tooqinui.BaseMediator#updateViewPos
     */
    updateViewPos() {
        if (!this.mView)
            return;
        this.mView.updatePos();
    }
    /**
     * @method tooqinui.BaseMediator#tweenExpand
     * @param {boolean} show 
     */
    tweenExpand(show) {
        if (this.mView)
            this.mView.tweenExpand(show);
    }
    /**
     * @method tooqinui.BaseMediator#getView
     */
    getView() {
        return this.mView;
    }
    /**
     * @method tooqinui.BaseMediator#hide
     */
    hide() {
        this.mShow = false;
        const view = this.getView();
        if (view)
            view.hide();
    }
    /**
     * @method tooqinui.BaseMediator#isSceneUI
     * @return {boolean}
     */
    isSceneUI() {
        return false;
    }
    /**
     * @method tooqinui.BaseMediator#isShow
     * @return {boolean}
     */
    isShow() {
        return this.mShow;
    }
    /**
     * @method tooqinui.BaseMediator#resize
     * @param {number} width 
     * @param {number} height 
     */
    resize(width, height) {
        const view = this.getView();
        if (view && view.isShow())
            view.resize(width, height);
    }
    /**
     * @method tooqinui.BaseMediator#show
     * @param {*} param 
     */
    show(param) {
        this.mShow = true;
    }
    /**
     * @method tooqinui.BaseMediator#update
     * @param {*} param 
     */
    update(param) {
        const view = this.getView();
        if (view)
            view.update(param);
    }
    /**
     * @method tooqinui.BaseMediator#setParam
     * @param {*} param 
     */
    setParam(param) {
        this.mParam = param;
    }
    /**
     * @method tooqinui.BaseMediator#getParam
     * @return {*}
     */
    getParam() {
        return this.mParam;
    }
    /**
     * @method tooqinui.BaseMediator#destroy
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
