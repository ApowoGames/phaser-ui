"use strict";
/*
 * 多帧皮肤
 * @Author: gxm
 * @Date: 2020-03-10 10:51:27
 * @Last Modified by: gxm
 * @Last Modified time: 2020-03-10 15:41:03
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var button_1 = require("../button");
var SkinEvent;
(function (SkinEvent) {
    SkinEvent["LoadComplete"] = "LOAD_COMPLETE";
    SkinEvent["LoadError"] = "LOAD_ERROR";
    SkinEvent["FileLoadComplete"] = "FILELOADCOMPLETE";
    SkinEvent["Init"] = "INIT";
})(SkinEvent = exports.SkinEvent || (exports.SkinEvent = {}));
var FramesSkin = /** @class */ (function (_super) {
    __extends(FramesSkin, _super);
    function FramesSkin(scene, skinData) {
        var _this = _super.call(this) || this;
        _this.mInitialized = false;
        _this.mReloadTimes = 0;
        _this.mScene = scene;
        _this.mInitialized = false;
        _this.setSkinData(skinData);
        return _this;
    }
    FramesSkin.prototype.addResources = function (resource) {
        if (!this.mResourceMap) {
            this.mResourceMap = new Map();
        }
        this.mResourceMap.set(resource.key, resource);
    };
    /**
     * 切换多帧对象frame
     * @param frameState
     */
    FramesSkin.prototype.changeFrame = function (frameState) {
        if (this.mSkinData.background)
            this.setSpriteRes(frameState, this.mBgSprite);
        if (this.mSkinData.icon)
            this.setSpriteRes(frameState, this.mIconSprite);
    };
    Object.defineProperty(FramesSkin.prototype, "BackGround", {
        get: function () {
            return this.mBgSprite;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FramesSkin.prototype, "Icon", {
        get: function () {
            return this.mIconSprite;
        },
        enumerable: true,
        configurable: true
    });
    FramesSkin.prototype.destroy = function () {
        if (this.mBgSprite) {
            this.mBgSprite.destroy();
            this.mBgSprite = null;
        }
        if (this.mIconSprite) {
            this.mIconSprite.destroy();
            this.mIconSprite = null;
        }
        if (this.mSkinData) {
            if (this.mSkinData.background)
                this.mSkinData.background = null;
            if (this.mSkinData.icon)
                this.mSkinData.icon = null;
            this.mSkinData = null;
        }
        if (this.mResourceMap) {
            this.mResourceMap.clear();
            this.mResourceMap = null;
        }
        if (this.mReLoadResMap) {
            this.mReLoadResMap.clear();
            this.mReLoadResMap = null;
        }
        this.mInitialized = false;
        this.mReloadTimes = 0;
        _super.prototype.destroy.call(this);
    };
    FramesSkin.prototype.preload = function () {
        if (!this.mScene) {
            return;
        }
        if (this.mSkinData.background) {
            this.addResources(this.mSkinData.background);
        }
        if (this.mSkinData.icon) {
            this.addResources((this.mSkinData.icon));
        }
        this.startLoad();
    };
    Object.defineProperty(FramesSkin.prototype, "skin", {
        get: function () {
            return this.mBgSprite;
        },
        enumerable: true,
        configurable: true
    });
    FramesSkin.prototype.setSkinData = function (skinData) {
        this.mSkinData = skinData;
    };
    FramesSkin.prototype.loadComplete = function (loader, totalComplete, totalFailed) {
        if (this.mInitialized) {
            return;
        }
        if (totalFailed > 0) {
            this.reload();
            return;
        }
        this.offLoad();
        this.emit(SkinEvent.LoadComplete);
        this.init();
    };
    FramesSkin.prototype.loadError = function (file) {
        if (!this.mResourceMap) {
            return;
        }
        var resource = this.mResourceMap.get(file.key);
        if (!resource) {
            return;
        }
        // resource.dpr = 2; 加载失败后加载2X资源的特殊处理暂时屏蔽
        if (!this.mReLoadResMap) {
            this.mReLoadResMap = new Map();
        }
        this.mReLoadResMap.set(file.key, resource);
        this.emit(SkinEvent.LoadError);
    };
    FramesSkin.prototype.onFileKeyComplete = function (key) {
        if (!this.mResourceMap) {
            return;
        }
        if (this.mResourceMap.has(key)) {
            this.mResourceMap["delete"](key);
            this.emit(SkinEvent.FileLoadComplete, key);
        }
    };
    FramesSkin.prototype.init = function () {
        this.mInitialized = true;
        if (this.mResourceMap) {
            this.mResourceMap.clear();
            this.mResourceMap = null;
        }
        if (this.mReLoadResMap) {
            this.mReLoadResMap.clear();
            this.mReLoadResMap = null;
        }
        if (this.mSkinData.background)
            this.setSpriteRes(button_1.ButtonState.Normal, this.mBgSprite);
        if (this.mSkinData.icon)
            this.setSpriteRes(button_1.ButtonState.Normal, this.mIconSprite);
        this.emit(SkinEvent.Init);
    };
    FramesSkin.prototype.startLoad = function () {
        if (!this.mScene) {
            return;
        }
        this.mScene.load.on(Phaser.Loader.Events.FILE_KEY_COMPLETE, this.onFileKeyComplete, this);
        this.mScene.load.once(Phaser.Loader.Events.COMPLETE, this.loadComplete, this);
        this.mScene.load.once(Phaser.Loader.Events.FILE_LOAD_ERROR, this.loadError, this);
        this.mScene.load.start();
    };
    FramesSkin.prototype.reload = function () {
        var _this = this;
        if (!this.mReLoadResMap || this.mReLoadResMap.size <= 0) {
            return;
        }
        if (++this.mReloadTimes > 1) {
            return;
        }
        this.mReLoadResMap.forEach(function (resource) {
            _this.addResources(resource);
        }, this);
        this.startLoad();
    };
    FramesSkin.prototype.offLoad = function () {
        if (!this.mScene) {
            return;
        }
        this.mScene.load.off(Phaser.Loader.Events.FILE_KEY_COMPLETE, this.onFileKeyComplete, this);
        this.mScene.load.off(Phaser.Loader.Events.COMPLETE, this.loadComplete, this);
        this.mScene.load.off(Phaser.Loader.Events.FILE_LOAD_ERROR, this.loadError, this);
    };
    FramesSkin.prototype.setSpriteRes = function (frameName, sprite) {
        var texture_Key = this.mSkinData.background.key;
        var normal_Frame = texture_Key + "_" + frameName;
        var framesObj = this.mScene.textures.get(texture_Key).frames;
        var texture = framesObj[normal_Frame];
        if (!sprite) {
            sprite = this.mScene.make.sprite({ key: undefined }, false);
        }
        if (texture) {
            sprite.setTexture(texture_Key, normal_Frame);
        }
        else {
            // 如果没有写入frame，默认显示"__BASE"第一帧
            sprite.setTexture(texture_Key);
        }
    };
    return FramesSkin;
}(Phaser.Events.EventEmitter));
exports.FramesSkin = FramesSkin;
