import GetParentSizer from './GetParentSizer.js';
/**
 * @function tooqingui.Utils.GetTopmostSizer
 * @param {*} gameObject 
 * @return {*}
 */
var GetTopmostSizer = function (gameObject) {
    var parent = GetParentSizer(gameObject);
    while (parent) {
        gameObject = parent;
        parent = GetParentSizer(parent);
    }
    return gameObject;
}

export default GetTopmostSizer;