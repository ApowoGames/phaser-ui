import { IProgressBarSkinData } from "./IProgressBarSkinData";
import { Transform } from "../pos/Transform";
import { TextConfig } from "../text/TextConfig";
import { ISoundGroup } from "../sound/ISoundConfig";

export interface ProgressBarConfig {
    transform: Transform;
    skinsData: IProgressBarSkinData;
    textConfig: TextConfig;
    text?: string;
    music?: ISoundGroup;
}
