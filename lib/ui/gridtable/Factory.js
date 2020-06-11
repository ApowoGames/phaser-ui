"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GridTable_js_1 = require("./GridTable.js");
var ObjectFactory_js_1 = require("../ObjectFactory.js");
var SetValue_js_1 = require("../../plugins/utils/object/SetValue.js");
ObjectFactory_js_1.default.register('gridTable', function (config) {
    var gameObject = new GridTable_js_1.default(this.scene, config);
    this.scene.add.existing(gameObject); // It won't be added to display list, neither update list
    return gameObject;
});
SetValue_js_1.default(window, 'RexPlugins.UI.GridTable', GridTable_js_1.default);
exports.default = GridTable_js_1.default;
//# sourceMappingURL=Factory.js.map