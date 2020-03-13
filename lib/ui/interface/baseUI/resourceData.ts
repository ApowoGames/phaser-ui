import { Transform } from "../pos/transform";

export interface ResourceData {
    transForm?: Transform;
    key?: string; // 用于从内存取texture
    frameObj?: {} //key:buttnstate  value:frameName
}