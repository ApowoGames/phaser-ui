import Slider from './Slider.js';
export class GameSlider extends Slider {
    setEnable(enable?: boolean) {
        super.setEnable(enable);
        return this;
    }

    setGap(gap) {
        super.setGap(gap);
        return this;
    }

    setValue(value: number, min?: number, max?: number) {
        super.setValue(value, min, max);
        return this;
    }

    addValue(inc: number, min?: number, max?: number) {
        this.addValue(inc, min, max);
        return this;
    }

    getValue(min?: number, max?: number) {
        var value = this.getValue(min, max);
        return value;
    }

    layout(parent, newWidth, newHeight) {
        super.layout(parent, newWidth, newHeight);
        return this;
    }

}