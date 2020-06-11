/**
 * @function tooqinui.PostLayout
 * @param {*} parent 
 * @param {number} newWidth 
 * @param {number} newHeight 
 */
var PostLayout = function (parent, newWidth, newHeight) {
    if (this._anchor) {
        this._anchor.updatePosition();
    }
    return this;
}
export default PostLayout;