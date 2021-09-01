import Window from "../../models/GUI/Window";
import WindowInterop from "./WindowInterop";
import Rectangle from "../../models/Rectangle";
import Size from "../../models/Size";
import {Observable, Subscriber} from "rxjs";

export default class DesktopEnvironment {
    constructor(
        private readonly windowInterop: WindowInterop,
        windows: Window[] = undefined
    ) {
        if (windows != undefined) {
            this.windows = windows;
        }
    }

    windows: Window[] = [];

    addWindow(
        title: string,
        rectangle: Rectangle = undefined,
        minSize: Size = undefined,
        content: JSX.Element = undefined): Window {
        const newWindow = new Window(title, this.windowInterop, rectangle, minSize, content);
        this.windowInterop.addWindowFunction(newWindow);
        return newWindow;
    }

    getWindowById(id: number): Window {
        return this.windows.filter(w => w.id === id)[0] ?? null;
    }

    getWindowsByTitle(title: string): Window[] {
        return this.windows.filter(w => w.title === title);
    }
}