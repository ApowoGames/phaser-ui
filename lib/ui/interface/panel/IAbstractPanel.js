"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @namespace phaserui.IAbstractPanel
 * @extends phaserui.IAbstractUI
 */
var IAbstractPanel = {
    /**
     * @method phaserui.IAbstractPanel#isShow
     * @return {boolean}
     */
    isShow: function () {
    },
    /**
     * @method phaserui.IAbstractPanel#setFollow
     * @param {*} gameObject 
     * @param {Phaser.Scene} fromScene 
     * @param {Function} [callBack]
     */
    setFollow: function (gameObject, fromScene, callBack) {
    },
    /**
     * @method phaserui.IAbstractPanel#tweenExpand
     * @param {boolean} show 
     */
    tweenExpand: function (show) {
    },
    /**
     * @method phaserui.IAbstractPanel#resize
     * @param {number} [wid] 
     * @param {number} [hei]
     */
    resize: function (wid, hei) { },
    /**
     * @method phaserui.IAbstractPanel#show
     * @param {*} [param] 
     */
    show: function (param) { },
    /**
     * @method phaserui.IAbstractPanel#update
     * @param {*} param 
     */
    update: function (param) { },
    /**
     * @method phaserui.IAbstractPanel#hide
     */
    hide: function () { },
    /**
     * @method phaserui.IAbstractPanel#destroy
     */
    destroy: function () { }
}
export { IAbstractPanel };