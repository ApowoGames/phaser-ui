"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
import GridTable from "./GridTable.js";
import ObjectFactory from "../ObjectFactory.js";
import SetValue from "../../plugins/utils/object/SetValue.js";
ObjectFactory.register('gridTable', function (config) {
    var gameObject = new GridTable(this.scene, config);
    this.scene.add.existing(gameObject); // It won't be added to display list, neither update list
    return gameObject;
});
SetValue(window, 'TooqingPlugins.UI.GridTable', GridTable);
export default GridTable;
//# sourceMappingURL=Factory.js.map