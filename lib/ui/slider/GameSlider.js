"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Slider_js_1 = __importDefault(require("./Slider.js"));
class GameSlider extends Slider_js_1.default {
    setEnable(enable) {
        super.setEnable(enable);
        return this;
    }
    setGap(gap) {
        super.setGap(gap);
        return this;
    }
    setValue(value, min, max) {
        super.setValue(value, min, max);
        return this;
    }
    addValue(inc, min, max) {
        this.addValue(inc, min, max);
        return this;
    }
    getValue(min, max) {
        var value = this.getValue(min, max);
        return value;
    }
    layout(parent, newWidth, newHeight) {
        super.layout(parent, newWidth, newHeight);
        return this;
    }
}
export default GameSlider;
