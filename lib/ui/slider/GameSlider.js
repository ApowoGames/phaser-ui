"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
import Slider from "./Slider.js";
/**
 * @class GameSlider
 * @memberof apowophaserui
 * @extends apowophaserui.Slider
 * @constructor
 * @param {Phaser.Scene} scene
 * @param {*} config
 */
class GameSlider extends Phaser.GameObjects.Container {
    constructor(scene, config) {
        super(scene, config.x, config.y);
        config.x = 0;
        config.y = 0;
        /**
         * @name apowophaserui.GameSlider#slider
         * @type {*}
         */
        this.slider = new Slider(scene, config);
        this.add(this.slider);
        const group = this.slider.children;
        this.add(group.getChildren());
        this.slider.layout(this, config.width, config.height);
    }
    /**
     * @method apowophaserui.GameSlider#setEnable
     * @param {boolean} enable 
     */
    setEnable(enable) {
        this.slider.setEnable(enable);
    }
    /**
     * @method apowophaserui.GameSlider#setGap
     * @param {number} gap 
     */
    setGap(gap) {
        this.slider.setGap(gap);
    }
    /**
    * @method apowophaserui.GameSlider#setValue
    * @param {number} value 
    * @param {number} [min]
    * @param {number} [max]
    */
    setValue(value, min, max) {
        this.slider.setValue(value, min, max);
    }
    /**
     * @method apowophaserui.GameSlider#addValue
     * @param {number} inc 
     * @param {number} [min]
     * @param {number} [max]
     */
    addValue(inc, min, max) {
        this.slider.addValue(inc, min, max);
    }
    /**
    * @method apowophaserui.GameSlider#getValue
    * @param {number} min
    * @param {number} [max]
    * @return {number}
    */
    getValue(min, max) {
        const value = this.slider.getValue(min, max);
        return value;
    }
    /**
     * @method apowophaserui.GameSlider#layout
     * @param {*} parent
     * @param {number} newWidth
     * @param {number} newHeight
     */
    layout(parent, newWidth, newHeight) {
        this.slider.layout(parent, newWidth, newHeight);
    }
}
export default GameSlider;
