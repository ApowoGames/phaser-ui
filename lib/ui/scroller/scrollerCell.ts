/*
 * 用于scoller交互的item
 * @Author: gxm
 * @Date: 2020-03-21 16:02:41
 * @Last Modified by: gxm
 * @Last Modified time: 2020-03-26 17:54:21
 */

export class ScrollCell {
    private mIndex: number = 0;
    private mPos: any;
    private mGameObject: Phaser.GameObjects.GameObject;
    constructor(object: Phaser.GameObjects.GameObject) {
        this.mPos = { x: (<any>object).x, y: (<any>object).y };
        this.mGameObject = object;
    }
    public set index(value: number) {
        this.mIndex = value;
    }
    public get index(): number {
        return this.mIndex;
    }
    public get pos(): any {
        return this.mPos;
    }
    public set gameobject(object: Phaser.GameObjects.GameObject) {
        this.mPos.x = (<any>object).x;
        this.mPos.y = (<any>object).y;
        this.mGameObject = object;
    }
    public get gameobject(): Phaser.GameObjects.GameObject {
        return this.mGameObject;
    }

    public destroy() {
        this.mGameObject.destroy();
    }
}
