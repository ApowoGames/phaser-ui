import GetDefaultBounds from '../../plugins/utils/defaultbounds/GetDefaultBounds.js';
/**
 * @function apowophaserui.PushIntoBounds
 * @param {Phaser.Geom.Rectangle} bounds 
 */
var PushIntoBounds = function (bounds) {
    if (bounds === undefined) {
        bounds = GetDefaultBounds(this.scene);
    }

    this.left = Math.max(this.left, bounds.left);
    this.right = Math.min(this.right, bounds.right);
    this.top = Math.max(this.top, bounds.top);
    this.bottom = Math.min(this.bottom, bounds.bottom);
    return this;
}

export default PushIntoBounds;