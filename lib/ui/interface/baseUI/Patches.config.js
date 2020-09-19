"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @namespace apowophaserui.IPatchesConfig
 */
var IPatchesConfig = {
    /**
    * @name apowophaserui.IPatchesConfig#top
    * @type {number}
    */
    top: 0,
    /**
     * @name apowophaserui.IPatchesConfig#left
     * @type {number=}
     */
    left: 0,
    /**
     * @name apowophaserui.IPatchesConfig#right
     * @type {number=}
     */
    right: 0,
    /**
     * @name apowophaserui.IPatchesConfig#bottom
     * @type {number=}
     */
    bottom: 0,
}
/**
 * @class Patches_config
 * @memberof apowophaserui
 * @constructor
 */
class Patches_config {
    /**
     * @function apowophaserui.Patches_config.normalizePatchesConfig
     * @static
     * @param {*} config 
     * @return {*}
     */
    static normalizePatchesConfig(config) {
        config.bottom = (config.bottom !== undefined) ? config.bottom : config.top;
        config.left = (config.left !== undefined) ? config.left : config.top;
        config.right = (config.right !== undefined) ? config.right : config.left;
        return config;
    };

    /**
     * @function apowophaserui.Patches_config.resetPatchesConfig
     * @static
     * @param {*} config 
     * @return {*}
     */
    static resetPatchesConfig(config) {
        config.top = 0;
        config.bottom = 0;
        config.left = 0;
        config.right = 0;
        return config;
    };
}

export { Patches_config, IPatchesConfig}
