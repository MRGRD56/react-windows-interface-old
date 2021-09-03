import Window from "../../models/GUI/Window";

export default class DesktopEnvironment {
    constructor(
        windows: Window[] = undefined
    ) {
        if (windows != undefined) {
            this.windows = windows;
        }
    }

    windows: Window[] = [];

    getWindowById(id: number): Window {
        return this.windows.filter(w => w.id === id)[0] ?? null;
    }

    getWindowsByTitle(title: string): Window[] {
        return this.windows.filter(w => w.title === title);
    }
}