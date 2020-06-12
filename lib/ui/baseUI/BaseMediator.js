"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UIType_1 = require("../interface/baseUI/UIType");
/**
 * @namespace tooqingui.IMediator
 */
var IMediator = {
    /**
     * @name tooqingui.IMediator#UIType
     */
    UIType: number,
    /**
     * @method tooqingui.IMediator#isShow
     * @return {boolean}
     */
    isShow: function () {
    },
    /**
     * @method tooqingui.IMediator#tweenExpand
     * @param {boolean} show 
     */
    tweenExpand: function (show) {
    },
    /**
     * @method tooqingui.IMediator#resize
     * @param {number} wid 
     * @param {number} hei 
     */
    resize: function (wid,hei) {
    },
    /**
     * @method tooqingui.IMediator#show
     * @param {*} param 
     */
    show: function (param) {
    },
    /**
     * @method tooqingui.IMediator#update
     * @param {*} param 
     */
    update: function (param) {
    },
    /**
     * @method tooqingui.IMediator#hide
     */
    hide: function () {
    },
    /**
     * @method tooqingui.IMediator#updateViewPos
     */
    updateViewPos: function () {
    },
    /**
     * @method tooqingui.IMediator#destroy
     */
    destroy: function () {
    },
    /**
     * @method tooqingui.IMediator#isSceneUI
     * @return {boolean}
     */
    isSceneUI: function () {
    },
    /**
     * @method tooqingui.IMediator#getView
     * @return {*}
     */
    getView:function(){
    },
    /**
     * @method tooqingui.IMediator#setParam
     * @param {*} param 
     */
    setParam:function(param){
    },
    /**
     * @method tooqingui.IMediator#getParam
     * @return {*}
     */
    getParam:function(){
    },
}
module.exports = tooqingui.IMediator;

/**
 * @class BaseMediator
 * @memberof tooqingui
 * @constructor
 * @extends tooqingui.IMediator
 */
class BaseMediator {
    constructor() {
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
        this.mUIType = UIType_1.UIType.None;
        /**
         * @name tooqingui.BaseMediator#mView
         * @type {*}
         * @protected
         */
        this.mView;
    }
    /**
     * @name tooqingui.BaseMediator#UIType
     * @return {*}
     */
    get UIType() {
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
exports.BaseMediator = BaseMediator;
