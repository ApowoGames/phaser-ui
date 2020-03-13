import { Transform } from "../pos/transform";

export interface INinePatchSkinData {
    transform: Transform;
    key: string; // 主贴图集key
    frameObj: {} //key:NinePatchType  value: NineResourceData,
}