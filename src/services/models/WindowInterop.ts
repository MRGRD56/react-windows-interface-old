import Window from "../../models/GUI/Window";

export default class WindowInterop {
    constructor(
        public readonly closeFunction: (window: Window) => void,
        public readonly minimizeFunction: (window: Window, isMinimized: boolean) => void,
        public readonly maximizeFunction: (window: Window, isMaximized: boolean) => void,
        public readonly addWindowFunction: (window: Window) => void
    ) {
    }
}