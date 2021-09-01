import IEquals from "./IEquals";

export default class Size implements IEquals {
    constructor(
        public width: number,
        public height: number) {
    }

    equals(another: Size): boolean {
        return this.width == another.width
            && this.height == another.height;
    }

    static get screenSize(): Size {
        return new Size(window.innerWidth, innerHeight);
    }
}