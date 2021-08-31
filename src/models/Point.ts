import IEquals from "./IEquals";

export default class Point implements IEquals {
    constructor(
        public x: number,
        public y: number) {
    }

    public equals(another: Point) {
        return this.x == another.x
            && this.y == another.y;
    }
}