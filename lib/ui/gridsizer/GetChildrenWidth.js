import { GetDisplayWidth } from '../../plugins/utils/size/GetDisplaySize.js';

var GetChildrenWidth = function () {
    if (this.TooqingSizer.hidden) {
        return 0;
    }

    var result = 0,
        columnWidth;
    var children = this.gridChildren;
    var child, padding, childWidth, proportion;

    for (var i = 0; i < this.columnCount; i++) {
        proportion = this.columnProportions[i];
        columnWidth = 0;
        if ((proportion === undefined) || (proportion === 0)) {
            for (var j = 0; j < this.rowCount; j++) {
                child = children[(j * this.columnCount) + i];
                if (!child) {
                    continue;
                }
                if (child.TooqingSizer.hidden) {
                    continue;
                }

                childWidth = (child.isTooqingSizer) ?
                    Math.max(child.minWidth, child.childrenWidth) :
                    GetDisplayWidth(child);
                padding = child.TooqingSizer.padding;
                childWidth += (padding.left + padding.right);
                columnWidth = Math.max(columnWidth, childWidth);
            }
            result += columnWidth;
        }
        this.columnWidth[i] = columnWidth;
    }
    return result;
}

export default GetChildrenWidth;