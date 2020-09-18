import BBcodeText from '../../plugins/gameobjects/text/bbcodetext/BBCodeText.js';
/**
 * @function apowophaserui.BBCodeText
 * @param {Phaser.Scene} scene 
 * @param {number} x 
 * @param {number} y 
 * @param {Phaser.GameObjects.Text} text 
 * @param {*} style 
 * @return {*}
 */
var BBCodeText = function (scene, x, y, text, style) {
    return new BBcodeText(scene, x, y, text, style);
}

export default BBCodeText;