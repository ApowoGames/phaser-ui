var ResetTextObjectPosition = function () {
    var config = this.textObject.TooqingSizer;
    this.textObject.y += (config.offsetY - config.preOffsetY);
    config.preOffsetY = config.offsetY;
    this.resetChildPositionState(this.textObject);
}
export default ResetTextObjectPosition;