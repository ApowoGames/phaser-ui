"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GetValue = Phaser.Utils.Objects.GetValue;


/**
 * @class Tool
 * @memberof apowophaserui
 * @constructor
 */
class Tool {
    /**
     * @function apowophaserui.Tool.checkPointerContains
     * @static
     * @param {*} gameObject 
     * @param {Phaser.Input.Pointer} pointer 
     * @return {boolean}
     */
    static checkPointerContains(gameObject, pointer) {
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
     * @static
     * @param {*} config 
     * @return {*}
     */
    static getTransfrom(config) {
        return !config ? undefined : config.transform;
    }
    /**
     * @function apowophaserui.Tool.getPos
     * @static
     * @param {*} transform 
     */
    static getPos(transform) {
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
     * @static
     * @param {*} align 
     * @return {boolean}
     */
    static checkNinePatch(align) {
        if (align.top || align.bottom || align.right || align.left) {
            return true;
        }
        return false;
    }

}

export { Tool };

