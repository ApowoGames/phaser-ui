"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
import Panel from "../panel/Panel";
import BBCodeText from "../../plugins/gameobjects/text/bbcodetext/BBCodeText.js";
import ClickEvent from "../interface/event/ClickEvent";
import { Button } from "../button/Button";
const GetValue = Phaser.Utils.Objects.GetValue;
/**
 * @class MessageBox
 * @memberof tooqingui
 * @extends tooqingui.Panel
 */
class MessageBox extends Panel {
    constructor(scene, world, config) {
        super(scene, world);
        this.btnNum = 2;
        this.key = config !== undefined ? GetValue(config, "key", "pica_alert") : "pica_alert";
        this.png =
            config !== undefined ? GetValue(config, "png", "pica_alert/pica_alert.png") : "pica_alert/pica_alert.png";
        this.json =
            config !== undefined ? GetValue(config, "json", "pica_alert/pica_alert.json") : "pica_alert/pica_alert.json";
        this.bgFrame = config !== undefined ? GetValue(config, "bgFrame", "bg.png") : "bg.png";
        this.titleFrame = config !== undefined ? GetValue(config, "titleFrame", "title.png") : "title.png";
        this.disInteractive();
    }
    show(config) {
        this.mCurData = config;
        super.show(config);
        if (this.mInitialized) {
            this.mWorld.uiManager.getUILayerManager().addToDialogLayer(this);
            this.x = this.scene.cameras.main.width / 2;
            this.y = this.scene.cameras.main.height / 2;
            this.mContent.setText(config.text);
            if (config.title) {
                this.mTitleLabel.setText(config.title);
            }
            if (this.btnNum > 0 && (!this.btnList || this.btnList.length < 1))
                this.setbtnNum(this.btnNum);
        }
    }
    preload() {
        this.addAtlas(this.key, this.png, this.json);
        super.preload();
    }
    setText(str) {
        if (this.mContent)
            this.mContent.setText("[color=#FF0000]" + str + "[/color]");
    }
    setTitle(str) {
        if (this.mTitleLabel)
            this.mTitleLabel.setText(str);
    }
    setbtnNum(btnNum) {
        if (btnNum) {
            this.btnNum = btnNum;
        }
        else {
            this.btnNum = MessageBox.OK;
        }
        if (!this.mInitialized)
            return;
        this.btnList = [];
        if (this.btnNum >= MessageBox.OK) {
            this.add(this.mOkBtn);
            this.mOkBtn.visible = true;
            this.btnList.push(this.mOkBtn);
        }
        if (this.btnNum >= MessageBox.CANCEL) {
            this.add(this.mCancelBtn);
            this.mCancelBtn.visible = true;
            this.btnList.push(this.mCancelBtn);
        }
        const w = this.width / (this.btnList.length + 1);
        for (let i = 0; i < this.btnList.length; i++) {
            this.btnList[i].x = i * w - (this.btnList[i].width >> 1);
        }
    }
    addResources(key, resource) {
        super.addResources(key, resource);
        if (resource.data)
            this.scene.load.atlas(key, this.png, this.json);
    }
    init() {
        const bg = this.scene.make.image({
            key: this.key,
            frame: this.bgFrame,
        }, false);
        this.setSize(bg.width, bg.height);
        const title = this.scene.make.image({
            key: this.key,
            frame: this.titleFrame,
        }, false);
        title.y = -bg.height / 2;
        this.mTitleLabel = this.scene.make
            .text({
                text: "title",
                style: {
                    fontFamily: "'Source Han Sans'",
                    fontSize: 10 * this.dpr,
                    color: "#905B06",
                },
            }, false)
            .setOrigin(0.5);
        this.mTitleLabel.y = title.y;
        this.mContent = new BBCodeText(this.scene, 0, -11 * this.dpr, "", {
            fontSize: 9 * this.dpr + "px",
            fontFamily: "'Source Han Sans'",
            color: "#0",
            wrap: {
                mode: "char",
                width: 145 * this.dpr,
            },
        });
        this.mContent.setOrigin(0.5, 0.5);
        this.mContent.setText("[color=#FF0000]content[/color]");
        this.mOkBtn = new Button(this.scene, this.key, "yellow_btn.png", undefined, "确定");
        this.mOkBtn.setTextColor("#905B06");
        this.mOkBtn.x = (bg.width - this.mOkBtn.width) / 2 - 20 * this.dpr;
        this.mOkBtn.y = (bg.height - this.mOkBtn.height) / 2 - 11 * this.dpr;
        this.mOkBtn.on(ClickEvent.Tap, this.onOkHandler, this);
        this.mCancelBtn = new Button(this.scene, this.key, "red_btn.png", undefined, "取消");
        this.mCancelBtn.x = -(bg.width - this.mCancelBtn.width) / 2 + 20 * this.dpr;
        this.mCancelBtn.y = this.mOkBtn.y;
        this.mCancelBtn.on(ClickEvent.Tap, this.onCancelHandler, this);
        this.add([bg, title, this.mTitleLabel, this.mTitleLabel, this.mContent, this.mOkBtn, this.mCancelBtn]);
        this.mCancelBtn.visible = false;
        this.mOkBtn.visible = false;
        super.init();
    }
    onOkHandler() {
        if (!this.mCurData) {
            return;
        }
        const callback = this.mCurData.callback;
        if (callback) {
            callback.call(this.mCurData.content);
        }
    }
    onCancelHandler() {
        if (!this) {
            return;
        }
        if (this.parentContainer) {
            this.parentContainer.remove(this);
        }
    }
}
MessageBox.OK = 1;
MessageBox.CANCEL = 2;
export default MessageBox;
