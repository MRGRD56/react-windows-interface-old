import React, {useContext} from "react";
import DE from "../../../services/DE";
import Rectangle from "../../../models/Rectangle";
import DesktopEnvironment from "../../../services/models/DesktopEnvironment";
import Window from "../../../models/GUI/Window";
import WindowContentProps from "../WindowContentProps";

function DebugWindow({windowInfo, ...props}: WindowContentProps) {
    const de = useContext(DE);

    function createNewWindow() {
        de.addWindow("New window",
            Rectangle.defaultWindowRectangle,
            undefined,
            (
                <div>
                    HELLO {Date.now()}
                </div>
            )
        );
    }

    function test() {
        de.setDE(new DesktopEnvironment(de.desktopEnvironment.windows
            .map(w => new Window(w.title + "A", w.windowInterop, w.rectangle, w.minSize, w.content, w.id))));
    }

    function centerThisWindow() {
        console.log(windowInfo);
        de.setDE(new DesktopEnvironment(de.desktopEnvironment.windows.map(w => {
            if (windowInfo && (w.id === windowInfo.id)) {
                return new Window(w.title, w.windowInterop, Rectangle.getScreenCenter(w.rectangle.size), w.minSize, w.content, w.id);
            }
            return w;
        })));
        console.log(windowInfo);
    }

    return (
        <div className="p-1 d-flex flex-wrap">
            <button onClick={createNewWindow}>Create new window</button>
            <button>Close the browser</button>
            <button onClick={centerThisWindow}>Center this window</button>
            <button onClick={test}>TEST</button>
        </div>
    );
}

export default DebugWindow;