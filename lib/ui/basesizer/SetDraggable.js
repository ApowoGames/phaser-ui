/**
 * @function apowophaserui.SetDraggable
 * @param {*} senser 
 * @param {boolean} draggable 
 */
var SetDraggable = function (senser, draggable) {
    var senserType = typeof (senser);
    if (senserType === 'string') {
        senser = this.getElement(senser);
    } else if ((senser === undefined) || (senserType != 'object')) {
        draggable = senser;
        senser = this;
    }
    if (draggable === undefined) {
        draggable = true;
    }

    if (senser.input && senser.input.hasOwnProperty('draggable')) {
        // Draggable is already registered
        senser.input.draggable = draggable;
    } else if (draggable) {
        // Register draggable
        senser.setInteractive();
        senser.scene.input.setDraggable(senser);
        senser.on('drag', onDrag, this);
    } else {
        // Not draggable and draggable is not registered yet, do nothing
    }
    return this;
}
/**
 * @function apowophaserui.onDrag
 * @param {Phaser.Input.Pointer} pointer 
 * @param {number} dragX 
 * @param {number} dragY 
 */
var onDrag = function (pointer, dragX, dragY) {
    var topmostParent = this.getTopmostSizer();
    topmostParent.x += (dragX - this.x);
    topmostParent.y += (dragY - this.y);
}

export default SetDraggable;