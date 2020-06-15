import ResizeGameObject from '../../plugins/utils/size/ResizeGameObject.js';
import MaskToGameObject from '../../plugins/utils/mask/MaskToGameObject.js';

var Layout = function (parent, newWidth, newHeight) {
    // Skip invisible sizer
    if (this.TooqingSizer.hidden) {
        return this;
    }

    this.preLayout(parent);

    // Set size
    if (newWidth === undefined) {
        newWidth = Math.max(this.childrenWidth, this.minWidth);
    }
    if (newHeight === undefined) {
        newHeight = Math.max(this.childrenHeight, this.minHeight);
    }
    this.resize(newWidth, newHeight);

    // Layout child
    var child = this.child;
    var childWidth, childHeight;
    if (!child.TooqingSizer.hidden) {
        // Set size
        if (this.scrollMode === 0) {
            childWidth = this.width;
        } else {
            childHeight = this.height;
        }
        if (child.isTooqingSizer) {
            child.layout(this, childWidth, childHeight);
        } else {
            ResizeGameObject(child, childWidth, childHeight);
        }

        this.resetChildPosition();

        // Layout child mask
        if (this.childMask) {
            var maskGameObject = MaskToGameObject(this.childMask);
            maskGameObject.setPosition().resize();
            this.resetChildPositionState(maskGameObject);
        }
    }

    return this.postLayout();
}

export default Layout;