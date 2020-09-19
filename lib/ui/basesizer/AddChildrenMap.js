/**
 * @function apowophaserui.Base.AddChildrenMap
 * @param {*} key 
 * @param {*} gameObject 
 * @return {*}
 */
var AddChildrenMap = function (key, gameObject) {
    /**
     * @name apowophaserui.Base#childrenMap
     */
    this.childrenMap;
    if (this.childrenMap === undefined) {
        this.childrenMap = {};
    }
    this.childrenMap[key] = gameObject;
    return this;
}

export default AddChildrenMap;