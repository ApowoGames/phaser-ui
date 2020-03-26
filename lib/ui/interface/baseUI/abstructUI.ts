import { UIType } from "./UiType";

export interface AbstractUI {
    id: number;
    UIType: UIType;
    show(data: any);
    hide();
}