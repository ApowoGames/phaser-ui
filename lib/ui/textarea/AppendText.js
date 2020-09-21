/**
 * @method apowophaserui.TextArea#appendText
 * @param {string} text
 * @return {*} 
 */
var AppendText = function (text) {
    this.setText(this.text + text);
    return this;
}
export default AppendText;