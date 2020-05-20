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

export { normalizePatchesConfig };
