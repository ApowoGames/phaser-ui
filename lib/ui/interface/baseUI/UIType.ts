/**
 * @typedef {number} UIType
 */
/**
 * @enum {UIType}
 * @memberof tooqinui
 * @readonly
 * @property {number} None 0
 * @property {number} Scene 1
 * @property {number} Normal 2
 * @property {number} Pop 3
 * @property {number} Tips 4
 * @property {number} Monopoly 5
 * @property {number} Activity 6
*/
export enum UIType {
    None, // 默认ui类型
    Scene, // 场景内常驻ui
    Normal, // 普通功能ui
    Pop, // 弹出型ui
    Tips, // tips型ui
    Monopoly, // 独占型ui
    Activity, // 热发布活动类型ui，便于单独刷新活动ui
}
