
import { NineSlicePatch } from "../ninepatch/NineSlicePatch";
import { TabButton } from "./TabButton";
import { IPatchesConfig } from "../interface/baseUI/Patches.config";

export class NinePatchTabButton extends TabButton {
    protected mKey: string;
    protected btnData: any;
    private mScene: Phaser.Scene;
    constructor(scene: Phaser.Scene, width: number, height: number, key: string, normalFrame: string, downFrame?: string, text?: string, config?: IPatchesConfig, data?: any) {
        super(scene, key, normalFrame, downFrame, text);
        this.setSize(width, height);
        if (data) {
            this.btnData = data;
        }
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

    protected createBackground() {
        this.mBackground = new NineSlicePatch(this.scene, 0, 0, 10, 10, this.mKey, this.mFrame, { left: 10, top: 10, right: 10, bottom: 10 });
        this.add(this.mBackground);
    }
}
