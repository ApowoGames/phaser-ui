import PopUp from '../../plugins/popup.js';
import ScaleDownDestroy from '../../plugins/scale-down-destroy.js';
import { WaitComplete } from '../../plugins/utils/promise/WaitEvent.js'

const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const GetValue = Phaser.Utils.Objects.GetValue;

export default {
    /**
     * @function apowophaserui.popUp
     * @param {number} duration 
     * @param {number} orientation 
     * @param {*} ease 
     */
    popUp(duration, orientation, ease) {
        if (IsPlainObject(duration)) {
            var config = duration;
            duration = GetValue(config, 'duration', undefined);
            orientation = GetValue(config, 'orientation', undefined);
            ease = GetValue(config, 'ease', undefined);
        }

        this._scale = PopUp(this, duration, orientation, ease, this._scale);
        this._scale.once('complete', function () {
            this.emit('popup.complete', this);
        }, this);
        return this;
    },
    /**
     * @function apowophaserui.popUpPromise
     * @param {number} duration 
     * @param {number} orientation 
     * @param {*} ease 
     * @return {Promise<*>}
     */
    popUpPromise(duration, orientation, ease) {
        this.popUp(duration, orientation, ease);
        return WaitComplete(this._scale);
    },
    /**
     * @function apowophaserui.scaleDownDestroy
     * @param {number} duration 
     * @param {number} orientation 
     * @param {*} ease 
     * @param {*} destroyMode 
     */
    scaleDownDestroy(duration, orientation, ease, destroyMode) {
        if (IsPlainObject(duration)) {
            var config = duration;
            duration = GetValue(config, 'duration', undefined);
            orientation = GetValue(config, 'orientation', undefined);
            ease = GetValue(config, 'ease', undefined);
            destroyMode = GetValue(config, 'destroy', undefined);
        }

        this._scale = ScaleDownDestroy(this, duration, orientation, ease, destroyMode, this._scale);
        this._scale.once('complete', function () {
            this.emit('scaledown.complete', this);
        }, this);
        return this;
    },
    /**
     * @function apowophaserui.scaleDownDestroyPromise
     * @param {number} duration 
     * @param {number} orientation 
     * @param {*} ease 
     * @param {*} destroyMode 
     * @return {Promise<*>}
     */
    scaleDownDestroyPromise(duration, orientation, ease, destroyMode) {
        this.scaleDownDestroy(duration, orientation, ease, destroyMode);
        return WaitComplete(this._scale);
    },
    /**
     * @function apowophaserui.scaleDown
     * @param {number} duration 
     * @param {number} orientation 
     * @param {*} ease 
     */
    scaleDown(duration, orientation, ease) {
        this.scaleDownDestroy(duration, orientation, ease, false);
        return this;
    },
    /**
     * @function apowophaserui.scaleDownPromise
     * @param {number} duration 
     * @param {number} orientation 
     * @param {*} ease 
     * @return {Promise<*>}
     */
    scaleDownPromise(duration, orientation, ease) {
        this.scaleDown(duration, orientation, ease);
        return WaitComplete(this._scale);
    }


}