"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
import UIType from "../interface/baseUI/UIType";
/**
 * @class BaseMediator
 * @memberof tooqingui
 * @constructor
 */
class BaseMediator {
    constructor() {
        /**
         * @name tooqingui.BaseMediator#mParam
         * @type {*}
         * @protected
         */
        this.mParam;
        /**
         * @name tooqingui.BaseMediator#mShow
         * @type {boolean}
         * @protected
         */
        this.mShow = false;
        /**
         * @name tooqingui.BaseMediator#mUIType
         * @type {*}
         */
        this.mUIType = UIType.None;
        /**
         * @name tooqingui.BaseMediator#mView
         * @type {*}
         * @protected
         */
        this.mView;
    }
    /**
     * @name tooqingui.BaseMediator#type
     * @return {*}
     */
    get type() {
        return this.mUIType;
    }
    /**
     * @method tooqingui.BaseMediator#updateViewPos
     */
    updateViewPos() {
        if (!this.mView)
            return;
        this.mView.updatePos();
    }
    /**
     * @method tooqingui.BaseMediator#tweenExpand
     * @param {boolean} show 
     */
    tweenExpand(show) {
        if (this.mView)
            this.mView.tweenExpand(show);
    }
    /**
     * @method tooqingui.BaseMediator#getView
     * @return {*}
     */
    getView() {
        return this.mView;
    }
    /**
     * @method tooqingui.BaseMediator#hide
     */
    hide() {
        this.mShow = false;
        const view = this.getView();
        if (view)
            view.hide();
    }
    /**
     * @method tooqingui.BaseMediator#isSceneUI
     * @return {boolean}
     */
    isSceneUI() {
        return false;
    }
    /**
     * @method tooqingui.BaseMediator#isShow
     * @return {boolean}
     */
    isShow() {
        return this.mShow;
    }
    /**
     * @method tooqingui.BaseMediator#resize
     * @param {number} width 
     * @param {number} height 
     */
    resize(width, height) {
        const view = this.getView();
        if (view && view.isShow())
            view.resize(width, height);
    }
    /**
     * @method tooqingui.BaseMediator#show
     * @param {*} param 
     */
    show(param) {
        this.mShow = true;
    }
    /**
     * @method tooqingui.BaseMediator#update
     * @param {*} param 
     */
    update(param) {
        const view = this.getView();
        if (view)
            view.update(param);
    }
    /**
     * @method tooqingui.BaseMediator#setParam
     * @param {*} param 
     */
    setParam(param) {
        this.mParam = param;
    }
    /**
     * @method tooqingui.BaseMediator#getParam
     * @return {*}
     */
    getParam() {
        return this.mParam;
    }
    /**
     * @method tooqingui.BaseMediator#destroy
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

export default BaseMediator;
