import Point from "./Point";
import Size from "./Size";

export default class Rectangle {
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
}