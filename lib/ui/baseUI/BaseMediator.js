"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
import UIType from "../interface/baseUI/UIType";
/**
 * @class BaseMediator
 * @memberof phaserui
 * @constructor
 */
class BaseMediator {
    constructor() {
        /**
         * @name phaserui.BaseMediator#mParam
         * @type {*}
         * @protected
         */
        this.mParam;
        /**
         * @name phaserui.BaseMediator#mShow
         * @type {boolean}
         * @protected
         */
        this.mShow = false;
        /**
         * @name phaserui.BaseMediator#mUIType
         * @type {*}
         */
        this.mUIType = UIType.None;
        /**
         * @name phaserui.BaseMediator#mView
         * @type {*}
         * @protected
         */
        this.mView;
    }
    /**
     * @name phaserui.BaseMediator#type
     * @return {*}
     */
    get type() {
        return this.mUIType;
    }
    /**
     * @method phaserui.BaseMediator#updateViewPos
     */
    updateViewPos() {
        if (!this.mView)
            return;
        this.mView.updatePos();
    }
    /**
     * @method phaserui.BaseMediator#tweenExpand
     * @param {boolean} show 
     */
    tweenExpand(show) {
        if (this.mView)
            this.mView.tweenExpand(show);
    }
    /**
     * @method phaserui.BaseMediator#getView
     * @return {*}
     */
    getView() {
        return this.mView;
    }
    /**
     * @method phaserui.BaseMediator#hide
     */
    hide() {
        this.mShow = false;
        const view = this.getView();
        if (view)
            view.hide();
    }
    /**
     * @method phaserui.BaseMediator#isSceneUI
     * @return {boolean}
     */
    isSceneUI() {
        return false;
    }
    /**
     * @method phaserui.BaseMediator#isShow
     * @return {boolean}
     */
    isShow() {
        return this.mShow;
    }
    /**
     * @method phaserui.BaseMediator#resize
     * @param {number} width 
     * @param {number} height 
     */
    resize(width, height) {
        const view = this.getView();
        if (view && view.isShow())
            view.resize(width, height);
    }
    /**
     * @method phaserui.BaseMediator#show
     * @param {*} [param] 
     */
    show(param) {
        this.mShow = true;
    }
    /**
     * @method phaserui.BaseMediator#update
     * @param {*} [param] 
     */
    update(param) {
        const view = this.getView();
        if (view)
            view.update(param);
    }
    /**
     * @method phaserui.BaseMediator#setParam
     * @param {*} param 
     */
    setParam(param) {
        this.mParam = param;
    }
    /**
     * @method phaserui.BaseMediator#getParam
     * @return {*}
     */
    getParam() {
        return this.mParam;
    }
    /**
     * @method phaserui.BaseMediator#destroy
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
