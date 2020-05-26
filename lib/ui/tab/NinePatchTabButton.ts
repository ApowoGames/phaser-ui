
import { NineSlicePatch } from "../ninepatch/NineSlicePatch";
import { TabButton } from "./TabButton";
import { IPatchesConfig, resetPatchesConfig } from "../interface/baseUI/Patches.config";

export class NinePatchTabButton extends TabButton {
    protected mKey: string;
    protected btnData: any;
    protected mBackground: NineSlicePatch;
    protected mBackgroundNormal: NineSlicePatch;
    private mScene: Phaser.Scene;
    private configlist: IPatchesConfig[];
    private wid: number = 0;
    private hei: number = 0;
    constructor(scene: Phaser.Scene, width: number, height: number, key: string, normalFrame: string, downFrame?: string, text?: string, configlist?: IPatchesConfig[], dpr?: number, scale?: number, data?: any) {
        super(scene, key, normalFrame, downFrame, text);
        this.configlist = configlist;
        this.mBackground.setConfig(configlist[0]);
        this.wid = width;
        this.hei = height;
        this.dpr = dpr || 1;
        this.scale = scale || 1;
        this.setSize(width, height);
        if (data) {
            this.btnData = data;
        }
        this.changeNormal();
        this.enable = true;
    }
    changeNormal() {
        if (this.configlist && this.configlist.length > 0) {
            // resetPatchesConfig(this.mBackground.getConfig());
            this.mBackground.setConfig(this.configlist[0]);
            this.setSize(this.wid, this.hei);
        }
        this.setBgFrame(this.mFrame);
    }

    changeDown() {
        if (this.mDownFrame) {
            if (this.configlist && this.configlist.length > 1) {
                // resetPatchesConfig(this.mBackground.getConfig());
                this.mBackground.setConfig(this.configlist[1]);
                this.setSize(this.wid, this.hei);
            }
            this.setBgFrame(this.mDownFrame);
        }
    }

    public setSize(width: number, height: number) {
        super.setSize(width, height);
        this.mBackground.setSize(width, height);
        return this;
    }
    public getBtnData(): any {
        return this.btnData;
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

    protected createBackground() {
        this.mBackground = new NineSlicePatch(this.scene, 0, 0, 10, 10, this.mKey, this.mFrame, { left: 2, top: 2, right: 2, bottom: 2 }, this.dpr, 1);
        this.add(this.mBackground);
    }
}
