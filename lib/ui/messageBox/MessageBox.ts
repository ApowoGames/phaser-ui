import { Panel } from "../panel/Panel";
import BBCodeText from "../../plugins/bbcodetext";
import { Button } from "../button/Button";
import { MouseEvent } from "../interface/event/MouseEvent";
export interface MessageBoxConfig {
    key: string,
    png: string,
    json: string,
    bgFrame: string,
    titleFrame: string
}
const GetValue = Phaser.Utils.Objects.GetValue;
export class MessageBox extends Panel {
    public static OK: number = 1;
    public static CANCEL: number = 2;
    private key: string;
    private png: string;
    private json: string;
    private bgFrame: string;
    private titleFrame: string;
    private mOkBtn: Button;
    private mCancelBtn: Button;
    private mContent: BBCodeText;
    private mTitleLabel: Phaser.GameObjects.Text;
    private btnNum: number = 2;
    constructor(scene: Phaser.Scene, world: any, config?: MessageBoxConfig) {
        super(scene, world);
        this.key = config !== undefined ? GetValue(config, "key", "pica_alert") : "pica_alert";
        this.png = config !== undefined ? GetValue(config, "png", "pica_alert/pica_alert.png") : "pica_alert/pica_alert.png";
        this.json = config !== undefined ? GetValue(config, "json", "pica_alert/pica_alert.json") : "pica_alert/pica_alert.json";
        this.bgFrame = config !== undefined ? GetValue(config, "bgFrame", "bg.png") : "bg.png";
        this.titleFrame = config !== undefined ? GetValue(config, "titleFrame", "title.png") : "title.png";
        this.disInteractive();
    }

    show(config: IAlertConfig) {
        this.data = config;
        super.show(config);
        if (this.mInitialized) {
            this.mWorld.uiManager.getUILayerManager().addToDialogLayer(this.container);
            this.x = this.scene.cameras.main.width / 2;
            this.y = this.scene.cameras.main.height / 2;

            this.mContent.setText(config.text);
            if (config.title) {
                this.mTitleLabel.setText(config.title);
            }
        }
    }

    preload() {
        this.addAtlas(this.key, this.png, this.json);
        super.preload();
    }
    setText(str: string) {
        if (this.mContent) this.mContent.setText("[color=#FF0000]" + str + "[/color]");
    }
    setTitle(str: string) {
        if (this.mTitleLabel) this.mTitleLabel.setText(str);
    }
    setbtnNum(btnNum: number) {
        if (btnNum) {
            this.btnNum = btnNum;
        } else {
            this.btnNum = MessageBox.OK;
        }

        const btns = [];
        if ((this.btnNum & MessageBox.OK) === MessageBox.OK) {
            this.add(this.mOkBtn);
            btns.push(this.mOkBtn);
        }
        if ((this.btnNum & MessageBox.CANCEL) === MessageBox.CANCEL) {
            this.add(this.mCancelBtn);
            btns.push(this.mCancelBtn);
        }

        const w = (this.width) / (btns.length + 1);
        for (let i = 0; i < btns.length; i++) {
            btns[i].x = (i + 1) * w - (btns[i].width >> 1);
        }
    }


    protected init() {
        const bg = this.scene.make.image({
            key: this.key,
            frame: this.bgFrame
        }, false);

        const title = this.scene.make.image({
            key: this.key,
            frame: this.titleFrame
        }, false);
        title.y = -bg.height / 2;

        this.mTitleLabel = this.scene.make.text({
            text: "title",
            style: {
                fontFamily: "'Source Han Sans'",
                fontSize: 10 * this.dpr,
                color: "#905B06"
            }
        }, false).setOrigin(0.5);
        this.mTitleLabel.y = title.y;

        this.mContent = new BBCodeText(this.scene, 0, -11 * this.dpr, "", {
            fontSize: 9 * this.dpr + "px",
            fontFamily: "'Source Han Sans'",
            color: "#0",
            wrap: {
                mode: "char",
                width: 145 * this.dpr
            }
        });
        this.mContent.setOrigin(0.5, 0.5);
        this.mContent.setText("[color=#FF0000]content[/color]");

        this.mOkBtn = new Button(this.scene, this.key, "yellow_btn.png", undefined, "确定");
        this.mOkBtn.setTextColor("#905B06");
        this.mOkBtn.x = (bg.width - this.mOkBtn.view.width) / 2 - 20 * this.dpr;
        this.mOkBtn.y = (bg.height - this.mOkBtn.view.height) / 2 - 11 * this.dpr;
        this.mOkBtn.on(MouseEvent.Tap, this.onOkHandler, this);

        this.mCancelBtn = new Button(this.scene, this.key, "red_btn.png", undefined, "取消");
        this.mCancelBtn.x = -(bg.width - this.mCancelBtn.view.width) / 2 + 20 * this.dpr;
        this.mCancelBtn.y = this.mOkBtn.y;
        this.mCancelBtn.on(MouseEvent.Tap, this.onCancelHandler, this);
        this.add([bg, title, this.mTitleLabel, this.mTitleLabel, this.mContent]);
        super.init();
    }

    private onOkHandler() {
        if (!this.data) {
            return;
        }
        const callback = this.data.callback;
        if (callback) {
            callback.call(this.data.content);
        }
    }

    private onCancelHandler() {
        if (!this.container) {
            return;
        }
        if (this.container.parentContainer) {
            this.container.parentContainer.remove(this.container);
        }
    }
}

export interface IAlertConfig {
    text: string;
    title?: string;
    callback: Function;
    content?: any;
}
