import { TextConfig } from "../text/TextConfig";
import { TextType } from "../text/TextType";

export interface TextEditConfig {
    textConfig: TextConfig;
    editType: TextType;
    text?: string;
    onTextChanged?: Function;
    onClose?: Function;
}