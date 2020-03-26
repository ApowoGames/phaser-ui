import { Transform } from "../pos/Transform";
import { TextConfig } from "../text/TextConfig";

export interface IInputPanelConfig {
    transform?: Transform;
    textConfig?: TextConfig;
    bgColor?: number;
    alpha?: number;
}