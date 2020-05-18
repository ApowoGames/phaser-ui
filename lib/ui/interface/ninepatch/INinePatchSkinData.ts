import { Transform } from "../pos/Transform";
import { IPatchesConfig } from "../baseUI/Patches.config";

export interface INinePatchSkinData {
    x: number;
    y: number;
    width: number;
    height: number;
    config: IPatchesConfig;
    key: string; // 主贴图集key
    frame?: string; // 如果没有，则直接用__BASE
}
