import TextureMethods from '../../plugins/gameobjects/NinePatch/texture/TextureMethods.js';
import DefaultGetFrameNameCallback from '../../plugins/gameobjects/NinePatch/utils/DefaultGetFrameNameCallback.js';
import IsArray from '../../plugins/utils/object/IsArray.js';

const RenderTexture = Phaser.GameObjects.RenderTexture;
const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const GetValue = Phaser.Utils.Objects.GetValue;
/**
 * @class NinePatch
 * @memberof tooqingui
 * @constructor
 * @extends Phaser.GameObjects.RenderTexture
 * @param {Phaser.Scene} scene
 * @param {number|any} x
 * @param {number} [y=0]
 * @param {number} [width=0]
 * @param {number} [height=0]
 * @param {string} [key]
 * @param {string} [baseFrame]
 * @param {*} [columns]
 * @param {*} [rows]
 * @param {*} [config]
 */
class NinePatch extends RenderTexture {
    constructor(scene, x, y, width, height, key, baseFrame, columns, rows, config) {
        if (IsPlainObject(x)) {
            config = x;
            x = GetValue(config, 'x', 0);
            y = GetValue(config, 'y', 0);
            width = GetValue(config, 'width', 1);
            height = GetValue(config, 'height', 1);
            key = GetValue(config, 'key', undefined);
            baseFrame = GetValue(config, 'baseFrame', undefined);
            columns = GetValue(config, 'columns', undefined);
            rows = GetValue(config, 'rows', undefined);
        } else if (IsPlainObject(width)) {
            config = width;
            width = GetValue(config, 'width', 1);
            height = GetValue(config, 'height', 1);
            key = GetValue(config, 'key', undefined);
            baseFrame = GetValue(config, 'baseFrame', undefined);
            columns = GetValue(config, 'columns', undefined);
            rows = GetValue(config, 'rows', undefined);
        } else if (IsPlainObject(key)) {
            config = key;
            key = GetValue(config, 'key', undefined);
            baseFrame = GetValue(config, 'baseFrame', undefined);
            columns = GetValue(config, 'columns', undefined);
            rows = GetValue(config, 'rows', undefined);
        } else if (IsPlainObject(baseFrame)) {
            config = baseFrame;
            baseFrame = GetValue(config, 'baseFrame', undefined);
            columns = GetValue(config, 'columns', undefined);
            rows = GetValue(config, 'rows', undefined);
        } else if (IsArray(baseFrame)) {
            config = rows;
            rows = columns;
            columns = baseFrame;
            baseFrame = GetValue(config, 'baseFrame', undefined);
        } else if (IsPlainObject(columns)) {
            config = columns;
            columns = GetValue(config, 'columns', undefined);
            rows = GetValue(config, 'rows', undefined);
        }

        super(scene, x, y, width, height);
        /**
         * @name tooqingui.NinePatch#columns
         * @type {number}
         */
        this.columns = {};
        /**
         * @name tooqingui.NinePatch#rows
         * @type {number}
         */
        this.rows = {};
        /**
         * @name tooqingui.NinePatch#stretchMode
         * @type {*}
         */
        this.stretchMode = {};
        this._tileSprite = undefined; // Reserved for drawing image
        this._image = undefined; // Reserved for drawing image

        this.setOrigin(0.5, 0.5);
        this.setGetFrameNameCallback(GetValue(config, 'getFrameNameCallback', undefined));
        this.setStretchMode(GetValue(config, 'stretchMode', 0));
        this.setTexture(key, baseFrame, columns, rows); // Also update render texture
    }
    /**
     * @method tooqingui.NinePatch#setGetFrameNameCallback
     * @param {function} callback 
     * @return {*} this
     */
    setGetFrameNameCallback(callback) {
        if (callback === undefined) {
            callback = DefaultGetFrameNameCallback;
        }
        this.getFrameNameCallback = callback;
        return this;
    }
    /**
     * @name tooqingui.NinePatch#minWidth
     * @return {number}
     */
    get minWidth() {
        return this.columns.minWidth;
    }
    /**
     * @name tooqingui.NinePatch#minHeight
     * @return {number}
     */
    get minHeight() {
        return this.rows.minHeight;
    }
    /**
     * @method tooqingui.NinePatch#resize
     * @param {number} width 
     * @param {number} height 
     * @return {*} this
     */
    resize(width, height) {
        if ((this.width === width) && (this.height === height)) {
            return this;
        }

        super.resize(width, height);
        this.updateTexture();
        return this;
    }
}

Object.assign(
    NinePatch.prototype,
    TextureMethods
);

module.exports = NinePatch