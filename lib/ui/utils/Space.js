var Space = function (scene) {
    var gameObject = scene.add.zone(0, 0, 1, 1);
    gameObject.isTooqingSpace = true;
    return gameObject;
}
export default Space;