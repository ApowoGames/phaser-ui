"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bbcodetext_1 = require("../../plugins/bbcodetext");
const TextEdit_1 = require("../../plugins/behaviors/textedit/TextEdit");
class TextBox extends Phaser.Events.EventEmitter {
    constructor(scene, config) {
        super();
        const textConfig = config.textConfig;
        const posX = textConfig.x;
        const posY = textConfig.y;
        const editType = config.editType;
        const str = config.text || "";
        const textChangeHandler = config.onTextChanged || undefined;
        const closeHandler = config.onClose || undefined;
        const editConfig = { type: editType, text: str, onTextChanged: textChangeHandler };
        const styleConfig = {};
        Object.assign(styleConfig, textConfig);
        this.mBBCodeText = new bbcodetext_1.default(scene, posX, posY, str, styleConfig);
        this.mBBCodeText.setOrigin(0.5, 0.5);
        this.mBBCodeText.setInteractive();
        this.mBBCodeText.on("pointerdown", () => {
            if (!this.mTextEdit) {
                this.mTextEdit = new TextEdit_1.default(this.mBBCodeText);
                this.mTextEdit.open(editConfig, closeHandler);
            }
            // (<any>scene).plugins.get("Tooqingtexteditplugin").edit(this.mBBCodeText, editConfig);
        }, this);
    }
    get isOpened() {
        return this.mTextEdit ? this.mTextEdit.isOpened : false;
    }
    get text() {
        return this.mTextEdit ? this.mTextEdit.text : "";
    }
    get view() {
        return this.mBBCodeText;
    }
    close() {
        if (this.mTextEdit) {
            this.mTextEdit.close();
            this.mTextEdit.destroy();
        }
    }
    destroy() {
        this.close();
        if (this.mBBCodeText)
            this.mBBCodeText.destroy();
        super.destroy();
    }
}
exports.TextBox = TextBox;
