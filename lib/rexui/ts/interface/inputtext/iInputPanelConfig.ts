import { Transform } from "../pos/transform";
import { TextConfig } from "../text/textConfig";

export interface IInputPanelConfig {
    transform?: Transform;
    textConfig?: TextConfig;
    bgColor?: number;
    alpha?: number;
}