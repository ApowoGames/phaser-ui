/*
 * 用于scoller交互的item
 * @Author: gxm
 * @Date: 2020-03-21 16:02:41
 * @Last Modified by: gxm
 * @Last Modified time: 2020-03-21 17:12:05
 */

import { Pos } from "../../../../../src/utils/pos";

export class ScrollCell {
    private mIndex: number = 0;
    private mPos: Pos;
    private mGameObject: Phaser.GameObjects.GameObject;
    constructor(object: Phaser.GameObjects.GameObject) {
        this.mPos = new Pos((<any>object).x, (<any>object).y);
        this.mGameObject = object;
    }
    public set index(value: number) {
        this.mIndex = value;
    }
    public get index(): number {
        return this.mIndex;
    }
    public get pos(): Pos {
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
