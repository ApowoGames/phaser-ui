"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const normalizePatchesConfig = (config) => {
    config.bottom = (config.bottom !== undefined) ? config.bottom : config.top;
    config.left = (config.left !== undefined) ? config.left : config.top;
    config.right = (config.right !== undefined) ? config.right : config.left;
    return config;
};
exports.normalizePatchesConfig = normalizePatchesConfig;
const resetPatchesConfig = (config) => {
    config.top = 0;
    config.bottom = 0;
    config.left = 0;
    config.right = 0;
    return config;
};
exports.resetPatchesConfig = resetPatchesConfig;
