/**
 * @class BBCodeText
 * @memberof tooqingui
 * @extends tooqingui.Text
 * @constructor
 * @param {Phaser.Scene} scene
 * @param {number} x
 * @param {number} y
 * @param {string} [text]
 * @param {*} [style]
 */
class BBCodeText extends tooqingui.Text {
    constructor(scene, x, y, text, style) {
        super(scene, x, y, text, style, 'TooqingBBCodeText', new tooqingui.parser());
    }
}

module.exports = BBCodeText;