"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @namespace Tooqingui.IAbstractPanel
 * @extends Tooqingui.IAbstractUI
 */
var IAbstractPanel = {
    /**
     * @method Tooqingui.IAbstractPanel#isShow
     * @return {boolean}
     */
    isShow: function () {
    },
    /**
     * @method Tooqingui.IAbstractPanel#setFollow
     * @param {*} gameObject 
     * @param {Phaser.Scene} fromScene 
     * @param {Function} [callBack]
     */
    setFollow: function (gameObject, fromScene, callBack) {
    },
    /**
     * @method Tooqingui.IAbstractPanel#tweenExpand
     * @param {boolean} show 
     */
    tweenExpand: function (show) {
    },
    /**
     * @method Tooqingui.IAbstractPanel#resize
     * @param {number} [wid] 
     * @param {number} [hei]
     */
    resize: function (wid, hei) { },
    /**
     * @method Tooqingui.IAbstractPanel#show
     * @param {*} [param] 
     */
    show: function (param) { },
    /**
     * @method Tooqingui.IAbstractPanel#update
     * @param {*} param 
     */
    update: function (param) { },
    /**
     * @method Tooqingui.IAbstractPanel#hide
     */
    hide: function () { },
    /**
     * @method Tooqingui.IAbstractPanel#destroy
     */
    destroy:function(){}
}
module.exports = IAbstractPanel;