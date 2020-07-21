"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const GetValue = Phaser.Utils.Objects.GetValue;
import StopPropagationTouchEvents from "../../plugins/utils/input/StopPropagationTouchEvents.js";
/**
 * @class InputText
 * @memberof apowophaserui
 * @constructor
 * @extends Phaser.GameObjects.DOMElement
 * @param {Phaser.Scene} scene
 * @param {any} x
 * @param {number} [y]
 * @param {number} [width]
 * @param {number} [height]
 * @param {*} [config]
 */
class InputText extends Phaser.GameObjects.DOMElement {
    constructor(scene, x, y, width, height, config) {
        if (IsPlainObject(x)) {
            config = x;
            x = GetValue(config, 'x', 0);
            y = GetValue(config, 'y', 0);
            width = GetValue(config, 'width', undefined);
            height = GetValue(config, 'height', undefined);
        } else if (IsPlainObject(width)) {
            config = width;
            width = GetValue(config, 'width', undefined);
            height = GetValue(config, 'height', undefined);
        }

        if (config === undefined) {
            config = {};
        }
        var autoRound = scene.scale.autoRound;
        if (width !== undefined) {
            if (autoRound) {
                width = Math.floor(width);
            }
            config.width = width + 'px';
        }
        if (height !== undefined) {
            if (autoRound) {
                height = Math.floor(height);
            }
            config.height = height + 'px';
        }

        var element;
        var textType = GetValue(config, 'type', 'text');
        if (textType === 'textarea') {
            element = document.createElement("textarea");
            element.style.resize = 'none';
        } else {
            element = document.createElement("input");
            element.type = textType;
        }

        // Apply registed style properties
        var elemProp, elemPropValue;
        for (var key in ElementProperties) {
            elemProp = ElementProperties[key];
            elemPropValue = GetValue(config, key, elemProp[1]);
            if (elemPropValue !== undefined) {
                element[elemProp[0]] = elemPropValue;
            }
        }

        var style = GetValue(config, 'style', undefined);
        if (style === undefined) {
            style = {};
        }
        // Apply registed style properties
        var styleProp, stylePropValue;
        for (var key in StyleProperties) {
            styleProp = StyleProperties[key];
            stylePropValue = GetValue(config, key, styleProp[1]);
            if (stylePropValue !== undefined) {
                style[styleProp[0]] = stylePropValue;
            }
        }
        // Apply other style properties
        var elementStyle = element.style;
        for (var key in config) {
            if ((key in ElementProperties) || (key in StyleProperties)) {
                continue;
            } else if (key in elementStyle) {
                style[key] = config[key];
            }
        }
        style['box-sizing'] = 'border-box';
        super(scene, x, y, element, style);
        this.type = 'TooqingInputText';

        // Apply events
        for (let eventName in ElementEvents) { // Note: Don't use `var` here
            this.node[ElementEvents[eventName]] = (function () {
                this.emit(eventName, this);
            }).bind(this);
        }

        // Don't propagate touch/mouse events to parent(game canvas)
        StopPropagationTouchEvents(this.node);
    }
    /**
     * @method apowophaserui.InputText#resize
     * @param {number} width 
     * @param {number} height 
     * @return {apowophaserui.InputText} this
     */
    resize(width, height) {
        var style = this.node.style;
        style.width = width + 'px';
        style.height = height + 'px';
        this.updateSize();
        return this;
    }
    /**
     * @name apowophaserui.InputText#text
     * @return {string}
     */
    get text() {
        return this.node.value;
    }

    set text(value) {
        this.node.value = value;
    }
    /**
     * @method apowophaserui.InputText#setText
     * @param {string} value 
     * @return {*} this
     */
    setText(value) { // Override
        this.text = value;
        return this;
    }
    /**
     * @method apowophaserui.InputText#selectText
     * @return {apowophaserui.InputText} this
     */
    selectText() {
        this.node.select();
        return this;
    }
    /**
     * @name apowophaserui.InputText#placeholder
     * @return {*}
     */
    get placeholder() {
        return this.node.placeholder;
    }

    set placeholder(value) {
        this.node.placeholder = value;
    }
    /**
     * @method apowophaserui.InputText#setPlaceholder
     * @param {*} value 
     * @return {apowophaserui.InputText} this
     */
    setPlaceholder(value) {
        this.placeholder = value;
        return this;
    }
    /**
     * @name apowophaserui.InputText#tooltip
     * @return {*}
     */
    get tooltip() {
        return this.node.title;
    }

    set tooltip(value) {
        this.node.title = value;
    }
    /**
     * @method apowophaserui.InputText#setTooltip
     * @param {*} value 
     * @return {apowophaserui.InputText} this
     */
    setTooltip(value) {
        this.tooltip = value;
        return this;
    }
    /**
     * @method apowophaserui.InputText#setTextChangedCallback
     * @param {function} callback 
     * @return {apowophaserui.InputText} this
     */
    setTextChangedCallback(callback) {
        this.onTextChanged = callback;
        return this;
    }
    /**
     * @name apowophaserui.InputText#readOnly
     * @return {boolean}
     */
    get readOnly() {
        return this.node.readOnly;
    }

    set readOnly(value) {
        this.node.readOnly = value;
    }
    /**
     * @method apowophaserui.InputText#setReadOnly
     * @param {boolean} value 
     * @return {apowophaserui.InputText} this
     */
    setReadOnly(value) {
        if (value === undefined) {
            value = true;
        }
        this.readOnly = value;
        return this;
    }
    /**
     * @name apowophaserui.InputText#spellCheck
     * @return {*}
     */
    get spellCheck() {
        return this.node.spellcheck;
    }

    set spellCheck(value) {
        this.node.spellcheck = value;
    }
    /**
     * @method apowophaserui.InputText#setSpellCheck
     * @param {*} value 
     * @return {apowophaserui.InputText} this
     */
    setSpellCheck(value) {
        this.spellCheck = value;
        return this;
    }
    /**
     * @method apowophaserui.InputText#setStyle
     * @param {*} [key]
     * @param {*} [value]
     * @return {apowophaserui.InputText} this
     */
    setStyle(key, value) {
        this.node.style[key] = value;
        return this;
    }
    /**
     * @method apowophaserui.InputText#getStyle
     * @param {string} key 
     * @return {*}
     */
    getStyle(key) {
        return this.node.style[key];
    }
    /**
     * @method apowophaserui.InputText#scrollToBottom
     * @return {apowophaserui.InputText} this
     */
    scrollToBottom() {
        this.node.scrollTop = this.node.scrollHeight;
        return this;
    }
    /**
     * @method apowophaserui.InputText#setEnabled
     * @param {boolean} enabled 
     * @return {apowophaserui.InputText} this
     */
    setEnabled(enabled) {
        if (enabled === undefined) {
            enabled = true;
        }
        this.node.disabled = !enabled;
        return this;
    }
    /**
     * @method apowophaserui.InputText#setBlur
     * @return {apowophaserui.InputText} this
     */
    setBlur() {
        this.node.blur();
        return this;
    }
    /**
     * @method apowophaserui.InputText#setFocus
     * @return {apowophaserui.InputText} this
     */
    setFocus() {
        this.node.focus();
        return this;
    }
}
/**
 * @name apowophaserui.ElementProperties
 * @const
 * @type {*}
 */
const ElementProperties = {
    id: ['id', undefined],
    text: ['value', undefined],
    placeholder: ['placeholder', undefined],
    tooltip: ['title', undefined],
    readOnly: ['readonly', false],
    spellCheck: ['spellcheck', false],
    autoComplete: ['autocomplete', 'off'],
};
/**
 * @name apowophaserui.StyleProperties
 * @const
 * @type {*}
 */
const StyleProperties = {
    align: ['textAlign', undefined],
    width: ['width', undefined],
    height: ['height', undefined],
    fontFamily: ['fontFamily', undefined],
    fontSize: ['font-size', undefined],
    color: ['color', '#ffffff'],
    backgroundColor: ['backgroundColor', 'transparent'],
    borderColor: ['borderColor', 'transparent'],
    outline: ['outline', 'none'],
};
/**
 * @name apowophaserui.ElementEvents
 * @constant
 * @type {*}
 */
const ElementEvents = {
    textchange: 'oninput',
    click: 'onclick',
    dblclick: 'ondblclick',
    focus: 'onfocus',
    blur: 'onblur',
};
export default InputText;