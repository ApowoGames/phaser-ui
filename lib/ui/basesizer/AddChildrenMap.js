/**
 * @function apowophaserui.Base.AddChildrenMap
 * @param {*} key 
 * @param {*} gameObject 
 * @return {*}
 */
var AddChildrenMap = function (key, gameObject) {
    if (this.childrenMap === undefined) {
        this.childrenMap = {};
    }
    this.childrenMap[key] = gameObject;
    return this;
}

export default AddChildrenMap;