"use strict";
/*
 * 按钮组件
 * @Author: gxm
 * @Date: 2020-03-10 10:51:48
 * @Last Modified by: gxm
 * @Last Modified time: 2020-03-10 12:00:22
 */
exports.__esModule = true;
var baseSkin_1 = require("./baseSkin");
var pos_1 = require("../../../utils/pos");
var ButtonState;
(function (ButtonState) {
    ButtonState["Normal"] = "normal";
    ButtonState["Over"] = "over";
    ButtonState["Select"] = "select";
    ButtonState["Disable"] = "disable";
})(ButtonState = exports.ButtonState || (exports.ButtonState = {}));
var GetValue = Phaser.Utils.Objects.GetValue;
var Button = /** @class */ (function () {
    function Button(config) {
        this.mConfig = config;
        var transform = config.transform;
        var posX = this.getPos(transform).x;
        var posY = this.getPos(transform).y;
        var scene = transform.scene;
        var dpr = transform.dpr;
        var baseWidth = transform.width;
        var baseHeight = transform.height;
        this.mContainer = scene.make.container({ x: posX, y: posY, width: baseWidth * dpr, height: baseHeight * dpr }, false);
        this.mContainer.setInteractive(new Phaser.Geom.Rectangle(0, 0, baseWidth * dpr, baseHeight * dpr), Phaser.Geom.Rectangle.Contains);
        this.mFrameSkin = new baseSkin_1.FramesSkin(scene, config.framesSkinData);
        this.mFrameSkin.on(baseSkin_1.SkinEvent.Init, this.skinInitHandler, this);
        this.mFrameSkin.preload();
    }
    Object.defineProperty(Button.prototype, "selected", {
        get: function () {
            return this.mSelected;
        },
        set: function (value) {
            this.mSelected = value;
            var buttonState = value ? ButtonState.Select : ButtonState.Normal;
            if (this.mFrameSkin) {
                this.mFrameSkin.changeFrame(buttonState);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Button.prototype, "enabled", {
        get: function () {
            return this.mEnabled;
        },
        set: function (value) {
            this.mEnabled = value;
            var buttonState = value ? ButtonState.Normal : ButtonState.Disable;
            if (this.mFrameSkin) {
                this.mFrameSkin.changeFrame(buttonState);
            }
        },
        enumerable: true,
        configurable: true
    });
    Button.prototype.setViewData = function (viewData) {
        var scene = this.mConfig.framesSkinData.background.transForm.scene;
        if (!this.mFrameSkin) {
            this.mFrameSkin = new baseSkin_1.FramesSkin(scene, viewData);
        }
        else {
            this.mFrameSkin.setSkinData(viewData);
        }
        this.mFrameSkin.on(baseSkin_1.SkinEvent.Init, this.skinInitHandler, this);
        this.mFrameSkin.preload();
    };
    Button.prototype.setProvider = function (provider) {
    };
    Button.prototype.skinInitHandler = function () {
        this.mFrameSkin.off(baseSkin_1.SkinEvent.Init, this.skinInitHandler, this);
        var bgTransform = this.mConfig.framesSkinData.background.transForm;
        this.getPos(bgTransform);
        this.mFrameSkin.BackGround.x = this.getPos(bgTransform).x;
        this.mFrameSkin.BackGround.y = this.getPos(bgTransform).y;
        this.mContainer.add(this.mFrameSkin.BackGround);
        if (this.mFrameSkin.Icon) {
            this.mFrameSkin.Icon.x = this.getPos(this.mConfig.framesSkinData.icon.transForm).x;
            this.mFrameSkin.Icon.y = this.getPos(this.mConfig.framesSkinData.icon.transForm).y;
            this.mContainer.add(this.mFrameSkin.Icon);
        }
    };
    Button.prototype.getPos = function (transform) {
        var pos = new pos_1.Pos();
        var tmpValue;
        if (typeof (transform.x) === "string") {
            tmpValue = GetValue(transform, "x", "100%");
            pos.x = Number(tmpValue.split("%")[0]) * transform.width;
        }
        else {
            pos.x = GetValue(transform, "x", 0);
        }
        if (typeof (transform.y) === "string") {
            tmpValue = GetValue(transform, "y", "100%");
            pos.y = Number(tmpValue.split("%")[0]) * transform.width;
        }
        else {
            pos.y = GetValue(transform, "y", 0);
        }
        return pos;
    };
    return Button;
}());
exports.Button = Button;
