"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
import Slider from "./Slider.js";

/**
 * @class GameSlider
 * @memberof phaserui
 * @extends phaserui.Slider
 * @constructor
 * @param {Phaser.Scene} scene
 * @param {*} config
 */
class GameSlider extends Slider {
    constructor(scene, config) {
        // Create sizer
        super(scene, config);
    }
    /**
     * @method phaserui.GameSlider#setEnable
     * @param {boolean} enable 
     * @return {*}
     */
    setEnable(enable) {
        super.setEnable(enable);
        return this;
    }
    /**
     * @method phaserui.GameSlider#setGap
     * @param {*} gap 
     * @return {*}
     */
    setGap(gap) {
        super.setGap(gap);
        return this;
    }
    /**
     * @method phaserui.GameSlider#setValue
     * @param {number} value 
     * @param {number} min 
     * @param {number} max
     * @return {*} 
     */
    setValue(value, min, max) {
        super.setValue(value, min, max);
        return this;
    }
    /**
     * @method phaserui.GameSlider#addValue
     * @param {number} inc 
     * @param {number} min 
     * @param {number} max
     * @return {*} 
     */
    addValue(inc, min, max) {
        this.addValue(inc, min, max);
        return this;
    }
    /**
     * @method phaserui.GameSlider#getValue
     * @param {number} min 
     * @param {number} max 
     * @return {number}
     */
    getValue(min, max) {
        var value = this.getValue(min, max);
        return value;
    }
    /**
     * @method phaserui.GameSlider#layout
     * @param {*} parent 
     * @param {number} newWidth 
     * @param {number} newHeight
     * @return {*} 
     */
    layout(parent, newWidth, newHeight) {
        super.layout(parent, newWidth, newHeight);
        return this;
    }
}
export default GameSlider;
