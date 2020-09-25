var PointerToCellIndex = function (x, y) {
    var worldpos = this.getWorldTransformMatrix();
    var mx = worldpos.tx;// this.x;
    var my = worldpos.ty;// this.y;
    y -= (my + this.topLeftY * this.zoom);
    x -= (mx + this.topLeftX * this.zoom);
    y /= this.zoom;
    x /= this.zoom;
    var offsetTableOY = this.tableOY - ((this.scrollMode === 0) ? y : x);
    var offsetTableOX = this.tableOX - ((this.scrollMode === 0) ? x : y);

    var table = this.table;
    var rowIdx = table.heightToRowIndex(-offsetTableOY);
    var colIdx = table.widthToColIndex(-offsetTableOX);
    var cellIdx = table.colRowToCellIndex(colIdx, rowIdx);
    if (cellIdx === null) {
        return null;
    }
    if (!this.isCellVisible(cellIdx)) {
        return null;
    }
    return cellIdx;
}

var PointerToCellContainer = function (x, y) {
    var cellIdx = PointerToCellIndex.call(this, x, y);
    if (cellIdx === null) {
        return undefined;
    }
    return this.getCellContainer(cellIdx);
}

export { PointerToCellIndex, PointerToCellContainer };