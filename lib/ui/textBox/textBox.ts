import { TextEditConfig } from "../interface/textedit/TexteditConfig";
import BBCodeText from "../../plugins/bbcodetext";
import { TextConfig } from "../interface/text/TextConfig";
import { TextType } from "../interface/text/TextType";
import TextEdit from "../../plugins/behaviors/textedit/TextEdit";
export class TextBox extends Phaser.Events.EventEmitter {
    private mBBCodeText: BBCodeText;
    private mTextEdit: TextEdit;
    constructor(scene: Phaser.Scene, config: TextEditConfig) {
        super();
        const textConfig: TextConfig = config.textConfig;
        const posX: number = textConfig.x;
        const posY: number = textConfig.y;
        const editType: TextType = config.editType;
        const str: string = config.text || "";
        const textChangeHandler: Function = config.onTextChanged || undefined;
        const closeHandler: Function = config.onClose || undefined;
        const editConfig = { type: editType, text: str, onTextChanged: textChangeHandler };
        const styleConfig = {};
        Object.assign(styleConfig, textConfig);
        this.mBBCodeText = new BBCodeText(scene, posX, posY, str, styleConfig);
        (<any>this.mBBCodeText).setOrigin(0.5, 0.5);
        this.mBBCodeText.setInteractive();
        this.mBBCodeText.on("pointerdown", () => {
            if (!this.mTextEdit) {
                this.mTextEdit = new TextEdit(this.mBBCodeText);
                this.mTextEdit.open(editConfig, closeHandler);
            }
            // (<any>scene).plugins.get("rextexteditplugin").edit(this.mBBCodeText, editConfig);
        }, this);
    }

    public get isOpened(): boolean {
        return this.mTextEdit ? this.mTextEdit.isOpened : false;
    }

    public get text(): string {
        return this.mTextEdit ? this.mTextEdit.text : "";
    }

    public get view(): Phaser.GameObjects.GameObject {
        return this.mBBCodeText;
    }

    public close() {
        if (this.mTextEdit) {
            this.mTextEdit.close();
            this.mTextEdit.destroy();
        }
    }

    public destroy() {
        this.close();
        if (this.mBBCodeText) this.mBBCodeText.destroy();
        super.destroy();
    }
}
