// Override
/**
 * @function apowophaserui.Layout
 * @param {*} parent 
 * @param {number} newWidth 
 * @param {number} newHeight 
 * @return {*}
 */
var Layout = function (parent, newWidth, newHeight) {
    if (this.TooqingSizer.hidden) {
        return this;
    }

    this.preLayout()

    // ...

    return this.postLayout();
}
export default Layout;