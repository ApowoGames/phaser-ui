"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @namespace tooqingui.IAbstractPanel
 * @extends tooqingui.IAbstractUI
 */
var IAbstractPanel = {
    /**
     * @method tooqingui.IAbstractPanel#isShow
     * @return {boolean}
     */
    isShow: function () {
    },
    /**
     * @method tooqingui.IAbstractPanel#setFollow
     * @param {*} gameObject 
     * @param {Phaser.Scene} fromScene 
     * @param {Function} [callBack]
     */
    setFollow: function (gameObject, fromScene, callBack) {
    },
    /**
     * @method tooqingui.IAbstractPanel#tweenExpand
     * @param {boolean} show 
     */
    tweenExpand: function (show) {
    },
    /**
     * @method tooqingui.IAbstractPanel#resize
     * @param {number} [wid] 
     * @param {number} [hei]
     */
    resize: function (wid, hei) { },
    /**
     * @method tooqingui.IAbstractPanel#show
     * @param {*} [param] 
     */
    show: function (param) { },
    /**
     * @method tooqingui.IAbstractPanel#update
     * @param {*} param 
     */
    update: function (param) { },
    /**
     * @method tooqingui.IAbstractPanel#hide
     */
    hide: function () { },
    /**
     * @method tooqingui.IAbstractPanel#destroy
     */
    destroy: function () { }
}
export { IAbstractPanel };