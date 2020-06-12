import Container from '../container/Container.js';
import Methods from './Methods.js';
import { GetDisplayWidth, GetDisplayHeight } from '../../plugins/utils/size/GetDisplaySize.js';

const GetValue = Phaser.Utils.Objects.GetValue;
/**
 * @class Base
 * @memberof tooqingui.basesizer
 * @constructor
 * @param {Phaser.Scene} scene 
 * @param {number} x
 * @param {number} y
 * @param {number} minWidth
 * @param {number} minHeight
 * @param {*} config
 * 
 */
class Base extends Container {
    constructor(scene, x, y, minWidth, minHeight, config) {
        super(scene, x, y, 2, 2);
        /**
         * @name tooqingui.basesizer.Base#isRexSizer
         * @type {boolean}
         */
        this.isRexSizer = true;
        this.setMinSize(minWidth, minHeight);
        this.setName(GetValue(config, 'name', ''));
        /**
         * @name tooqingui.basesizer.Base#rexSizer
         * @type {*}
         */
        this.rexSizer = {};
        /**
         * @name tooqingui.basesizer.Base#backgroundChildren
         * @type {*}
         */
        this.backgroundChildren = undefined;

        var anchorConfig = GetValue(config, 'anchor', undefined);
        if (anchorConfig) {
            this.setAnchor(anchorConfig);
        }

        this.setDraggable(GetValue(config, 'draggable', false));
    }
    /**
     * @method tooqingui.basesizer.Base#destroy
     * @param {boolean} fromScene 
     */
    destroy(fromScene) {
        //  This Game Object has already been destroyed
        if (!this.scene) {
            return;
        }
        if (this.backgroundChildren !== undefined) {
            this.backgroundChildren.length = 0;
        }
        super.destroy(fromScene);
    }
    /**
     * @method tooqingui.basesizer.Base#setMinSize
     * @param {number} minWidth 
     * @param {number} minHeight 
     */
    setMinSize(minWidth, minHeight) {
        this.setMinWidth(minWidth).setMinHeight(minHeight);
        return this;
    }
    /**
     * @method tooqingui.basesizer.Base#setMinWidth
     * @param {number} minWidth 
     */
    setMinWidth(minWidth) {
        if (minWidth == null) {
            minWidth = 0;
        }
        this.minWidth = minWidth;
        return this;
    }
    /**
     * @method tooqingui.basesizer.Base#setMinHeight
     * @param {number} minHeight 
     */
    setMinHeight(minHeight) {
        if (minHeight == null) {
            minHeight = 0;
        }
        this.minHeight = minHeight;
        return this;
    }
    /**
     * @name Base.childrenWidth
     * @type {number}
     * @return {number}
     */
    get childrenWidth() {
        if (this._childrenWidth === undefined) {
            this._childrenWidth = this.getChildrenWidth();
        }
        return this._childrenWidth;
    }
    /**
     * @name Base.childrenHeight
     * @type {number}
     * @return {number}
     */
    get childrenHeight() {
        if (this._childrenHeight === undefined) {
            this._childrenHeight = this.getChildrenHeight();
        }
        return this._childrenHeight;
    }
    /**
     * @name Base.left
     * @type {number}
     * @return {number}
     */
    get left() {
        return this.x - (GetDisplayWidth(this) * this.originX);
    }
    /**
     * 
     */
    set left(value) {
        this.x += (value - this.left);
    }
    /**
     * @method tooqingui.basesizer.Base#alignLeft
     * @param {number} value 
     */
    alignLeft(value) {
        this.left = value;
        return this;
    }
    /**
     * @name tooqingui.basesizer.Base#right
     * @type {number}
     * @return {number}
     */
    get right() {
        return this.left + GetDisplayWidth(this);
    }
    /**
     * 
     */
    set right(value) {
        this.x += (value - this.right);
    }
    /**
     * @method tooqingui.basesizer.Base#alignRight
     * @param {number} value 
     */
    alignRight(value) {
        this.right = value;
        return this;
    }
    /**
     * @name tooqingui.basesizer.Base#centerX
     * @type {number}
     * @return {number}
     */
    get centerX() {
        return this.left + (GetDisplayWidth(this) / 2);
    }
    /**
     * 
     */
    set centerX(value) {
        this.x += (value - this.centerX);
    }
    /**
     * @method tooqingui.basesizer.Base#alignCenterX
     * @param {number} value 
     */
    alignCenterX(value) {
        this.centerX = value;
        return this;
    }
    /**
     * @name tooqingui.basesizer.Base#top
     * @type {number}
     * @return {number}
     */
    get top() {
        return this.y - (GetDisplayHeight(this) * this.originY);
    }
    /**
     * 
     */
    set top(value) {
        this.y += (value - this.top);
    }
    /**
     * @method tooqingui.basesizer.Base#alignTop
     * @param {number} value 
     */
    alignTop(value) {
        this.top = value;
        return this;
    }
    /**
     * @name tooqingui.basesizer.Base#bottom
     * @type {number}
     * @return {number}
     */
    get bottom() {
        return this.top + GetDisplayHeight(this);
    }
    /**
     * 
     */
    set bottom(value) {
        this.y += (value - this.bottom);
    }
    /**
     * @method tooqingui.basesizer.Base#alignBottom
     * @param {number} value 
     */
    alignBottom(value) {
        this.bottom = value;
        return this;
    }
    /**
     * @name tooqingui.basesizer.Base#centerY
     * @type {number}
     * @return {number}
     */
    get centerY() {
        return this.top + (GetDisplayHeight(this) / 2);
    }
    /**
     * 
     */
    set centerY(value) {
        this.y += (value - this.centerY);
    }
    /**
     * @method tooqingui.basesizer.Base#alignCenterY
     * @param {number} value 
     */
    alignCenterY(value) {
        this.centerY = value;
        return this;
    }
    /**
     * @method tooqingui.basesizer.Base#pin
     * @param {*} gameObject 
     */
    pin(gameObject) {
        super.add(gameObject);
        return this;
    }
    /**
     * @method tooqingui.basesizer.Base#addBackground
     * @param {*} gameObject 
     * @param {*} childKey 
     */
    addBackground(gameObject, childKey) {
        if (this.backgroundChildren === undefined) {
            this.backgroundChildren = [];
        }

        super.add(gameObject);

        var config = this.getSizerConfig(gameObject);
        config.parent = this;
        this.backgroundChildren.push(gameObject);

        if (childKey !== undefined) {
            this.addChildrenMap(childKey, gameObject)
        }
        return this;
    }
}

Object.assign(
    Base.prototype,
    Methods
);

export default Base;