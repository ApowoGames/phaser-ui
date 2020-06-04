import GetSizerConfig from './GetSizerConfig.js';
/**
 * @function TooqinUI.Utils.GetParentSizer
 * @param {*} gameObject 
 * @return {*}
 */
var GetParentSizer = function (gameObject) {
    return GetSizerConfig(gameObject).parent;
}

export default GetParentSizer;