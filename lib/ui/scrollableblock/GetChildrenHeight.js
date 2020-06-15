import { GetDisplayHeight } from '../../plugins/utils/size/GetDisplaySize.js';

var GetChildrenHeight = function () {
    if (this.TooqingSizer.hidden) {
        return 0;
    }

    var result;
    var child = this.child,
        childConfig = child.TooqingSizer;
    if (childConfig.hidden) {
        result = 0;
    } else if (this.scrollMode === 0) { // scroll y   
        result = 0;
    } else { // scroll x
        result = (child.isTooqingSizer) ?
            Math.max(child.minHeight, child.childrenHeight) :
            GetDisplayHeight(child);
    }

    return result;
}

export default GetChildrenHeight;