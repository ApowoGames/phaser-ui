import { IProgressBarSkinData } from "./IProgressBarSkinData";
import { Transform } from "../pos/Transform";
import { TextConfig } from "../text/TextConfig";

export interface ProgressBarConfig {
    transform: Transform;
    skinsData: IProgressBarSkinData;
    textConfig: TextConfig;
    text?: string;
}