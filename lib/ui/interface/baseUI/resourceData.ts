import { Transform } from "../pos/Transform";

export interface ResourceData {
    transForm?: Transform;
    key?: string; // 用于从内存取texture
    frameObj?: {} //key:buttnstate  value:frameName || key:__BASE
}