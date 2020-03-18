import { TextConfig } from "../text/textConfig";
import { TextType } from "../text/textType";

export interface TextEditConfig {
    textConfig: TextConfig;
    editType: TextType;
    text?: string;
    onTextChanged?: Function;
    onClose?: Function;
}