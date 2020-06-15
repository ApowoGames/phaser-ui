import TextBlock from '../textblock/TextBlock.js';
import InjectProperties from './InjectProperties.js';

const GetValue = Phaser.Utils.Objects.GetValue;
/**
 * @class TextArea
 * @memberof Tooqingui
 * @extends Tooqingui.Scrollable
 * @constructor
 * @param {Phaser.Scene} scene
 * @param {*} [config]
 */
class TextArea extends Tooqingui.Scrollable {
    constructor(scene, config) {
        if (config === undefined) {
            config = {};
        }

        // Create text-block
        var textObject = GetValue(config, 'text', undefined);
        var textWidth = GetValue(config, 'textWidth', undefined);
        var textHeight = GetValue(config, 'textHeight', undefined);
        var textMask = GetValue(config, 'textMask', true);
        var content = GetValue(config, 'content', '');
        var textBlock = new TextBlock(scene, {
            width: textWidth,
            height: textHeight,
            text: textObject,
            textMask: textMask,
            content: content,
            clamplTextOY: GetValue(config, 'clamplChildOY', false),
        });
        var proportion = (textWidth === undefined) ? 1 : 0;
        var expand = (textHeight === undefined);
        // Inject properties for scrollable interface
        InjectProperties(textBlock);

        // Fill config of scrollable
        config.scrollMode = 0; // Vertical
        config.type = 'TooqingTextArea';
        config.child = {
            gameObject: textBlock,
            proportion: proportion,
            expand: expand,
        };
        var spaceConfig = GetValue(config, 'space', undefined);
        if (spaceConfig) {
            spaceConfig.child = spaceConfig.text;
        }
        super(scene, config);

        this.addChildrenMap('text', textObject);
        /**
         * @name Tooqingui.TextArea#childrenMap
         * @type {*}
         */
        this.childrenMap;
    }
    /**
     * @name Tooqingui.TextArea#text
     * @return {string}
     */
    get text() {
        return this.childrenMap.child.text;
    }
    /**
     * @name Tooqingui.TextArea#linesCount
     * @return {number}
     */
    get linesCount() {
        return this.childrenMap.child.linesCount;
    }
    /**
     * @method Tooqingui.TextArea#setText
     * @param {string} text 
     * @return {Tooqingui.TextArea} this
     */
    setText(text) {
        var textBlock = this.childrenMap.child;
        textBlock.setText(text);

        this.resizeController();
        return this;
    }
    /**
     * @method Tooqingui.TextArea#appendText
     * @param {string} text 
     * @return {Tooqingui.TextArea} this
     */
    appendText(text) {
        this.setText(this.text + text);
        return this;
    }
}

Object.assign(
    TextArea.prototype,
    methods
);

export default TextArea;