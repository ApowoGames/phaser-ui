import Methods from './Methods.js';
import { GetDisplayWidth, GetDisplayHeight } from '../../plugins/utils/size/GetDisplaySize.js';
import Container from '../container/Container.js';

const GetValue = Phaser.Utils.Objects.GetValue;

/**
 * @class Base
 * @memberof apowophaserui
 * @constructor
 * @extends apowophaserui.Container
 * @param {Phaser.Scene} scene
 * @param {number} [x]
 * @param {number} [y]
 * @param {number} [minWidth]
 * @param {number} [minHeight]
 * @param {*} [config]
 */
class Base extends Container {
    constructor(scene, x, y, minWidth, minHeight, config) {
        super(scene, x, y, 2, 2);

        this.isTooqingSizer = true;
        this.setMinSize(minWidth, minHeight);
        this.setName(GetValue(config, 'name', ''));

        this.TooqingSizer = {};

        this.backgroundChildren = undefined;

        var anchorConfig = GetValue(config, 'anchor', undefined);
        if (anchorConfig) {
            this.setAnchor(anchorConfig);
        }

        this.setDraggable(GetValue(config, 'draggable', false));
    }
    /**
     * @method apowophaserui.Base#destroy
     * @param {*} [fromScene] 
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
     * @method apowophaserui.Base#setMinSize
     * @param {number} minWidth 
     * @param {number} minHeight 
     * @return {*}this
     */
    setMinSize(minWidth, minHeight) {
        this.setMinWidth(minWidth).setMinHeight(minHeight);
        return this;
    }
    /**
     * @method apowophaserui.Base#setMinWidth
     * @param {number} minWidth 
     * @return {*} this
     */
    setMinWidth(minWidth) {
        if (minWidth == null) {
            minWidth = 0;
        }
        this.minWidth = minWidth;
        return this;
    }
    /**
     * @method apowophaserui.Base#setMinHeight
     * @param {number} minHeight 
     * @return {*} this
     */
    setMinHeight(minHeight) {
        if (minHeight == null) {
            minHeight = 0;
        }
        this.minHeight = minHeight;
        return this;
    }

    /**
     * @name apowophaserui.Base#childrenWidth
     * @return {number}
     */
    get childrenWidth() {
        if (this._childrenWidth === undefined) {
            this._childrenWidth = this.getChildrenWidth();
        }
        return this._childrenWidth;
    }
    /**
     * @name apowophaserui.Base#childrenHeight
     * @return {number}
     */
    get childrenHeight() {
        if (this._childrenHeight === undefined) {
            this._childrenHeight = this.getChildrenHeight();
        }
        return this._childrenHeight;
    }
    /**
     * @name apowophaserui.Base#left
     * @return {number}
     */
    get left() {
        return this.x - (GetDisplayWidth(this) * this.originX);
    }

    set left(value) {
        this.x += (value - this.left);
    }
    /**
     * @method apowophaserui.Base#alignLeft
     * @param {*} value
     * @return {*} this
     */
    alignLeft(value) {
        this.left = value;
        return this;
    }
    /**
     * @name apowophaserui.Base#right
     * @return {number}
     */
    get right() {
        return this.left + GetDisplayWidth(this);
    }

    set right(value) {
        this.x += (value - this.right);
    }
    /**
     * @method apowophaserui.Base#alignRight
     * @param {*} value
     * @return {*} this
     */
    alignRight(value) {
        this.right = value;
        return this;
    }
    /**
     * @name apowophaserui.Base#centerX
     * @return {number}
     */
    get centerX() {
        return this.left + (GetDisplayWidth(this) / 2);
    }

    set centerX(value) {
        this.x += (value - this.centerX);
    }
    /**
     * @method apowophaserui.Base#alignCenterX
     * @param {*} value 
     * @return {*} this
     */
    alignCenterX(value) {
        this.centerX = value;
        return this;
    }
    /**
     * @name apowophaserui.Base#top
     * @return {number}
     */
    get top() {
        return this.y - (GetDisplayHeight(this) * this.originY);
    }

    set top(value) {
        this.y += (value - this.top);
    }
    /**
     * @method apowophaserui.Base#alignTop
     * @param {*} value 
     * @return {*} this
     */
    alignTop(value) {
        this.top = value;
        return this;
    }
    /**
     * @name apowophaserui.Base#bottom
     * @return {number}
     */
    get bottom() {
        return this.top + GetDisplayHeight(this);
    }

    set bottom(value) {
        this.y += (value - this.bottom);
    }
    /**
     * @method apowophaserui.Base#alignBottom
     * @param {*} value 
     * @return {*} this
     */
    alignBottom(value) {
        this.bottom = value;
        return this;
    }
    /**
     * @name apowophaserui.Base#centerY
     * @return {number}
     */
    get centerY() {
        return this.top + (GetDisplayHeight(this) / 2);
    }

    set centerY(value) {
        this.y += (value - this.centerY);
    }
    /**
     * @method apowophaserui.Base#alignCenterY
     * @param {*} value 
     * @return {*} this
     */
    alignCenterY(value) {
        this.centerY = value;
        return this;
    }
    /**
     * @method apowophaserui.Base#pin
     * @param {*} gameObject 
     * @return {*} this
     */
    pin(gameObject) {
        super.add(gameObject);
        return this;
    }
    /**
     * @method apowophaserui.Base#addBackground
     * @param {*} gameObject 
     * @param {*} childKey 
     * @return {*} this
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