export default class Rectangle {
    constructor(point, size) {
        this.point = point;
        this.size = size;
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