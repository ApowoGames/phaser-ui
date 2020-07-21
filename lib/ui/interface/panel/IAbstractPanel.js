"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @namespace apowophaserui.IAbstractPanel
 * @extends apowophaserui.IAbstractUI
 */
var IAbstractPanel = {
    /**
     * @method apowophaserui.IAbstractPanel#isShow
     * @return {boolean}
     */
    isShow: function () {
    },
    /**
     * @method apowophaserui.IAbstractPanel#setFollow
     * @param {*} gameObject 
     * @param {Phaser.Scene} fromScene 
     * @param {Function} [callBack]
     */
    setFollow: function (gameObject, fromScene, callBack) {
    },
    /**
     * @method apowophaserui.IAbstractPanel#tweenExpand
     * @param {boolean} show 
     */
    tweenExpand: function (show) {
    },
    /**
     * @method apowophaserui.IAbstractPanel#resize
     * @param {number} [wid] 
     * @param {number} [hei]
     */
    resize: function (wid, hei) { },
    /**
     * @method apowophaserui.IAbstractPanel#show
     * @param {*} [param] 
     */
    show: function (param) { },
    /**
     * @method apowophaserui.IAbstractPanel#update
     * @param {*} param 
     */
    update: function (param) { },
    /**
     * @method apowophaserui.IAbstractPanel#hide
     */
    hide: function () { },
    /**
     * @method apowophaserui.IAbstractPanel#destroy
     */
    destroy: function () { }
}
export { IAbstractPanel };