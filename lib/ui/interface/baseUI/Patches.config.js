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
    top,
    /**
     * @name apowophaserui.IPatchesConfig#left
     * @type {number=}
     */
    left,
    /**
     * @name apowophaserui.IPatchesConfig#right
     * @type {number=}
     */
    right,
    /**
     * @name apowophaserui.IPatchesConfig#bottom
     * @type {number=}
     */
    bottom,
}

const normalizePatchesConfig = function (config) {
    config.bottom = (config.bottom !== undefined) ? config.bottom : config.top;
    config.left = (config.left !== undefined) ? config.left : config.top;
    config.right = (config.right !== undefined) ? config.right : config.left;
    return config;
};

const resetPatchesConfig = function (config) {
    config.top = 0;
    config.bottom = 0;
    config.left = 0;
    config.right = 0;
    return config;
};

export { IPatchesConfig, normalizePatchesConfig, resetPatchesConfig }
