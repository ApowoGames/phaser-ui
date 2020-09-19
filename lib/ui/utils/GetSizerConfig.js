/**
 * @class GetSizerConfig
 * @memberof apowophaserui.utils
 * @param {*} gameObject 
 * @return {*}
 */
var GetSizerConfig = function (gameObject) {
    if (!gameObject.hasOwnProperty('TooqingSizer')) {
        gameObject.TooqingSizer = {};
    }
    return gameObject.TooqingSizer;
}
export default GetSizerConfig;