"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
import Resize from "./utils/Resize";
import SetPrpoerties from "./utils/SetProperties";
import RouteEvents from "./utils/RouteEvents";
import StopPropagationTouchEvents from "../../utils/input/StopPropagationTouchEvents";

const DOMElement = Phaser.GameObjects.DOMElement;
const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const GetValue = Phaser.Utils.Objects.GetValue;
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
class InputText extends DOMElement {
    constructor(scene, x, y, width, height, config) {
        if (IsPlainObject(x)) {
            config = x;
            x = GetValue(config, "x", 0);
            y = GetValue(config, "y", 0);
            width = GetValue(config, "width", 0);
            height = GetValue(config, "height", 0);
        } else if (IsPlainObject(width)) {
            config = width;
            width = GetValue(config, "width", 0);
            height = GetValue(config, "height", 0);
        }

        if (config === undefined) {
            config = {};
        }

        var element;
        var textType = GetValue(config, "type", "text");
        if (textType === "textarea") {
            element = document.createElement("textarea");
            element.style.resize = "none";
        } else {
            element = document.createElement("input");
            element.type = textType;
        }
        SetPrpoerties(ElementProperties, config, element);

        var style = GetValue(config, "style", undefined);
        style = SetPrpoerties(StyleProperties, config, style);
        // Apply other style properties
        var elementStyle = element.style;
        for (var key in config) {
            if ((key in ElementProperties) || (key in StyleProperties)) {
                continue;
            } else if (key in elementStyle) {
                style[key] = config[key];
            }
        }
        style["box-sizing"] = "border-box";
        super(scene, x, y, element, style);
        // const add = GetValue(config, "add", true);
        scene.add.existing(this);
        this.type = "rexInputText";
        this.resize(width, height);
        window.scrollTo(0, 0);
        // Apply events
        RouteEvents(this, element, ElementEvents);

        // Don"t propagate touch/mouse events to parent(game canvas)
        StopPropagationTouchEvents(element);
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
     */    selectText() {
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

var methods = {
    resize: Resize
}

Object.assign(
    InputText.prototype,
    methods
);

const ElementProperties = {
    id: ["id", undefined],
    text: ["value", undefined],
    placeholder: ["placeholder", undefined],
    tooltip: ["title", undefined],
    readOnly: ["readonly", false],
    spellCheck: ["spellcheck", false],
    autoComplete: ["autocomplete", "off"],
    maxLength: ['maxLength', undefined]
};

const StyleProperties = {
    align: ["textAlign", undefined],
    paddingLeft: ["padding-left", undefined],
    paddingRight: ["padding-right", undefined],
    paddingTop: ["padding-top", undefined],
    paddingBottom: ["padding-bottom", undefined],
    fontFamily: ["fontFamily", undefined],
    fontSize: ["font-size", undefined],
    color: ["color", "#ffffff"],
    backgroundColor: ["backgroundColor", "transparent"],
    border: ["border", 0],
    borderColor: ["borderColor", "transparent"],
    outline: ["outline", "none"],
};

const ElementEvents = {
    textchange: "oninput",
    click: "onclick",
    dblclick: "ondblclick",
    focus: "onfocus",
    blur: "onblur",
};

export default InputText;