import Point from "./Point";
import Size from "./Size";
import IEquals from "./IEquals";

export default class Rectangle implements IEquals {
    constructor(
        public readonly point: Point,
        public readonly size: Size) {
    }

    get style() {
        return {
            left: this.point.x,
            top: this.point.y,
            width: this.size.width,
            height: this.size.height
        };
    }

    equals(another: Rectangle): boolean {
        return this.point.equals(another.point)
            && this.size.equals(another.size);
    }
}