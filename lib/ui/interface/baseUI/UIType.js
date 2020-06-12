"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UIType;
/**
 * @typedef {string} UIType
 */
/**
 * @enum {UIType}
 * @memberof tooqingui
 * @readonly
 * @property {string} None "None"
 * @property {string} Scene "Scene"
 * @property {string} Normal "Normal"
 * @property {string} Pop "Pop"
 * @property {string} Tips "Tips"
 * @property {string} Monopoly "Monopoly"
 * @property {string} Activity "Activity"
*/
var UIType = {
    "None": 1,
    "Scene": 2,
    "Normal": 3,
    "Pop": 4,
    "Tips": 5,
};
(function (UIType) {
    UIType[UIType["None"] = 0] = "None";
    UIType[UIType["Scene"] = 1] = "Scene";
    UIType[UIType["Normal"] = 2] = "Normal";
    UIType[UIType["Pop"] = 3] = "Pop";
    UIType[UIType["Tips"] = 4] = "Tips";
    UIType[UIType["Monopoly"] = 5] = "Monopoly";
    UIType[UIType["Activity"] = 6] = "Activity";
})(UIType = exports.UIType || (exports.UIType = {}));
