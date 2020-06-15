/**
 * @class BBCodeText
 * @memberof Tooqingui
 * @extends Tooqingui.Text
 * @constructor
 * @param {Phaser.Scene} scene
 * @param {number} x
 * @param {number} y
 * @param {string} [text]
 * @param {*} [style]
 */
class BBCodeText extends Tooqingui.Text {
    constructor(scene, x, y, text, style) {
        super(scene, x, y, text, style, 'TooqingBBCodeText', new Tooqingui.parser());
    }
}

module.exports = BBCodeText;