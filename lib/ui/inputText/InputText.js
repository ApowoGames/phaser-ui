"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const GetValue = Phaser.Utils.Objects.GetValue;
const StopPropagationTouchEvents = require("../../plugins/utils/input/StopPropagationTouchEvents.js");
/**
 * @class InputText
 * @memberof Tooqingui
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
     * @method Tooqingui.InputText#resize
     * @param {number} width 
     * @param {number} height 
     * @return {Tooqingui.InputText} this
     */
    resize(width, height) {
        var style = this.node.style;
        style.width = width + 'px';
        style.height = height + 'px';
        this.updateSize();
        return this;
    }
    /**
     * @name Tooqingui.InputText#text
     * @return {string}
     */
    get text() {
        return this.node.value;
    }

    set text(value) {
        this.node.value = value;
    }
    /**
     * @method Tooqingui.InputText#setText
     * @param {string} value 
     * @return {*} this
     */
    setText(value) { // Override
        this.text = value;
        return this;
    }
    /**
     * @method Tooqingui.InputText#selectText
     * @return {Tooqingui.InputText} this
     */
    selectText() {
        this.node.select();
        return this;
    }
    /**
     * @name Tooqingui.InputText#placeholder
     * @return {*}
     */
    get placeholder() {
        return this.node.placeholder;
    }

    set placeholder(value) {
        this.node.placeholder = value;
    }
    /**
     * @method Tooqingui.InputText#setPlaceholder
     * @param {*} value 
     * @return {Tooqingui.InputText} this
     */
    setPlaceholder(value) {
        this.placeholder = value;
        return this;
    }
    /**
     * @name Tooqingui.InputText#tooltip
     * @return {*}
     */
    get tooltip() {
        return this.node.title;
    }

    set tooltip(value) {
        this.node.title = value;
    }
    /**
     * @method Tooqingui.InputText#setTooltip
     * @param {*} value 
     * @return {Tooqingui.InputText} this
     */
    setTooltip(value) {
        this.tooltip = value;
        return this;
    }
    /**
     * @method Tooqingui.InputText#setTextChangedCallback
     * @param {function} callback 
     * @return {Tooqingui.InputText} this
     */
    setTextChangedCallback(callback) {
        this.onTextChanged = callback;
        return this;
    }
    /**
     * @name Tooqingui.InputText#readOnly
     * @return {boolean}
     */
    get readOnly() {
        return this.node.readOnly;
    }

    set readOnly(value) {
        this.node.readOnly = value;
    }
    /**
     * @method Tooqingui.InputText#setReadOnly
     * @param {boolean} value 
     * @return {Tooqingui.InputText} this
     */
    setReadOnly(value) {
        if (value === undefined) {
            value = true;
        }
        this.readOnly = value;
        return this;
    }
    /**
     * @name Tooqingui.InputText#spellCheck
     * @return {*}
     */
    get spellCheck() {
        return this.node.spellcheck;
    }

    set spellCheck(value) {
        this.node.spellcheck = value;
    }
    /**
     * @method Tooqingui.InputText#setSpellCheck
     * @param {*} value 
     * @return {Tooqingui.InputText} this
     */
    setSpellCheck(value) {
        this.spellCheck = value;
        return this;
    }
    /**
     * @method Tooqingui.InputText#setStyle
     * @param {*} [key]
     * @param {*} [value]
     * @return {Tooqingui.InputText} this
     */
    setStyle(key, value) {
        this.node.style[key] = value;
        return this;
    }
    /**
     * @method Tooqingui.InputText#getStyle
     * @param {string} key 
     * @return {*}
     */
    getStyle(key) {
        return this.node.style[key];
    }
    /**
     * @method Tooqingui.InputText#scrollToBottom
     * @return {Tooqingui.InputText} this
     */
    scrollToBottom() {
        this.node.scrollTop = this.node.scrollHeight;
        return this;
    }
    /**
     * @method Tooqingui.InputText#setEnabled
     * @param {boolean} enabled 
     * @return {Tooqingui.InputText} this
     */
    setEnabled(enabled) {
        if (enabled === undefined) {
            enabled = true;
        }
        this.node.disabled = !enabled;
        return this;
    }
    /**
     * @method Tooqingui.InputText#setBlur
     * @return {Tooqingui.InputText} this
     */
    setBlur() {
        this.node.blur();
        return this;
    }
    /**
     * @method Tooqingui.InputText#setFocus
     * @return {Tooqingui.InputText} this
     */
    setFocus() {
        this.node.focus();
        return this;
    }
}
/**
 * @name Tooqingui.ElementProperties
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
 * @name Tooqingui.StyleProperties
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
 * @name Tooqingui.ElementEvents
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

module.exports = InputText;