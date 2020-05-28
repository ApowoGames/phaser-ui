import { NineSlicePatch } from "../ninepatch/NineSlicePatch";
import { IButtonState } from "../interface/button/IButtonState";
import { IPatchesConfig } from "../interface/baseUI/Patches.config";

export class NineSliceButton extends Phaser.GameObjects.Container implements IButtonState {
    protected mLabel: Phaser.GameObjects.Text;
    protected mNingBg: NineSlicePatch;
    protected mKey: string;
    protected mFrame: string;
    protected mFrame_nrmal: string;
    protected mFrame_down: string;
    protected mFrame_over: string;
    protected btnData: any;
    private mScene: Phaser.Scene;
    constructor(scene: Phaser.Scene, x: number, y: number, width: number, height: number, key: string, frame: string, text?: string, config?: IPatchesConfig, data?: any) {
        super(scene, x, y);
        this.mScene = scene;
        this.mKey = key;
        this.mFrame = frame ? frame : "__BASE";
        this.initFrame();
        this.setSize(width, height);
        this.mNingBg = new NineSlicePatch(this.scene, 0, 0, width, height, key, this.mFrame_nrmal, config);
        this.add(this.mNingBg);
        if (data) {
            this.btnData = data;
        }

        this.mLabel = this.scene.make.text(undefined, false)
            .setOrigin(0.5, 0.5)
            .setSize(this.width, this.height)
            .setAlign("center")
            .setText(text);
        this.add(this.mLabel);

        // this.setSize(this.mNingBg.width, this.mNingBg.height);
        this.setInteractive(new Phaser.Geom.Rectangle(0, 0, width, height), Phaser.Geom.Rectangle.Contains);
        this.on("pointerdown", this.onPointerDown, this);
        this.on("pointerup", this.onPointerUp, this);
        // this.on("pointerout", this.changeNormal, this);
        // this.on("pointerover", this.changeOver, this);
    }

    public set enable(value) {
        if (value) {
            this.mNingBg.clearTint();
            this.mLabel.clearTint();
            this.setInteractive();
        } else {
            this.mNingBg.setTintFill(0x666666);
            this.mLabel.setTintFill(0x777777);
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

    public setFrame(frame: string | number): this {
        this.mNingBg.setFrame(frame);
        return this;
    }

    public destroy(fromScene?: boolean): void {
        if (this.mLabel) this.mLabel.destroy();
        super.destroy(fromScene);
    }

    public setFrameNormal(normal: string, down?: string, over?: string) {
        this.mFrame_nrmal = normal;
        this.mFrame_down = (down ? down : normal);
        this.mFrame_over = (over ? over : normal);
        this.changeNormal();
        return this;
    }

    // public setState(val: string) {
    // }

    public changeNormal() {
        this.setFrame(this.mFrame_nrmal);
    }

    public changeDown() {
        // this.scale = 0.9;
        this.setFrame(this.mFrame_down);
    }

    protected changeOver() {
        // this.setTexture()
        this.setFrame(this.mFrame_over);
    }

    protected isExists(frame: string) {
        const originTexture = this.scene.textures.get(this.mKey);
        if (originTexture && originTexture.has(frame)) return true;
        return false;
    }

    protected onPointerDown(pointer) {
        this.changeDown();
    }

    protected onPointerUp(pointer) {
        this.changeNormal();
        this.emit("click", pointer, this);
    }

    get label(): Phaser.GameObjects.Text {
        return this.mLabel;
    }

    private scaleHandler() {
        this.mScene.tweens.add({
            targets: this,
            duration: 50,
            ease: "Linear",
            props: {
                scaleX: { value: .5 },
                scaleY: { value: .5 },
            },
            yoyo: true,
            repeat: 0,
        });
        this.scaleX = this.scaleY = 1;
    }

    private initFrame() {
        const frame = this.mFrame ? this.mFrame : this.mKey;
        this.mFrame_nrmal = `${frame}_normal`;
        let down = `${frame}_down`;
        if (!this.isExists(down)) {
            down = `${frame}_normal`;
        }
        this.mFrame_down = down;
        let over = `${frame}_over`;
        if (!this.isExists(over)) {
            over = `${frame}_normal`;
        }
        this.mFrame_over = over;
    }
}
