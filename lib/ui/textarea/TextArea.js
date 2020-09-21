"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
import TextBlock from '../textblock/TextBlock.js';
import InjectProperties from './InjectProperties.js';
import Scrollable from '../utils/scrollable/Scrollable.js';
import SetText from './SetText';
import AppendText from './AppendText';

const GetValue = Phaser.Utils.Objects.GetValue;
/**
 * @class TextArea
 * @memberof apowophaserui
 * @extends apowophaserui.Scrollable
 * @constructor
 * @param {Phaser.Scene} scene
 * @param {*} [config]
 */
class TextArea extends Scrollable {
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
    }
    /**
     * @name apowophaserui.TextArea#text
     * @return {*}
     */
    get text() {
        return this.childrenMap.child.text;
    }

    /**
    * @name apowophaserui.TextArea#linesCount
    * @return {*}
    */
    get linesCount() {
        return this.childrenMap.child.linesCount;
    }
}

var methods = {
    setText: SetText,
    appendText: AppendText,
}
Object.assign(
    TextArea.prototype,
    methods
);

export default TextArea;