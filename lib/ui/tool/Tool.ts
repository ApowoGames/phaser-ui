import { Transform } from "../interface/pos/Transform";
import { Align } from "../interface/pos/Align";

const GetValue = Phaser.Utils.Objects.GetValue;
export class Tool {
    public static getTransfrom(config: any): any {
        return !config ? undefined : config.transform;
    }
    public static getPos(transform: Transform): any {
        const pos: any = { x: 0, y: 0 };
        if (!transform) {
            return pos;
        }
        let tmpValue: string;
        const width = GetValue(transform, "width", 0);
        const height = GetValue(transform, "height", 0);
        if (transform.x === undefined) {
            transform.x = 0;
        }
        if (transform.y === undefined) {
            transform.y = 0;
        }
        if (typeof (transform.x) === "string") {
            tmpValue = GetValue(transform, "x", "100%");
            pos.x = Number(tmpValue.split("%")[0]) * width;
        } else {
            pos.x = GetValue(transform, "x", 0);
        }

        if (typeof (transform.y) === "string") {
            tmpValue = GetValue(transform, "y", "100%");
            pos.y = Number(tmpValue.split("%")[0]) * height;
        } else {
            pos.y = GetValue(transform, "y", 0);
        }
        return pos;
    }

    public static checkNinePatch(align: Align): boolean {
        if (align.top || align.bottom || align.right || align.left) {
            return true;
        }
        return false;
    }
}
