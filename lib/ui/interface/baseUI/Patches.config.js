"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @namespace tooqingui.IPatchesConfig
 */
var IPatchesConfig = {
    /**
     * @name tooqingui.IPatchesConfig#top
     * @type {number}
     */
    top,
    /**
     * @name tooqingui.IPatchesConfig#left
     * @type {number}
     * @default 0
     */
    left,
    /**
     * @name tooqingui.IPatchesConfig#right
     * @type {number}
     * @default 0
     */
    right,
    /**
     * @name tooqingui.IPatchesConfig#bottom
     * @type {number}
     * @default 0
     */
    bottom
}
module.exports = tooqingui.IPatchesConfig;
/**
 * @method tooqingui.normalizePatchesConfig
 * @const
 * @type {*}
 * @return {*}
 */
const normalizePatchesConfig = (config) => {
    config.bottom = (config.bottom !== undefined) ? config.bottom : config.top;
    config.left = (config.left !== undefined) ? config.left : config.top;
    config.right = (config.right !== undefined) ? config.right : config.left;
    return config;
};
exports.normalizePatchesConfig = normalizePatchesConfig;
/**
 * @method tooqingui.resetPatchesConfig
 * @const
 * @type {*}
 * @return {*}
 */
const resetPatchesConfig = (config) => {
    config.top = 0;
    config.bottom = 0;
    config.left = 0;
    config.right = 0;
    return config;
};
exports.resetPatchesConfig = resetPatchesConfig;
