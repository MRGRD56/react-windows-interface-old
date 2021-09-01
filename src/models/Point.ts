import IEquals from "./IEquals";
import Size from "./Size";

export default class Point implements IEquals {
    constructor(
        public x: number,
        public y: number) {
    }

    equals(another: Point): boolean {
        return this.x == another.x
            && this.y == another.y;
    }

    static get screenCenter(): Point {
        const screenSize = Size.screenSize;
        return new Point(
            Math.round(screenSize.width / 2),
            Math.round(screenSize.height / 2));
    }

    withX(x: number): Point {
        return new Point(x, this.y);
    }

    withY(y: number): Point {
        return new Point(this.x, y);
    }
}