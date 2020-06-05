import Anchor from '../../plugins/behaviors/anchor/Anchor.js';
/**
 * @function TooqinUI.BaseSizer.SetAnchor
 * @param {*} config 
 */
var SetAnchor = function (config) {
    if (this._anchor === undefined) {
        this._anchor = new Anchor(this, config);
    } else {
        this._anchor.resetFromJSON(config)
    }
    return this;
}

export default SetAnchor;