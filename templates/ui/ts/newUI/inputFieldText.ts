
import InputText from "../../../../plugins/gameobjects/inputtext/InputText";
import { TextConfig } from "../interface/textConfig";
import { Tool } from "../tool/tool";
import { Transform } from "../interface/transform";
import { InputTextEvent } from "../interface/inputTextEvent";
export class InputFieldText extends InputText {
    private mScene: Phaser.Scene;
    constructor(scene: Phaser.Scene, config: TextConfig) {
        const transform: Transform = !config ? undefined : config.transform;
        const pos: any = Tool.getPos(transform);
        const posX: number = pos.x;
        const posY: number = pos.y;
        const baseWidth = !transform && !transform.width ? 0 : transform.width;
        const baseHeight = !transform && !transform.height ? 0 : transform.height;
        super(scene, posX, posY, baseWidth, baseHeight);
        this.mScene = scene;
        this.on("textchange", this.onTextChange, this);
        this.on("onclick", this.onTextClick, this);
        this.on("ondblclick", this.onTextDbclick, this);
        this.on("focus", this.onTextFocus, this);
        this.on("blur", this.onTextBlur, this);
        this.mScene.input.on("gameobjectdown", this.sceneDown, this);
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