export interface AbstractInteractiveObject{
    selected: boolean;
    enabled: boolean;
    addListen();
    removeListen();
}