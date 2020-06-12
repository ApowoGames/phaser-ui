"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Tool = require("../tool/Tool");
const BaseUI = require("../baseUI/BaseUI");
/**
 * @class Panel
 * @memberof tooqingui
 * @extends tooqingui.BaseUI
 * @constructor
 * @extends tooqingui.IAbstractPanel
 * @param {Phaser.Scene} scene
 * @param {*} world
 * @param {*} [music]
 */
class Panel extends BaseUI {
    constructor(scene, world, music) {
        super(scene, world.dpr, world.uiScaleNew);
        /**
         * @name tooqingui.Panel#mPanelTween
         * @type {Phaser.Tweens.Tween}
         * @protected
         */
        this.mPanelTween;
        /**
         * @name tooqingui.Panel#mResources
         * @type {Map<string,any>}
         * @protected
         */
        this.mResources;
        /**
         * @name tooqingui.Panel#mReloadTimes
         * @type {Map<string,any>}
         * @protected
         */
        this.mReLoadResources;
        /**
         * @name tooqingui.Panel#mShowData
         * @type {*}
         * @protected
         */
        this.mShowData;
        /**
         * @name tooqingui.Panel#id
         * @type {number}
         * @public
         */
        this.id;
        /**
         * @name tooqingui.Panel#UIType
         * @type {tooqingui.UIType}
         * @public
         */
        this.UIType;
        /**
         * @name tooqingui.Panel#mPerLoad
         * @type {boolean}
         * @protected
         */
        this.mPreLoad = false;
        /**
         * @name tooqingui.Panel#mTweening
         * @type {boolean}
         * @protected
         */
        this.mTweening = false;
        /**
         * @name tooqingui.Panel#mReloadTimes
         * @type {number}
         * @protected
         */
        this.mReloadTimes = 0;
        /**
         * @name tooqingui.Panel#mTweenBoo
         * @type {boolean}
         * @protected
         */
        this.mTweenBoo = true;
        /**
         * @name tooqingui.Panel#mMute
         * @type {boolean}
         * @protected
         */
        this.mMute = false;
        /**
         * @name tooqingui.Panel#mEnabled
         * @type {boolean}
         * @protected
         */
        this.mEnabled = true;
        this.soundMap = new Map();
        this.scene = scene;
        /**
         * @name tooqingui.Panel#mWorld
         * @type {*}
         * @protected
         */
        this.mWorld = world;
        /**
         * @name tooqingui.Panel#soundGroup
         * @type {tooqingui.ISoundGroup}
         * @protected
         */
        this.soundGroup = music;
        this.mInitialized = false;
        this.setTween(false);
    }
    /**
     * @method tooqingui.Panel#addListen
     */
    addListen() {
        if (!this.mInitialized)
            return;
        this.removeListen();
        super.addListen();
    }
    /**
     * @method tooqingui.Panel#removeListen
     */
    removeListen() {
        if (!this.mInitialized)
            return;
        super.removeListen();
    }
    /**
     * @method tooqingui.Panel#setFollow
     * @param {*} gameObject 
     * @param {*} froscene 
     * @param {*} posFunc 
     */
    setFollow(gameObject, froscene, posFunc) {
        this.mFollow = gameObject;
        this.mFroscene = froscene;
        if (posFunc)
            this.posFunc = posFunc;
    }
    /**
     * @method tooqingui.Panel#isShow
     * @return {boolean}
     */
    isShow() {
        return this.mShow;
    }
    /**
     * @method tooqingui.Panel#hide
     */
    hide() {
        if (this.soundGroup && this.soundGroup.close)
            this.playSound(this.soundGroup.close);
        if (!this.mTweening && this.mTweenBoo) {
            this.showTween(false);
        }
        else {
            this.destroy();
        }
    }
    /**
     * @method tooqingui.Panel#destroy
     */
    destroy() {
        if (this.mPanelTween) {
            this.mPanelTween.stop();
            this.mPanelTween.remove();
            this.mPanelTween = undefined;
        }
        if (this.mResources) {
            this.mResources.clear();
            this.mResources = undefined;
        }
        this.mMute = false;
        this.mInitialized = false;
        this.mShow = false;
        this.width = 0;
        this.height = 0;
        this.mReloadTimes = 0;
        this.offLoad();
        super.destroy();
    }
    /**
     * @method tooqingui.Panel#resize
     * @param {number} wid 
     * @param {number} hei 
     */
    resize(wid, hei) {
    }
    /**
     * @method tooqingui.Panel#show
     * @param {*} param 
     */
    show(param) {
        this.mShowData = param;
        if (this.mPreLoad)
            return;
        if (!this.mInitialized) {
            this.preload();
            return;
        }
        if (this.mShow)
            return;
        if (this.soundGroup && this.soundGroup.open)
            this.playSound(this.soundGroup.open);
        if (!this.mTweening && this.mTweenBoo) {
            this.showTween(true);
        }
        else {
            this.mShow = true;
        }
        this.addListen();
    }
    /**
     * @method tooqingui.Panel#update
     * @param {*} param 
     */
    update(param) {
        this.mShowData = param;
    }
    /**
     * @method tooqingui.Panel#tweenExpand
     * @param {boolean} tweenBoo 
     */
    tweenExpand(tweenBoo) {
    }
    /**
     * @method tooqingui.Panel#setTween
     * @param {boolean} boo 
     */
    setTween(boo) {
        this.mTweenBoo = boo;
    }
    /**
     * @name tooqingui.Panel#showData
     * @return {*}
     */
    get showData() {
        return this.mShowData;
    }
    /**
     * @name tooqingui.Panel#interactive
     * @return {boolean}
     */
    get interactive() {
        return this.mEnabled;
    }
    /**
     * @method tooqingui.Panel#showTween
     * @param {boolean} show 
     * @protected
     */
    showTween(show) {
        this.mTweening = true;
        const scale = show ? this.scale : 0;
        this.scale = scale;
        if (this.mPanelTween) {
            this.mPanelTween.stop();
        }
        this.mPanelTween = this.scene.tweens.add({
            targets: this,
            duration: 200,
            ease: "Linear",
            props: {
                scaleX: { value: scale },
                scaleY: { value: scale },
            },
            onComplete: () => {
                this.tweenComplete(show);
            },
            onCompleteParams: [this]
        });
    }
    /**
     * @method tooqingui.Panel#tweenComplete
     * @param {boolean} show 
     * @protected
     */
    tweenComplete(show) {
        this.mTweening = false;
        this.mPanelTween.stop();
        this.mShow = show;
        if (!show) {
            this.destroy();
        }
    }
    /**
     * @method tooqingui.Panel#init
     * @protected
     */
    init() {
        this.mInitialized = true;
        if (this.mResources) {
            this.mResources.clear();
            this.mResources = null;
        }
        this.show(this.mShowData);
    }
    /**
     * @method tooqingui.Panel#addAtlas
     * @param {string} key 
     * @param {string} texture 
     * @param {*} data 
     * @protected
     */
    addAtlas(key, texture, data) {
        if (!this.mResources) {
            this.mResources = new Map();
        }
        this.mResources.set(key, {
            dpr: this.dpr,
            type: "atlas",
            texture,
            data
        });
    }
    /**
     * @method tooqingui.Panel#addImage
     * @param {string} key 
     * @param {*} value 
     * @protected
     */
    addImage(key, value) {
        if (!this.mResources) {
            this.mResources = new Map();
        }
        if (value === undefined)
            value = key;
        this.mResources.set(key, {
            dpr: this.dpr,
            type: "image",
            texture: value
        });
    }
    /**
     * @method tooqingui.Panel#preload
     * @protected
     */
    preload() {
        this.mPreLoad = true;
        if (!this.scene) {
            return;
        }
        if (this.mResources) {
            this.mResources.forEach((resource, key) => {
                this.addResources(key, resource);
            }, this);
        }
        this.startLoad();
    }
    /**
     * @method tooqingui.Panel#loadComplete
     * @param {*} loader 
     * @param {*} totalComplete 
     * @param {*} totalFailed 
     * @protected
     */
    loadComplete(loader, totalComplete, totalFailed) {
        this.mPreLoad = false;
        if (this.mInitialized) {
            return;
        }
        if (totalFailed > 0 && this.mResources && this.mResources.size > 0) {
            this.reload();
            return;
        }
        this.offLoad();
        this.init();
    }
    /**
     * @method tooqingui.Panel#loadError
     * @param {*} file 
     * @protected
     */
    loadError(file) {
        if (!this.mResources) {
            return;
        }
        const resource = this.mResources.get(file.key);
        if (!resource) {
            return;
        }
        resource.dpr = 2;
        if (!this.mReLoadResources) {
            this.mReLoadResources = new Map();
        }
        this.mReLoadResources.set(file.key, resource);
    }
    /**
     * @method tooqingui.Panel#onFileKeyComplete
     * @param {string} key 
     * @protected
     */
    onFileKeyComplete(key) {
        if (!this.mResources) {
            return;
        }
        if (this.mResources.has(key)) {
            this.mResources.delete(key);
        }
    }
    /**
     * @method tooqingui.Panel#addResources
     * @param {string} key 
     * @param {*} resource 
     * @protected
     */
    addResources(key, resource) {
        // TODO Add IResource interface
        if (!this.scene) {
            return;
        }
        // TODO add load type
        // if (resource.data) this.scene.load.atlas(key, Url.getUIRes(resource.dpr, resource.texture), Url.getUIRes(resource.dpr, resource.data));
    }
    /**
     * @method tooqingui.Panel#reload
     * @protected
     */
    reload() {
        if (!this.mReLoadResources || this.mReLoadResources.size <= 0) {
            return;
        }
        if (++this.mReloadTimes > 1) {
            return;
        }
        this.mReLoadResources.forEach((resource, key) => {
            this.addResources(key, resource);
        }, this);
        this.startLoad();
    }
    /**
     * @method tooqingui.Panel#startLoad
     * @protected
     */
    startLoad() {
        if (!this.scene) {
            return;
        }
        this.scene.load.on(Phaser.Loader.Events.FILE_KEY_COMPLETE, this.onFileKeyComplete, this);
        this.scene.load.once(Phaser.Loader.Events.COMPLETE, this.loadComplete, this);
        this.scene.load.on(Phaser.Loader.Events.FILE_LOAD_ERROR, this.loadError, this);
        this.scene.load.start();
    }
    /**
     * @method tooqingui.Panel#offLoad
     * @protected
     */
    offLoad() {
        if (!this.scene) {
            return;
        }
        this.scene.load.off(Phaser.Loader.Events.FILE_KEY_COMPLETE, this.onFileKeyComplete, this);
        this.scene.load.off(Phaser.Loader.Events.COMPLETE, this.loadComplete, this);
        this.scene.load.off(Phaser.Loader.Events.FILE_LOAD_ERROR, this.loadError, this);
    }
    /**
     * @method tooqingui.Panel#sceneClick
     * @param {Phaser.Input.Pointer} pointer
     * @protected
     */
    sceneClick(pointer) {
        if (Tool.checkPointerContains(this, pointer) && this.checkPointerDelection(pointer)) {
            this.emit("panelClick", pointer);
        }
    }
    /**
     * @method tooqingui.Panel#uiClick
     * @param {Phaser.Input.Pointer} pointer 
     * @protected
     */
    uiClick(pointer) {
        if (this.checkPointerDelection(pointer)) {
            this.emit("panelClick", pointer);
        }
    }
}
exports.Panel = Panel;
