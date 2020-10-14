"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
import BaseUI from "../baseUI/BaseUI";
import ClickEvent from "../interface/event/ClickEvent";
/**
 * @enum {number}
 * @memberof apowophaserui
 * @readonly
 * @property {number} Normal
 * @property {number} Over
 * @property {number} Select
 * @property {number} Disable
 */
var ButtonState = {
    "Normal": 0,
    "Over": 1,
    "Select": 2,
    "Disable": 3,
};

/**
 * @namespace apowophaserui.NinePatchConfig
 */
var NinePatchConfig = {
    /**
     * @name apowophaserui.NinePatchConfig#width
     * @type {number=}
     */
    width: 0,
    /**
     * @name apowophaserui.NinePatchConfig#height
     * @type {number=}
     */
    height: 0,
    /**
     * @name apowophaserui.NinePatchConfig#configlist
     * @type {any=}
     */
    configlist: undefined,
}

/**
 * @namespace apowophaserui.ButtonConfig
 */
var ButtonConfig = {
    /**
     * @name apowophaserui.ButtonConfig#key
     * @type {string=}
     */
    key: undefined,
    /**
     * @name apowophaserui.ButtonConfig#normalFrame
     * @type {string=}
     */
    normalFrame: undefined,
    /**
     * @name apowophaserui.ButtonConfig#downFrame
      * @type {string=}
    */
    downFrame: undefined,
    /**
     * @name apowophaserui.ButtonConfig#text
     * @type {string=}
     */
    text: undefined,
    /**
     * @name apowophaserui.ButtonConfig#music
     * @type {apowophaserui.ISoundGroup=}
     */
    music: undefined,
    /**
     * @name apowophaserui.ButtonConfig#dpr
     * @type {number=}
     */
    dpr: 1,
    /**
     * @name apowophaserui.ButtonConfig#scale
     * @type {number=}
     */
    scale: 1,
    /**
     * @name apowophaserui.ButtonConfig#nineConfig
     * @type {apowophaserui.NinePatchConfig=}
     */
    nineConfig: undefined,
    /**
      * @name apowophaserui.ButtonConfig#data
     * @type {any=}
     */
    data: undefined,
}

/**
 * @class Button
 * @memberof apowophaserui
 * @extends apowophaserui.BaseUI
 * @constructor
 * @param {Phaser.Scene} scene
 * @param {string} key
 * @param {string} [frame]
 * @param {string} [downFrame]
 * @param {string} [text]
 * @param {*} [music]
 * @param {number} [dpr]
 * @param {number} [scale]
 * @param {*} [nineConfig]
 * @param {boolean} [tweenBoo]
 */
class Button extends BaseUI {
    constructor(scene, key, frame, downFrame, text, music, dpr, scale, nineConfig, tweenBoo) {
        super(scene);
        /**
         * @name apowophaserui.Button#mDownTime
         * @type {number}
         * @protected
         * @default 0
         */
        this.mDownTime = 0;
        /**
         * @name apowophaserui.Button#mPressDelay
         * @type {number}
         * @protected
         * @default 1000
         */
        this.mPressDelay = 1000;
        /**
         * @name apowophaserui.Button#mIsMove
         * @type {boolean}
         * @protected
         * @default false
         */
        this.mIsMove = false;
        /**
         * @name apowophaserui.Button#dpr
         * @type {number}
         * @protected
         * @default 1
         */
        this.dpr = dpr || 1;
        /**
         * @name apowophaserui.Button#zoom
         * @type {number}
         * @protected
         * @default 1
         */
        this.zoom = scale || 1;

        if (tweenBoo === undefined) tweenBoo = true;
        this.mTweenBoo = tweenBoo;

        this.soundGroup = {
            up: {
                key: "click",
            }
        };
        Object.assign(this.soundGroup, music);
        /**
         * @description {width:number,height:number,configList:IPatchesConfig[](top:number,left?:number,right?:number,bottom?:number)}
         * @name apowophaserui.Button#ninePatchConfig
         * @type {*}
         * @protected
         */
        this.ninePatchConfig = nineConfig;
        /**
         * @name apowophaserui.Button#mKey
         * @type {string}
         * @protected
         */
        this.mKey = key;
        /**
         * @name apowophaserui.Button#mFrame
         * @type {string}
         * @protected
         * @default "__BASE"
         */
        this.mFrame = frame || "__BASE";
        /**
        * @name apowophaserui.Button#mDownFrame
        * @type {string}
        * @protected
        */
        this.mDownFrame = downFrame;
        /**
         * @name apowophaserui.Button#mText
         * @type {Phaser.GameObjects.Text}
         * @protected
         */
        this.mText;
        /**
         * @name apowophaserui.Button#mBackground
         * @type {Phaser.GameObjects.Image|apowophaserui.NineSlicePatch}
         * @protected
         */
        this.mBackground;
        /**
         * @name apowophaserui.Button#tweenScale
         * @type {number}
         * @public
         */
        this.tweenScale = 0.9;
        this.createBackground();
        if (text) {
            this.mText = this.scene.make.text(undefined, false)
                .setOrigin(0.5, 0.5)
                .setText(text);
            if (this.mBackground) {
                this.mText.setSize(this.mBackground.width, this.mBackground.height);
            }
            this.add(this.mText);
        }
        this.setInteractive();
        this.addListen();
    }
    /**
    * @name apowophaserui.Button#background
    * @type {Phaser.GameObjects.Image}
    * @return {Phaser.GameObjects.Image}
    */
    get background() {
        return this.mBackground;
    }
    /**
     * @name apowophaserui.Button#text
     * @type {Phaser.GameObjects.Text}
     * @return {Phaser.GameObjects.Text}
     */
    get text() {
        return this.mText;
    }
    /**
     * @method  apowophaserui.Button#addListen
     */
    addListen() {
        this.removeListen();
        this.on("pointerdown", this.onPointerDownHandler, this);
        this.on("pointerup", this.onPointerUpHandler, this);
        this.on("pointerout", this.onPointerOutHandler, this);
        this.on("pointermove", this.onPointerMoveHandler, this);
    }
    /**
     * @method  apowophaserui.Button#removeListen
     */
    removeListen() {
        this.off("pointerdown", this.onPointerDownHandler, this);
        this.off("pointerup", this.onPointerUpHandler, this);
        this.off("pointerout", this.onPointerOutHandler, this);
        this.off("pointermove", this.onPointerMoveHandler, this);
    }
    /**
     * @name apowophaserui.Button#enable
     * @type {boolean}
     */
    set enable(value) {
        if (value) {
            if (this.mBackground) {
                this.mBackground.clearTint();
                if (this.mText)
                    this.mText.clearTint();
            }
            this.setInteractive();
        }
        else {
            if (this.mBackground) {
                this.mBackground.setTintFill(0x666666);
                if (this.mText)
                    this.mText.setTintFill(0x777777);
            }
            this.removeInteractive();
        }
    }
    /**
     * @name apowophaserui.Button#tweenEnable
     * @type {boolean}
     */
    set tweenEnable(value) {
        this.mTweenBoo = value;
    }
    /**
     * @method  apowophaserui.Button#mute
     * @param {boolean}boo
     */
    mute(boo) {
        this.silent = boo;
    }
    /**
     * @method  apowophaserui.Button#changeNormal
     */
    changeNormal() {
        this.setBgFrame(this.mFrame);
    }
    /**
     * @method  apowophaserui.Button#changeDown
     */
    changeDown() {
        if (this.mDownFrame) {
            this.setBgFrame(this.mDownFrame);
        }
    }
    /**
     * @method  apowophaserui.Button#setFrame
     * @param {string|number}frame
     */
    setFrame(frame) {
        this.setBgFrame(frame);
    }
    /**
     * @method apowophaserui.Button#setText
     * @param {string} val 
     */
    setText(val) {
        if (this.mText) {
            this.mText.setText(val);
        }
    }
    /**
     * @method apowophaserui.Button#setTextStyle
     * @param {*} style 
     */
    setTextStyle(style) {
        if (this.mText) {
            this.mText.setStyle(style);
        }
    }
    /**
     * @method apowophaserui.Button#setFontStyle
     * @param {string} val 
     */
    setFontStyle(val) {
        if (this.mText) {
            this.mText.setFontStyle(val);
        }
    }
    /**
     * @method apowophaserui.Button#setTextOffset
     * @param {number} x 
     * @param {number} y 
     */
    setTextOffset(x, y) {
        if (this.mText) {
            this.mText.setPosition(x, y);
        }
    }
    /**
     * @method apowophaserui.Button#setTextColor
     * @param {string} color 
     */
    setTextColor(color) {
        if (this.mText) {
            this.mText.setColor(color);
        }
    }
    /**
     * @method apowophaserui.Button#setFrameNormal
     * @param {string} color 
     * @param {string} [down] 
     * @param {string} [over] 
     */
    setFrameNormal(normal, down, over) {
        this.mFrame = normal;
        this.mDownFrame = (down ? down : normal);
        this.changeNormal();
        return this;
    }
    /**
     * @method apowophaserui.Button#createBackground
     * @protected
     */
    createBackground() {
        if (this.mFrame) {
            this.mBackground = this.scene.make.image({
                key: this.mKey,
                frame: this.mFrame
            }, false);
            this.setSize(this.mBackground.width, this.mBackground.height);
            this.add(this.mBackground);
        }
    }
    /**
     * @method apowophaserui.Button#setBgFrame
     * @param {string} frame
     * @protected
     */
    setBgFrame(frame) {
        if (this.mBackground) {
            this.mBackground.setFrame(frame);
            this.setSize(this.mBackground.width, this.mBackground.height);
        }
    }
    /**
     * @method apowophaserui.Button#buttonStateChange
     * @param {number} state
     * @protected
     */
    buttonStateChange(state) {
        switch (state) {
            case ButtonState.Normal:
                this.changeNormal();
                break;
            case ButtonState.Over:
                break;
            case ButtonState.Select:
                this.changeDown();
                break;
            case ButtonState.Disable:
                break;
        }
    }
    /**
     * @method apowophaserui.Button#onPointerMoveHandler
     * @param {Phaser.Input.Pointer} [pointer]
     * @protected
     */
    onPointerMoveHandler(pointer) {
        if (this.soundGroup && this.soundGroup.move)
            this.playSound(this.soundGroup.move);
        if (!this.interactiveBoo)
            return;
        this.mIsMove = true;
        this.emit(ClickEvent.Move);
    }
    /**
     * @method apowophaserui.Button#onPointerUpHandler
     * @param {Phaser.Input.Pointer} [pointer]
     * @protected
     */
    onPointerUpHandler(pointer) {
        // if (this.mTweening) return;
        if (!this.interactiveBoo) {
            if (this.soundGroup && this.soundGroup.disabled)
                this.playSound(this.soundGroup.disabled);
            return;
        }
        if (this.mTweenBoo) {
            // this.tween(false).then(() => {
            //     this.pointerDown(pointer);
            // });
            this.tween(false, this.pointerUp.bind(this, pointer));
        } else {
            this.pointerUp(pointer);
        }
    }

    pointerUp(pointer) {
        this.buttonStateChange(ButtonState.Normal);
        // if (!this.mIsMove || (Date.now() - this.mDownTime > this.mPressTime)) {
        const isdown = this.checkPointerInBounds(this, pointer.worldX, pointer.worldY);
        this.emit(ClickEvent.Up, this);
        // if (Math.abs(pointer.downX - pointer.upX) < this.width && Math.abs(pointer.downY - pointer.upY) < this.height) {
        if (isdown && this.mIsDown) {
            if (this.soundGroup && this.soundGroup.up)
                this.playSound(this.soundGroup.up);
            this.emit(ClickEvent.Tap, pointer, this);
        }
        // }
        clearTimeout(this.mPressTime);
        this.mIsMove = false;
        this.mIsDown = false;
        this.mDownTime = 0;
    }

    /**
     * @method apowophaserui.Button#onPointerOutHandler
     * @param {Phaser.Input.Pointer} pointer 
     * @protected
     */
    onPointerOutHandler(pointer) {
        if (this.mTweenBoo && pointer.isDown) {
            this.tween(false);
        }
    }
    /**
     * @method apowophaserui.Button#onPointerDownHandler
     * @param {Phaser.Input.Pointer} [pointer]
     * @protected
     */
    onPointerDownHandler(pointer) {
        if (this.mTweening) return;
        if (!this.interactiveBoo) {
            if (this.soundGroup && this.soundGroup.disabled)
                this.playSound(this.soundGroup.disabled);
            return;
        }
        if (this.soundGroup && this.soundGroup.down)
            this.playSound(this.soundGroup.down);
        this.buttonStateChange(ButtonState.Select);
        this.mDownTime = Date.now();
        this.mPressTime = setTimeout(() => {
            this.emit(ClickEvent.Hold, this);
        }, this.mPressDelay);
        if (this.mTweenBoo) this.tween(true);
        this.emit(ClickEvent.Down, this);
        // this.mIsDownObject = this.checkPointerInBounds(this, pointer.worldX, pointer.worldY);
        this.mIsDown = true;
    }
    /**
     * @method apowophaserui.Button#onPointerDcheckPointerInBoundsownHandler
     * @param {*} gameObject
     * @param {number} pointerx
     * @param {number} pointery
     * @protected
     * @return {boolean}
     */
    checkPointerInBounds(gameObject, pointerx, pointery) {
        if (!this.mRectangle) {
            this.mRectangle = new Phaser.Geom.Rectangle(0, 0, 0, 0);
        }
        const zoom = this.zoom ? this.zoom : 1;
        this.mRectangle.left = -gameObject.width / 2;
        this.mRectangle.right = gameObject.width / 2;
        this.mRectangle.top = -gameObject.height / 2;
        this.mRectangle.bottom = gameObject.height / 2;
        const worldMatrix = gameObject.getWorldTransformMatrix();
        const x = (pointerx - worldMatrix.tx) / zoom;
        const y = (pointery - worldMatrix.ty) / zoom;
        if (this.mRectangle.left <= x && this.mRectangle.right >= x && this.mRectangle.top <= y && this.mRectangle.bottom >= y) {
            return true;
        }
        return false;
    }
    /**
     * @method apowophaserui.Button#tween
     * @param {boolean} show 
     * @protected
     */
    tween(show, callback) {
        this.mTweening = true;
        const scale = show ? this.tweenScale : 1;
        if (this.mTween) {
            this.mTween.stop();
            this.mTween.remove();
            this.mTween = undefined;
        }
        this.mTween = this.scene.tweens.add({
            targets: this.list,
            duration: 45,
            ease: "Linear",
            props: {
                scaleX: { value: scale },
                scaleY: { value: scale },
            },
            onComplete: () => {
                this.tweenComplete(show);
                if (callback) callback();
            },
            onCompleteParams: [this]
        });
    }
    /**
     * @method apowophaserui.Button#tweenComplete
     * @param {boolean} show 
     * @protected
     */
    tweenComplete(show) {
        this.mTweening = false;
        if (this.mTween) {
            this.mTween.stop();
            this.mTween.remove();
            this.mTween = undefined;
        }
    }
}
export { Button, ButtonState, NinePatchConfig, ButtonConfig };
