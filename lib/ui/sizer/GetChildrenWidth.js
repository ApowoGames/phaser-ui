import { GetDisplayWidth } from '../../plugins/utils/size/GetDisplaySize.js';

var GetChildrenWidth = function (minimumMode) {
    if (this.TooqingSizer.hidden) {
        return 0;
    }

    if (minimumMode === undefined) {
        minimumMode = true;
    }

    var result = 0;
    var children = this.sizerChildren;
    var child, padding, childWidth;
    if (this.orientation === 0) { // x
        // Get summation of minimum width
        for (var i = 0, cnt = children.length; i < cnt; i++) {
            child = children[i];
            if (child.TooqingSizer.hidden) {
                continue;
            }

            if (
                (child.TooqingSizer.proportion === 0) ||
                (minimumMode && (!child.isTooqingSpace) && (child.TooqingSizer.proportion > 0))
            ) {
                childWidth = (child.isTooqingSizer) ?
                    Math.max(child.minWidth, child.childrenWidth) :
                    GetDisplayWidth(child);
            } else {
                childWidth = 0;
            }
            padding = child.TooqingSizer.padding;
            childWidth += (padding.left + padding.right);
            result += childWidth;
        }
    } else {
        // Get maximun width
        for (var i = 0, cnt = children.length; i < cnt; i++) {
            child = children[i];
            if (!child.hasOwnProperty('TooqingSizer')) {
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
            result = Math.max(childWidth, result);
        }
    }
    return result;
}

export default GetChildrenWidth;