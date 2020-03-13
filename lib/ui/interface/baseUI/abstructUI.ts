import { UIType } from "./uiType";

export interface AbstractUI {
    id: number;
    UIType: UIType;
    show(data: any);
    hide();
}