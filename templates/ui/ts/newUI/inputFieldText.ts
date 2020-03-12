
import InputText from "../../../../plugins/gameobjects/inputtext/InputText";
import { TextConfig } from "../interface/textConfig";
import { Tool } from "../tool/tool";
import { Transform } from "../interface/transform";
import { InputTextEvent } from "../interface/inputTextEvent";
export class InputFieldText extends InputText {
    private mScene: Phaser.Scene;
    constructor(scene: Phaser.Scene, config: TextConfig) {
        super(scene, config.x, config.y, config.width, config.height);
        this.mScene = scene;
        this.on("textchange", this.onTextChange, this);
        this.on("onclick", this.onTextClick, this);
        this.on("ondblclick", this.onTextDbclick, this);
        this.on("focus", this.onTextFocus, this);
        this.on("blur", this.onTextBlur, this);
        this.mScene.input.on("gameobjectdown", this.sceneDown, this);
    }

    public set pos(value: any) {
        this.x = value.x;
        this.y = value.y;
    }

    public destroy() {
        this.off("textchange", this.onTextChange, this);
        this.off("onclick", this.onTextClick, this);
        this.off("ondblclick", this.onTextDbclick, this);
        this.off("focus", this.onTextFocus, this);
        this.off("blur", this.onTextBlur, this);
        super.destroy();
    }

    private sceneDown() {
        this.onTextBlur();
    }

    private onTextChange() {
        this.emit(InputTextEvent.Change);
    }

    private onTextClick() {
        this.emit(InputTextEvent.Click);
    }

    private onTextDbclick() {
        this.emit(InputTextEvent.DBClick);
    }

    private onTextFocus() {
        this.emit(InputTextEvent.Focus);
    }

    private onTextBlur() {
        this.emit(InputTextEvent.Blur);
    }

}