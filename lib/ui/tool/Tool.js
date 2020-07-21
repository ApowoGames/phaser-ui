"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GetValue = Phaser.Utils.Objects.GetValue;
/**
 * @function apowophaserui.Tool.checkPointerContains
 * @memberof apowophaserui.Tool
 * @static
 * @param {*} gameObject 
 * @param {Phaser.Input.Pointer} pointer 
 * @return {boolean}
 */
var checkPointerContains = function (gameObject, pointer) {
    const left = -gameObject.width / 2;
    const right = gameObject.width / 2;
    const top = -gameObject.height / 2;
    const bottom = gameObject.height / 2;
    if (pointer) {
        const worldMatrix = gameObject.getWorldTransformMatrix();
        const x = pointer.x - worldMatrix.tx;
        const y = pointer.y - worldMatrix.ty;
        if (left <= x && right >= x && top <= y && bottom >= y) {
            return true;
        }
        return false;
    }
    return false;
}
/**
 * @function apowophaserui.Tool.getTransfrom
 * @memberof apowophaserui.Tool
 * @static
 * @param {*} config 
 * @return {*}
 */
var getTransfrom = function (config) {
    return !config ? undefined : config.transform;
}
/**
 * @function apowophaserui.Tool.getPos
 * @memberof apowophaserui.Tool
 * @static
 * @param {*} transform 
 */
var getPos = function (transform) {
    const pos = { x: 0, y: 0 };
    if (!transform) {
        return pos;
    }
    let tmpValue;
    const width = GetValue(transform, "width", 0);
    const height = GetValue(transform, "height", 0);
    if (transform.x === undefined) {
        transform.x = 0;
    }
    if (transform.y === undefined) {
        transform.y = 0;
    }
    if (typeof (transform.x) === "string") {
        tmpValue = GetValue(transform, "x", "100%");
        pos.x = Number(tmpValue.split("%")[0]) * width;
    }
    else {
        pos.x = GetValue(transform, "x", 0);
    }
    if (typeof (transform.y) === "string") {
        tmpValue = GetValue(transform, "y", "100%");
        pos.y = Number(tmpValue.split("%")[0]) * height;
    }
    else {
        pos.y = GetValue(transform, "y", 0);
    }
    return pos;
}
/**
 * @function apowophaserui.Tool.checkNinePatch
 * @memberof apowophaserui.Tool
 * @static
 * @param {*} align 
 * @return {boolean}
 */
var checkNinePatch = function (align) {
    if (align.top || align.bottom || align.right || align.left) {
        return true;
    }
    return false;
}

