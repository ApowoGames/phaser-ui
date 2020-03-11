export class Pos {
    x: number;
    y: number;
    z?: number;
    depth?: number;

    constructor()
    constructor(x: number, y: number, z?: number, depth?: number)
    constructor(x?: number, y?: number, z?: number, depth?: number) {
        this.x = x || 0;
        this.y = y || 0;
        this.z = z || 0;
        this.depth = depth | 0;
    }

    public add(x: number, y: number, z?: number): Pos {
        this.x += x;
        this.x += y;
        this.z += z ? z : 0;
        return this;
    }

    public equal(p: Pos): boolean {
        return p.x === this.x && p.y === this.y && p.z === this.z && p.depth === this.depth;
    }

    public toString(): string {
        return `Pos >> x: ${this.x}, y: ${this.y}, z: ${this.z}, depth: ${this.depth}`;
    }

    public toPoint(): Phaser.Geom.Point {
        return new Phaser.Geom.Point(this.x, this.y);
    }

}
