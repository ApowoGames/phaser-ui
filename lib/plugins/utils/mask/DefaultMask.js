const Graphics = Phaser.GameObjects.Graphics;

class DefaultMask extends Graphics {
    constructor(parent, shape, padding) {
        if (shape === undefined) {
            shape = 0;
        }
        if (typeof (shape) === 'string') {
            shaep = SHAPEMODE[shape];
        }
        if (padding === undefined) {
            padding = 0;
        }

        super(parent.scene);
        this.parent = parent;
        this.shape = shape;
        this.padding = padding;
        this.setPosition().resize();
        // Don't add it to display list
        // Graphics does not have origin, bounds
    }

    destroy() {
        this.parent = undefined;
        super.destroy();
        return this;
    }

    setPosition(x, y) {
        var parent = this.parent;
        if (parent)
            var worldpos = parent.getWorldTransformMatrix();
        if (x === undefined) {
            x = (worldpos.tx ? worldpos.tx : parent.x);
        }
        if (y === undefined) {
            y = (worldpos.ty ? worldpos.ty : parent.y);
        }
        super.setPosition(x, y);
        return this;
    }

    resize(width, height, padding) {
        var parent = this.parent;
        var zoom = parent.zoom === undefined ? 1 : parent.zoom;
        if (width === undefined) {
            width = parent.width * zoom;
        }
        if (height === undefined) {
            height = parent.height * zoom;
        }
        if (padding === undefined) {
            padding = this.padding * zoom;
        }
        // if(padding===undefined)padding = 4;
        if ((this.widthSave === width) && (this.heightSave === height) && (this.paddingSave === padding)) {
            return this;
        }

        this.clear().fillStyle(0xffffff);
        switch (this.shape) {
            case 1: // circle
                var radius = Math.min(width, height) / 2;
                this.fillCircle(
                    0,
                    0,
                    radius + padding
                );
                break;
            default: // 0|'rectangle'
                this.fillRect(
                    -(width * parent.originX) - padding,
                    -(height * parent.originY) - padding,
                    width + (2 * padding),
                    height + (2 * padding)
                );
                break;
        }
        this.widthSave = width;
        this.heightSave = height;
        this.paddingSave = padding;
        return this;
    }
}

const SHAPEMODE = {
    rectangle: 0,
    circle: 1,
}
export default DefaultMask;