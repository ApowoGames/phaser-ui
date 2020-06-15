"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UIType_1 = require("../interface/baseUI/UIType");
/**
 * @namespace Tooqingui.IMediator
 */
var IMediator = {
    /**
     * @name Tooqingui.IMediator#type
     */
    type: number,
    /**
     * @method Tooqingui.IMediator#isShow
     * @return {boolean}
     */
    isShow: function () {
    },
    /**
     * @method Tooqingui.IMediator#tweenExpand
     * @param {boolean} show 
     */
    tweenExpand: function (show) {
    },
    /**
     * @method Tooqingui.IMediator#resize
     * @param {number} wid 
     * @param {number} hei 
     */
    resize: function (wid, hei) {
    },
    /**
     * @method Tooqingui.IMediator#show
     * @param {*} param 
     */
    show: function (param) {
    },
    /**
     * @method Tooqingui.IMediator#update
     * @param {*} param 
     */
    update: function (param) {
    },
    /**
     * @method Tooqingui.IMediator#hide
     */
    hide: function () {
    },
    /**
     * @method Tooqingui.IMediator#updateViewPos
     */
    updateViewPos: function () {
    },
    /**
     * @method Tooqingui.IMediator#destroy
     */
    destroy: function () {
    },
    /**
     * @method Tooqingui.IMediator#isSceneUI
     * @return {boolean}
     */
    isSceneUI: function () {
        return false;
    },
    /**
     * @method Tooqingui.IMediator#getView
     * @return {*}
     */
    getView: function () {
        return null;
    },
    /**
     * @method Tooqingui.IMediator#setParam
     * @param {*} param 
     */
    setParam: function (param) {
    },
    /**
     * @method Tooqingui.IMediator#getParam
     * @return {*}
     */
    getParam: function () {
    },
}
module.exports = Tooqingui.IMediator;

/**
 * @class BaseMediator
 * @memberof Tooqingui
 * @constructor
 * @extends Tooqingui.IMediator
 */
class BaseMediator {
    constructor() {
        /**
         * @name Tooqingui.BaseMediator#mParam
         * @type {*}
         * @protected
         */
        this.mParam;
        /**
         * @name Tooqingui.BaseMediator#mShow
         * @type {boolean}
         * @protected
         */
        this.mShow = false;
        /**
         * @name Tooqingui.BaseMediator#mUIType
         * @type {*}
         */
        this.mUIType = UIType_1.UIType.None;
        /**
         * @name Tooqingui.BaseMediator#mView
         * @type {*}
         * @protected
         */
        this.mView;
    }
    /**
     * @name Tooqingui.BaseMediator#type
     * @return {*}
     */
    get type() {
        return this.mUIType;
    }
    /**
     * @method Tooqingui.BaseMediator#updateViewPos
     */
    updateViewPos() {
        if (!this.mView)
            return;
        this.mView.updatePos();
    }
    /**
     * @method Tooqingui.BaseMediator#tweenExpand
     * @param {boolean} show 
     */
    tweenExpand(show) {
        if (this.mView)
            this.mView.tweenExpand(show);
    }
    getView() {
        return this.mView;
    }
    /**
     * @method Tooqingui.BaseMediator#hide
     */
    hide() {
        this.mShow = false;
        const view = this.getView();
        if (view)
            view.hide();
    }
    /**
     * @method Tooqingui.BaseMediator#isSceneUI
     * @return {boolean}
     */
    isSceneUI() {
        return false;
    }
    /**
     * @method Tooqingui.BaseMediator#isShow
     * @return {boolean}
     */
    isShow() {
        return this.mShow;
    }
    /**
     * @method Tooqingui.BaseMediator#resize
     * @param {number} width 
     * @param {number} height 
     */
    resize(width, height) {
        const view = this.getView();
        if (view && view.isShow())
            view.resize(width, height);
    }
    /**
     * @method Tooqingui.BaseMediator#show
     * @param {*} param 
     */
    show(param) {
        this.mShow = true;
    }
    /**
     * @method Tooqingui.BaseMediator#update
     * @param {*} param 
     */
    update(param) {
        const view = this.getView();
        if (view)
            view.update(param);
    }
    /**
     * @method Tooqingui.BaseMediator#setParam
     * @param {*} param 
     */
    setParam(param) {
        this.mParam = param;
    }
    /**
     * @method Tooqingui.BaseMediator#getParam
     * @return {*}
     */
    getParam() {
        return this.mParam;
    }
    /**
     * @method Tooqingui.BaseMediator#destroy
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
