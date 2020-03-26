import { IProgressBarSkinData } from "./iProgressBarSkinData";
import { Transform } from "../pos/transform";
import { TextConfig } from "../text/textConfig";

export interface ProgressBarConfig {
    transform: Transform;
    skinsData: IProgressBarSkinData;
    textConfig: TextConfig;
    text?: string;
}