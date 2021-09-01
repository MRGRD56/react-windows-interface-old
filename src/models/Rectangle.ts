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

    static get defaultWindowRectangle(): Rectangle {
        return new Rectangle(new Point(30, 30), new Size(300, 300));
    }

    static getScreenCenter(size: Size): Rectangle {
        const screenCenterPoint = Point.screenCenter;
        return new Rectangle(
            new Point(
                screenCenterPoint.x - size.width / 2,
                screenCenterPoint.y - size.height / 2
            ),
            size
        );
    }
}