
import { NineSlicePatch } from "../ninepatch/NineSlicePatch";
import { TabButton } from "./TabButton";
import { IPatchesConfig } from "../interface/baseUI/Patches.config";

export class NinePatchTabButton extends TabButton {
    protected mLabel: Phaser.GameObjects.Text;
    protected mKey: string;
    protected btnData: any;
    private mScene: Phaser.Scene;
    constructor(scene: Phaser.Scene, x: number, y: number, width: number, height: number, key: string, normalFrame: string, downFrame?: string, text?: string, config?: IPatchesConfig, data?: any) {
        super(scene, key, normalFrame, downFrame);
        this.mScene = scene;
        this.mKey = key;
        this.mFrame = normalFrame;
        this.mDownFrame = downFrame ? downFrame : "__BASE";
        this.mBackground = new NineSlicePatch(this.scene, 0, 0, width, height, key, this.mFrame, config);
        this.setSize(width, height);
        this.add(this.mBackground);
        if (data) {
            this.btnData = data;
        }

        this.mLabel = this.scene.make.text(undefined, false)
            .setOrigin(0.5, 0.5)
            .setSize(this.width, this.height)
            .setAlign("center")
            .setText(text);
        this.add(this.mLabel);
    }

    public set enable(value) {
        if (value) {
            this.mBackground.clearTint();
            this.setInteractive();
        } else {
            this.mBackground.setTintFill(0x666666);
            this.removeInteractive();
        }
    }

    public getBtnData(): any {
        return this.btnData;
    }

    public setText(text: string) {
        this.mLabel.setText(text);
    }

    public getText(): string {
        return this.mLabel.text;
    }

    public setTextStyle(style: object) {
        this.mLabel.setStyle(style);
    }

    public setFontStyle(val: string) {
        this.mLabel.setFontStyle(val);
    }

    public setTextOffset(x: number, y: number) {
        this.mLabel.setPosition(x, y);
    }

    public destroy(): void {
        if (this.mLabel) this.mLabel.destroy();
        super.destroy();
    }

    get label(): Phaser.GameObjects.Text {
        return this.mLabel;
    }

    protected setBgFrame(frame: string) {
        (this.mBackground as NineSlicePatch).setFrame(frame);
        this.setSize(this.mBackground.width, this.mBackground.height);
    }
}
