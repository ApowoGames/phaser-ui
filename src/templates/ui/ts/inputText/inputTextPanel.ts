import { InputFieldText } from "./inputFieldText";
import { Tool } from "../tool/tool";
import { IInputPanelConfig } from "../interface/inputtext/iInputPanelConfig";
import { Transform } from "../interface/pos/transform";
import { TextConfig } from "../interface/text/textConfig";
import { InputTextEvent } from "../interface/event/inputTextEvent";


export class InputTextPanel extends Phaser.GameObjects.Container {
    private mInputText: InputFieldText;
    private mBg: Phaser.GameObjects.Graphics;
    private mConfig: IInputPanelConfig;
    constructor(scene: Phaser.Scene, config: IInputPanelConfig) {
        const transform: Transform = !config ? undefined : config.transform;
        const pos: any = Tool.getPos(transform);
        const posX: number = pos.x || 0;
        const posY: number = pos.y;
        super(scene, posX, posY);
        this.mConfig = config;
        const baseWidth = !transform && !transform.width ? 0 : transform.width;
        const baseHeight = !transform && !transform.height ? 0 : transform.height;
        const textconfig: TextConfig = config && !config.textConfig ? undefined : config.textConfig;
        const bgColor: number = !config && !config.bgColor ? 0x0000 : config.bgColor;
        const alpha: number = !config && !config.alpha ? 0.5 : config.alpha;
        this.mBg = scene.make.graphics(undefined, false);
        this.mBg.fillStyle(bgColor, alpha);
        this.mBg.fillRect(0, 0, baseWidth, baseHeight);
        this.setInteractive(new Phaser.Geom.Rectangle(0, 0, baseWidth, baseHeight), Phaser.Geom.Rectangle.Contains);
        this.mInputText = new InputFieldText(scene, textconfig);
        this.mInputText.on(InputTextEvent.Blur, this.blurHandler, this);
        this.mInputText.on(InputTextEvent.Focus, this.focusHandler, this);
        this.add(this.mBg);
        this.add(this.mInputText);
    }

    public refreshView(x: number, y: number, width: number, height: number): Phaser.GameObjects.Container {
        this.setSize(width, height);
        if (this.mBg) this.mBg.clear();
        const bgColor: number = !this.mConfig && !this.mConfig.bgColor ? 0x0000 : this.mConfig.bgColor;
        const alpha: number = !this.mConfig && !this.mConfig.alpha ? 0.5 : this.mConfig.alpha;
        this.mBg.fillStyle(bgColor, alpha);
        this.mBg.fillRect(x, y, width, height);
        this.setInteractive(new Phaser.Geom.Rectangle(0, 0, width, height), Phaser.Geom.Rectangle.Contains);
        return this;
    }

    public get text(): string {
        return this.mInputText.text;
    }

    public destroy() {
        this.mInputText.off(InputTextEvent.Blur, this.blurHandler, this);
        this.mInputText.off(InputTextEvent.Focus, this.focusHandler, this);
        super.destroy();
    }

    private focusHandler() {

    }

    private blurHandler() {
        this.emit("inputBlur", this.text);
        this.destroy();
    }
}