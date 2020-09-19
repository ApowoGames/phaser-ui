"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
import UIType from "../interface/baseUI/UIType";

/**
 * @class BaseMediator
 * @memberof apowophaserui
 * @constructor
 */
class BaseMediator {
    constructor() {
        /**
         * @name apowophaserui.BaseMediator#mView
         * @protected
         * @type {apowophaserui.Panel}
         */
        this.mView;
        /**
         * @name apowophaserui.BaseMediator#mParam
         * @type {*}
         */
        this.mParam;
        /**
         * @name apowophaserui.BaseMediator#mShow
         * @type {boolean}
         * @protected
         * @default {false}
         */
        this.mShow = false;
        /**
         * @name apowophaserui.BaseMediator#mUIType
         * @type {number}
         * @protected
         * @default 0
         */
        this.mUIType = UIType.None;
    }
    /**
     * @name apowophaserui.BaseMediator#UIType
     * @type {number}
     * @return {number}
     */
    get UIType() {
        return this.mUIType;
    }
    /**
     * @method apowophaserui.BaseMediator#updateViewPos
     */
    updateViewPos() {
        if (!this.mView)
            return;
        this.mView.updatePos();
    }
    /**
     * @method apowophaserui.BaseMediator#tweenExpand
     * @param {boolean} show 
     */
    tweenExpand(show) {
        if (this.mView)
            this.mView.tweenExpand(show);
    }
    /**
     * @method apowophaserui.BaseMediator#getView
     * @return {apowophaserui.Panel}
     */
    getView() {
        return this.mView;
    }
    /**
     * @method apowophaserui.BaseMediator#hide
     */
    hide() {
        this.mShow = false;
        const view = this.getView();
        if (view)
            view.hide();
    }
    /**
     * @method apowophaserui.BaseMediator#isSceneUI
     * @return {boolean}
     */
    isSceneUI() {
        return false;
    }
    /**
     * @method apowophaserui.BaseMediator#isShow
     * @return {boolean}
     */
    isShow() {
        return this.mShow;
    }
    /**
     * @method apowophaserui.BaseMediator#resize
     * @param {number} [width]
     * @param {number} [height]
     */
    resize(width, height) {
        const view = this.getView();
        if (view && view.isShow())
            view.resize(width, height);
    }
    /**
     * @method apowophaserui.BaseMediator#show
     * @param {*} [param]
     */
    show(param) {
        this.mShow = true;
    }
    /**
     * @method apowophaserui.BaseMediator#update
     * @param {*} [param]
     */
    update(param) {
        const view = this.getView();
        if (view)
            view.update(param);
    }
    /**
    * @method apowophaserui.BaseMediator#setParam
    * @param {*} param
    */
    setParam(param) {
        this.mParam = param;
    }
    /**
    * @method apowophaserui.BaseMediator#getParam
    * @return {*}
    */
    getParam() {
        return this.mParam;
    }
    /**
     * @method apowophaserui.BaseMediator#destroy
     */
    destroy() {
        this.mShow = false;
        this.mParam = null;
        if (this.mView) {
            this.mView.destroy();
            this.mView = undefined;
        }
    }
}
export default BaseMediator;
