export interface IPatchesConfig {
    top: number;
    left?: number;
    right?: number;
    bottom?: number;
}

const normalizePatchesConfig: (config: IPatchesConfig) => IPatchesConfig = (config: IPatchesConfig) => {
    config.bottom = (config.bottom !== undefined) ? config.bottom : config.top;
    config.left = (config.left !== undefined) ? config.left : config.top;
    config.right = (config.right !== undefined) ? config.right : config.left;
    return config;
};

const resetPatchesConfig: (config: IPatchesConfig) => IPatchesConfig = (config: IPatchesConfig) => {
    config.top = 0;
    config.bottom = 0;
    config.left = 0;
    config.right = 0;
    return config;
};

export { normalizePatchesConfig, resetPatchesConfig };
