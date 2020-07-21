"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CoreUI;
/**
 * @name MouseEvent
 * @enum {string}
 * @memberof apowophaserui.CoreUI
 * @readonly
 */
(function (CoreUI) {
    let MouseEvent;
    (function (MouseEvent) {
        MouseEvent["Click"] = "click";
        MouseEvent["Up"] = "Up";
        MouseEvent["Down"] = "Down";
        MouseEvent["Hold"] = "Hold";
        MouseEvent["Tap"] = "Tap";
        MouseEvent["Move"] = "Move";
        MouseEvent["Over"] = "Over";
        MouseEvent["Out"] = "Out";
        MouseEvent["DragStart"] = "DragStart";
        MouseEvent["DragStop"] = "DragStop";
    })(MouseEvent = CoreUI.MouseEvent || (CoreUI.MouseEvent = {}));
})(CoreUI = exports.CoreUI || (exports.CoreUI = {}));
