import { TextConfig } from "../text/TextConfig";
import { TextType } from "../text/TextType";
import { ISoundConfig, ISoundGroup } from "../sound/ISoundConfig";

export interface TextEditConfig {
    textConfig: TextConfig;
    editType: TextType;
    text?: string;
    onTextChanged?: Function;
    onClose?: Function;
    music?: ISoundGroup;
}
