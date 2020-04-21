import { ISoundConfig, ISoundGroup } from "../sound/ISoundConfig";

export interface IComboboxConfig {
    wid: number;
    hei: number;
    resKey: string;
    resPng: string;
    resJson: string;
    resBg: string;
    resArrow: string;
    fontStyle: { size: number, color: string, bold: boolean };
    up: boolean;
    clickCallBack: Function;
    boxMusic?: ISoundGroup;
    itemMusic?: ISoundGroup;
}
