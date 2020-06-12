"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const GetValue = Phaser.Utils.Objects.GetValue;
const StopPropagationTouchEvents = require("../../plugins/utils/input/StopPropagationTouchEvents.js");
/**
 * @class InputText
 * @memberof tooqingui
 * @constructor
 * @extends Phaser.GameObjects.DOMElement
 * @param {Phaser.Scene} scene
 * @param {number} x
 * @param {number} y
 * @param {number} width
 * @param {number} height
 * @param {*} config
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
        this.type = 'rexInputText';

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
     * @method tooqingui.InputText#resize
     * @param {number} width 
     * @param {number} height 
     * @return {tooqingui.InputText} this
     */
    resize(width, height) {
        var style = this.node.style;
        style.width = width + 'px';
        style.height = height + 'px';
        this.updateSize();
        return this;
    }
    /**
     * @name tooqingui.InputText#text
     * @return {string}
     */
    get text() {
        return this.node.value;
    }

    set text(value) {
        this.node.value = value;
    }
    /**
     * @method tooqingui.InputText#setText
     * @param {string} value 
     * @return {*} this
     */
    setText(value) { // Override
        this.text = value;
        return this;
    }
    /**
     * @method tooqingui.InputText#selectText
     * @return {tooqingui.InputText} this
     */
    selectText() {
        this.node.select();
        return this;
    }
    /**
     * @name tooqingui.InputText#placeholder
     * @return {*}
     */
    get placeholder() {
        return this.node.placeholder;
    }

    set placeholder(value) {
        this.node.placeholder = value;
    }
    /**
     * @method tooqingui.InputText#setPlaceholder
     * @param {*} value 
     * @return {tooqingui.InputText} this
     */
    setPlaceholder(value) {
        this.placeholder = value;
        return this;
    }
    /**
     * @name tooqingui.InputText#tooltip
     * @return {*}
     */
    get tooltip() {
        return this.node.title;
    }

    set tooltip(value) {
        this.node.title = value;
    }
    /**
     * @method tooqingui.InputText#setTooltip
     * @param {*} value 
     * @return {tooqingui.InputText} this
     */
    setTooltip(value) {
        this.tooltip = value;
        return this;
    }
    /**
     * @method tooqingui.InputText#setTextChangedCallback
     * @param {function} callback 
     * @return {tooqingui.InputText} this
     */
    setTextChangedCallback(callback) {
        this.onTextChanged = callback;
        return this;
    }
    /**
     * @name tooqingui.InputText#readOnly
     * @return {boolean}
     */
    get readOnly() {
        return this.node.readOnly;
    }

    set readOnly(value) {
        this.node.readOnly = value;
    }
    /**
     * @method tooqingui.InputText#setReadOnly
     * @param {boolean} value 
     * @return {tooqingui.InputText} this
     */
    setReadOnly(value) {
        if (value === undefined) {
            value = true;
        }
        this.readOnly = value;
        return this;
    }
    /**
     * @name tooqingui.InputText#spellCheck
     * @return {*}
     */
    get spellCheck() {
        return this.node.spellcheck;
    }

    set spellCheck(value) {
        this.node.spellcheck = value;
    }
    /**
     * @method tooqingui.InputText#setSpellCheck
     * @param {*} value 
     * @return {tooqingui.InputText} this
     */
    setSpellCheck(value) {
        this.spellCheck = value;
        return this;
    }
    /**
     * @method tooqingui.InputText#setStyle
     * @param {string} key 
     * @param {*} value 
     * @return {tooqingui.InputText} this
     */
    setStyle(key, value) {
        this.node.style[key] = value;
        return this;
    }
    /**
     * @method tooqingui.InputText#getStyle
     * @param {string} key 
     * @return {*}
     */
    getStyle(key) {
        return this.node.style[key];
    }
    /**
     * @method tooqingui.InputText#scrollToBottom
     * @return {tooqingui.InputText} this
     */
    scrollToBottom() {
        this.node.scrollTop = this.node.scrollHeight;
        return this;
    }
    /**
     * @method tooqingui.InputText#setEnabled
     * @param {boolean} enabled 
     * @return {tooqingui.InputText} this
     */
    setEnabled(enabled) {
        if (enabled === undefined) {
            enabled = true;
        }
        this.node.disabled = !enabled;
        return this;
    }
    /**
     * @method tooqingui.InputText#setBlur
     * @return {tooqingui.InputText} this
     */
    setBlur() {
        this.node.blur();
        return this;
    }
    /**
     * @method tooqingui.InputText#setFocus
     * @return {tooqingui.InputText} this
     */
    setFocus() {
        this.node.focus();
        return this;
    }
}
/**
 * @name tooqingui.ElementProperties
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
 * @name tooqingui.StyleProperties
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
 * @name tooqingui.ElementEvents
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

exports.InputText = InputText;