"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @namespace Tooqingui.IPatchesConfig
 */
var IPatchesConfig = {
    /**
     * @name Tooqingui.IPatchesConfig#top
     * @type {number}
     */
    top,
    /**
     * @name Tooqingui.IPatchesConfig#left
     * @type {number}
     * @default 0
     */
    left,
    /**
     * @name Tooqingui.IPatchesConfig#right
     * @type {number}
     * @default 0
     */
    right,
    /**
     * @name Tooqingui.IPatchesConfig#bottom
     * @type {number}
     * @default 0
     */
    bottom
}
module.exports = Tooqingui.IPatchesConfig;
/**
 * @method Tooqingui.normalizePatchesConfig
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
 * @method Tooqingui.resetPatchesConfig
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
