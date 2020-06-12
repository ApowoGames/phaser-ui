import IsPointerInBounds from '../../plugins/utils/input/IsPointerInBounds.js';

export default function (pointer) {
    /**
     * @function tooqingui.basesizer.IsInTouching
     * @param {*} gameObject 
     * @param {Phaser.Input.Pointer} pointer 
     * @return {boolean}
     */
    return IsPointerInBounds(this, pointer);
}