
import { NineSlicePatch } from "../ninepatch/NineSlicePatch";
import { TabButton } from "./TabButton";
import { IPatchesConfig } from "../interface/baseUI/Patches.config";

export class NinePatchTabButton extends TabButton {
    protected mKey: string;
    protected btnData: any;
    protected mBackground: NineSlicePatch;
    private mScene: Phaser.Scene;
    constructor(scene: Phaser.Scene, width: number, height: number, key: string, normalFrame: string, downFrame?: string, text?: string, config?: IPatchesConfig, data?: any) {
        super(scene, key, normalFrame, downFrame, text);
        this.mBackground.setConfig(config);
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
        this.mBackground = new NineSlicePatch(this.scene, 0, 0, 10, 10, this.mKey, this.mFrame, { left: 2, top: 2, right: 2, bottom: 2 });
        this.add(this.mBackground);
        this.setSize(this.mBackground.width, this.mBackground.height);
    }
}
