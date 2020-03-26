import { ScrollCell } from "./ScrollerCell";

export class ScrollCellContainer extends Phaser.GameObjects.Container {
    protected itemList: ScrollCell[];
    constructor(scene: Phaser.Scene) {
        super(scene);
    }
    get scrollList(): ScrollCell[] {
        return this.itemList;
    }
}
