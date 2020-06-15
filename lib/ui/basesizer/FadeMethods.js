import FadeIn from '../../plugins/fade-in.js';
import FadeOutDestroy from '../../plugins/fade-out-destroy.js';
import { WaitComplete } from '../../plugins/utils/promise/WaitEvent.js'

const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const GetValue = Phaser.Utils.Objects.GetValue;

export default {
    /**
     * @function Tooqingui.FadeMethods
     * @param {number} duration 
     * @param {number} alpha 
     */
    fadeIn(duration, alpha) {
        if (IsPlainObject(duration)) {
            var config = duration;
            duration = GetValue(config, 'duration', undefined);
        }

        this._fade = FadeIn(this, duration, alpha, this._fade);
        this._fade.once('complete', function () {
            this.emit('fadein.complete', this);
        }, this);
        return this;
    },
    /**
     * @function Tooqingui.fadeInPromoise
     * @param {number} duration 
     * @param {number} alpha 
     * @return {Promise<*>}
     */
    fadeInPromoise(duration, alpha) {
        this.fadeIn(duration, alpha);
        return WaitComplete(this._fade);
    },
    /**
     * @function Tooqingui.fadeOutDestroy
     * @param {number} duration 
     * @param {*} destroyMode 
     */
    fadeOutDestroy(duration, destroyMode) {
        if (IsPlainObject(duration)) {
            var config = duration;
            duration = GetValue(config, 'duration', undefined);
            destroyMode = GetValue(config, 'destroy', undefined);
        }
        this._fade = FadeOutDestroy(this, duration, destroyMode, this._fade);
        this._fade.once('complete', function () {
            this.emit('fadeout.complete', this);
        }, this);
        return this;
    },
    /**
     * @function Tooqingui.fadeOutDestroyPromise
     * @param {number} duration 
     * @param {*} destroyMode 
     * @return {Promise<*>}
     */
    fadeOutDestroyPromise(duration, destroyMode) {
        this.fadeOutDestroy(duration, destroyMode);
        return WaitComplete(this._fade);
    },
    /**
     * @function Tooqingui.fadeOut
     * @param {number} duration 
     */
    fadeOut(duration) {
        this.fadeOutDestroy(duration, false);
        return this;
    },
    /**
     * @function Tooqingui.fadeOutPromise
     * @param {number} duration 
     * @return {Promise<*>}
     */
    fadeOutPromise(duration) {
        this.fadeOut(duration);
        return WaitComplete(this._fade);
    }
}