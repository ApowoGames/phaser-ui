import ClickCell from './ClickCell.js';
import OverCell from './OverCell.js';
import TapCell from './TapCell.js';
import PressCell from './PressCell.js';
import SwipeCell from './SwipeCell.js';
const GetValue = Phaser.Utils.Objects.GetValue;
var TableSetInteractive = function (table, tableConfig) {
    table.setInteractive();
    const interactive = GetValue(tableConfig, "interactive", true);
    if (interactive) {
        let cellclick = false;
        let cellover = false;
        let celltap = false;
        let cellpress = false;
        let cellswipe = false;
        if (typeof (interactive) === "object") {
            cellclick = GetValue(interactive, "cellclick", false);
            cellover = GetValue(interactive, "cellover", false);
            celltap = GetValue(interactive, "celltap", false);
            cellpress = GetValue(interactive, "cellpress", false);
            cellswipe = GetValue(interactive, "cellswipe", false);
        } else if (typeof (interactive) === "boolean") {
            cellclick = interactive;
            cellover = interactive;
            celltap = interactive;
            cellpress = interactive;
            cellswipe = interactive;
        }
        if (cellclick) ClickCell.call(this, table, tableConfig);
        if (cellover) OverCell.call(this, table, tableConfig);
        if (celltap) TapCell.call(this, table, tableConfig);
        if (cellpress) PressCell.call(this, table, tableConfig);
        if (cellswipe) SwipeCell.call(this, table, tableConfig);
    }
}

export default TableSetInteractive;