import { TextConfig } from "./textConfig";
import { Transform } from "./transform";

export interface IInputPanelConfig {
    transform?: Transform;
    textConfig?: TextConfig;
    bgColor?: number;
    alpha?: number;
}