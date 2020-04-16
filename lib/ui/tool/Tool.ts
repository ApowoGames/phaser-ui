import { Transform } from "../interface/pos/Transform";
import { Align } from "../interface/pos/Align";

const GetValue = Phaser.Utils.Objects.GetValue;
export class Tool {
    public static checkPointerContains(gameObject: any, pointer: Phaser.Input.Pointer): boolean {
        const left = -gameObject.width / 2;
        const right = gameObject.width / 2;
        const top = -gameObject.height / 2;
        const bottom = gameObject.height / 2;
        if (pointer) {
            const worldMatrix: Phaser.GameObjects.Components.TransformMatrix = gameObject.getWorldTransformMatrix();
            const x: number = pointer.x - worldMatrix.tx - gameObject.x;
            const y: number = pointer.y - worldMatrix.ty - gameObject.y;
            if (left <= x && right >= x && top <= y && bottom >= y) {
                return true;
            }
            return false;
        }
        return false;
    }
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
