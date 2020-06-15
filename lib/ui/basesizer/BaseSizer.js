import Methods from './Methods.js';
import { GetDisplayWidth, GetDisplayHeight } from '../../plugins/utils/size/GetDisplaySize.js';

const GetValue = Phaser.Utils.Objects.GetValue;
/**
 * @class Base
 * @memberof tooqingui
 * @constructor
 * @extends tooqingui.ContainerLite
 * @param {Phaser.Scene} scene 
 * @param {number} x
 * @param {number} y
 * @param {number} minWidth
 * @param {number} minHeight
 * @param {*} config
 * 
 */
class Base extends tooqingui.ContainerLite {
    constructor(scene, x, y, minWidth, minHeight, config) {
        super(scene, x, y, 2, 2);
        /**
         * @name tooqingui.Base#isTooqingSizer
         * @type {boolean}
         */
        this.isTooqingSizer = true;
        this.setMinSize(minWidth, minHeight);
        this.setName(GetValue(config, 'name', ''));
        /**
         * @name tooqingui.Base#TooqingSizer
         * @type {*}
         */
        this.TooqingSizer = {};
        /**
         * @name tooqingui.Base#backgroundChildren
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
     * @method tooqingui.Base#destroy
     * @param {boolean} [fromScene] 
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
     * @method tooqingui.Base#setMinSize
     * @param {number} minWidth 
     * @param {number} minHeight 
     */
    setMinSize(minWidth, minHeight) {
        this.setMinWidth(minWidth).setMinHeight(minHeight);
        return this;
    }
    /**
     * @method tooqingui.Base#setMinWidth
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
     * @method tooqingui.Base#setMinHeight
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
     * @method tooqingui.Base#alignLeft
     * @param {number} value 
     */
    alignLeft(value) {
        this.left = value;
        return this;
    }
    /**
     * @name tooqingui.Base#right
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
     * @method tooqingui.Base#alignRight
     * @param {number} value 
     */
    alignRight(value) {
        this.right = value;
        return this;
    }
    /**
     * @name tooqingui.Base#centerX
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
     * @method tooqingui.Base#alignCenterX
     * @param {number} value 
     */
    alignCenterX(value) {
        this.centerX = value;
        return this;
    }
    /**
     * @name tooqingui.Base#top
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
     * @method tooqingui.Base#alignTop
     * @param {number} value 
     */
    alignTop(value) {
        this.top = value;
        return this;
    }
    /**
     * @name tooqingui.Base#bottom
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
     * @method tooqingui.Base#alignBottom
     * @param {number} value 
     */
    alignBottom(value) {
        this.bottom = value;
        return this;
    }
    /**
     * @name tooqingui.Base#centerY
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
     * @method tooqingui.Base#alignCenterY
     * @param {number} value 
     */
    alignCenterY(value) {
        this.centerY = value;
        return this;
    }
    /**
     * @method tooqingui.Base#pin
     * @param {*} gameObject 
     */
    pin(gameObject) {
        super.add(gameObject);
        return this;
    }
    /**
     * @method tooqingui.Base#addBackground
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