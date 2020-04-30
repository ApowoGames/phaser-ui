import { INinePatchSkinData } from "./INinePatchSkinData";
import { Transform } from "../pos/Transform";
import { IPatchesConfig } from "../baseUI/Patches.config";

export interface INinePatchConfig {
    x: number;
    y: number;
    width: number;
    height: number;
    key: string;
    frame?: string;
    config?: IPatchesConfig;
}
