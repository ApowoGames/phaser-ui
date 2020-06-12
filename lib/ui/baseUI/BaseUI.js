"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @class BaseUI
 * @memberof tooqingui
 * @constructor
 * @extends Phaser.GameObjects.Container
 * @param {Phaser.Scene} scene
 * @param {number} dpr
 * @param {number} scale
 */
class BaseUI extends Phaser.GameObjects.Container {
    constructor(scene, dpr, scale) {
        super(scene);
        /**
        * @name tooqingui.BaseUI.BaseUI#silent
        * @type {boolean}
        * @protected
        */
        this.silent = false;

        /**
        * @name tooqingui.BaseUI.BaseUI#mInitialized
        * @type {boolean}
        * @protected
        */
        this.mInitialized = false;

        /**
        * @name tooqingui.BaseUI.BaseUI#interactiveBoo
        * @type {boolean}
        * @protected
        */
        this.interactiveBoo = false;

        /**
        * @name tooqingui.BaseUI.BaseUI#mShow
        * @type {boolean}
        * @protected
        */
        this.mShow = false;

        /**
        * @name tooqingui.BaseUI.BaseUI#dpr
        * @type {number}
        * @protected
        */
        this.dpr = dpr || 1;

        /**
         * @name tooqingui.BaseUI.BaseUI#scale
         * @type {number}
         * @protected
         */
        this.scale = scale || 1;

        /**
         * @name tooqingui.BaseUI.BaseUI#soundMap
         * @type {Map<string, Phaser.Sound.BaseSound>}
         */
        this.soundMap = new Map();
        this.disInteractive();
    }
    /**
     * @method tooqingui.BaseUI.BaseUI#setFollow
     * @param {*} gameObject 
     * @param {Phaser.Scene} froscene 
     * @param {function} posFunc 
     */
    setFollow(gameObject, froscene, posFunc) {
        this.mFollow = gameObject;
        this.mFroscene = froscene;
        if (posFunc)
            this.posFunc = posFunc;
    }
    /**
     * @method tooqingui.BaseUI.BaseUI#updatePos
     */
    updatePos() {
        if (!this.mShow)
            return;
        if (this.posFunc) {
            this.posFunc({
                scene: this.mFroscene,
                followX: this.mFollow.x,
                followY: this.mFollow.y,
                baseX: this.x,
                baseY: this.y
            });
        }
        else {
            const camera = this.mFroscene.cameras.main;
            const px = this.x - camera.scrollX;
            const py = this.y - camera.scrollY;
            this.x = px;
            this.y = py;
        }
    }
    /**
     * @method tooqingui.BaseUI.BaseUI#setInteractive
     * @param {*} shape 
     * @param {Phaser.Types.Input.HitAreaCallback} callback 
     * @param {boolean} dropZone 
     */
    setInteractive(shape, callback, dropZone) {
        this.interactiveBoo = true;
        super.setInteractive(shape, callback, dropZone);
        return this;
    }
    /**
     * @method tooqingui.BaseUI.BaseUI#disInteractive
     */
    disInteractive() {
        this.interactiveBoo = false;
        super.disableInteractive();
    }
    /**
     * @method tooqingui.BaseUI.BaseUI#addListen
     */
    addListen() {
        // if (!this.mInitialized) return;
        // let sizeBoo: boolean = true;
        // if (this.width === 0 || this.height === 0) {
        //     sizeBoo = false;
        // }
        // if (this.interactiveBoo) {
        //     if (sizeBoo) {
        //         this.setInteractive(new Phaser.Geom.Rectangle(0, 0, this.width, this.height), Phaser.Geom.Rectangle.Contains);
        //         this.on("pointerup", this.uiClick, this);
        //     }
        //     this.scene.input.off("pointerup", this.sceneClick, this);
        // } else {
        //     if (sizeBoo) {
        //         this.disableInteractive();
        //         this.off("pointerup", this.uiClick, this);
        //     }
        //     this.scene.input.on("pointerup", this.sceneClick, this);
        // }
    }
    /**
     * @method tooqingui.BaseUI.BaseUI#removeListen
     */
    removeListen() {
        // if (!this.mInitialized) return;
        // this.scene.input.off("pointerup", this.sceneClick, this);
        // this.off("pointerup", this.uiClick, this);
    }
    /**
     * @method tooqingui.BaseUI.BaseUI#playSound
     * @param {*} config 
     */
    playSound(config) {
        if (this.silent)
            return;
        // if (config.key === undefined) {
        //     if (typeof config.urls === "string") {
        //         config.key = config.urls;
        //     } else {
        //         config.key = config.urls[0];
        //     }
        // }
        const key = config.key;
        // const urls = config.urls;
        if (this.scene.cache.audio.exists(key)) {
            this.startPlay(config);
        }
        else {
            // this.scene.load.once(`filecomplete-audio-${key}`, () => {
            //     this.startPlay(config);
            // }, this);
            // this.scene.load.audio(key, urls);
            // this.scene.load.start();
        }
    }
    /**
     * @description {key:string,field:tooqingui.Interface.Sound.SoundField,soundConfig:Phaser.Types.sound.soundConfig}
     * @method tooqingui.BaseUI.BaseUI#startPlay
     * @param {*} config 
     */
    startPlay(config) {
        if (this.silent)
            return;
        const key = config.key;
        let sound = this.soundMap.get(key);
        if (!sound) {
            sound = this.scene.sound.add(key, config.soundConfig);
            this.soundMap.set(key, sound);
        }
        if (sound.isPlaying) {
            return;
        }
        sound.play();
    }
    /**
     * @method tooqingui.BaseUI.BaseUI#stopSound
     */
    stopSound() {
        if (this.silent)
            return;
        this.soundMap.forEach((sound) => {
            if (sound.isPlaying)
                sound.stop();
        });
    }
    /**
     * @method tooqingui.BaseUI.BaseUI#pauseSound
     */
    pauseSound() {
        if (this.silent)
            return;
        this.soundMap.forEach((sound) => {
            if (!sound.isPaused)
                sound.pause();
        });
    }
    /**
     * @method tooqingui.BaseUI.BaseUI#resumeSound
     */
    resumeSound() {
        if (this.silent)
            return;
        this.soundMap.forEach((sound) => {
            if (sound.isPaused)
                sound.resume();
        });
    }
    /**
     * @method tooqingui.BaseUI.BaseUI#setSilent
     * @param {boolean} boo 
     */
    setSilent(boo) {
        this.silent = boo;
    }
    /**
     * @method tooqingui.BaseUI#destroy
     */
    destroy() {
        this.soundMap.forEach((sound) => {
            if (sound.isPlaying)
                sound.stop();
        });
        this.mInitialized = false;
        this.interactiveBoo = false;
        this.silent = false;
        this.removeListen();
        super.destroy();
    }
    // protected sceneClick(pointer: Phaser.Input.Pointer) {
    //     if (Tool.checkPointerContains(this, pointer) && this.checkPointerDelection(pointer)) {
    //         this.emit("uiClick");
    //     }
    // }
    // protected uiClick(pointer: Phaser.Input.Pointer) {
    //     if (this.checkPointerDelection(pointer)) {
    //         this.emit("uiClick");
    //     }
    // }
    /**
     * @method tooqingui.BaseUI.BaseUI#checkPointerDelection
     * @param {Phaser.Input.Pointer} pointer 
     */
    checkPointerDelection(pointer) {
        if (!this.scene)
            return true;
        return Math.abs(pointer.downX - pointer.upX) < 10 * this.dpr * this.scale ||
            Math.abs(pointer.downY - pointer.upY) < 10 * this.dpr * this.scale;
    }
}
exports.BaseUI = BaseUI;
