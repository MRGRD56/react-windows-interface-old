import WindowInterop from "./WindowInterop";
import Rectangle from "../../models/Rectangle";
import Size from "../../models/Size";
import Window from "../../models/GUI/Window";
import DesktopEnvironment from "./DesktopEnvironment";

export default class DesktopEnvironmentContext {
    constructor(
        public readonly windowInterop: WindowInterop,
        public readonly setDE: (de: DesktopEnvironment) => void,
        public readonly desktopEnvironment: DesktopEnvironment
    ) {
    }

    addWindow(
        title: string,
        rectangle: Rectangle = undefined,
        minSize: Size = undefined,
        content: JSX.Element = undefined): Window {
        const newWindow = new Window(title, this.windowInterop, rectangle, minSize, content);
        this.windowInterop.addWindowFunction(newWindow);
        return newWindow;
    }
}